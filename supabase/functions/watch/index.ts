// Kin Fit watches: links a member's Strava or Whoop account and reads their recent activities.
// The client secrets are Supabase secrets (STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, WHOOP_CLIENT_ID,
// WHOOP_CLIENT_SECRET); the members' tokens stay in public.watch_links (supabase/watch.sql).
// Deploy with JWT verification off (the function checks the member itself):
//   supabase functions deploy watch --no-verify-jwt
import { createClient } from 'npm:@supabase/supabase-js@2.117.1';

type Provider = 'strava' | 'whoop';
type Row = { user_id: string; provider: Provider; access_token: string; refresh_token: string; expires_at: string; athlete: string | null };

const env = (k: string) => Deno.env.get(k) ?? '';
const P = {
  strava: { id: env('STRAVA_CLIENT_ID'), secret: env('STRAVA_CLIENT_SECRET'), token: 'https://www.strava.com/oauth/token' },
  whoop: { id: env('WHOOP_CLIENT_ID'), secret: env('WHOOP_CLIENT_SECRET'), token: 'https://api.prod.whoop.com/oauth/oauth2/token' },
};
const WHOOP = 'https://api.prod.whoop.com/developer/v2';
const MAX_DAYS = 30;
const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'authorization, apikey, content-type, x-client-info',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, 'content-type': 'application/json' } });
const deny = (message: string, status: number) => json({ error: { message } }, status);
const ready = (p: Provider) => !!(P[p].id && P[p].secret);
const isProvider = (p: unknown): p is Provider => p === 'strava' || p === 'whoop';
const okRedirect = (u: unknown) => typeof u === 'string' && u.length < 300 && /^(https:\/\/|http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/)/.test(u);
const n = (x: unknown) => (typeof x === 'number' && isFinite(x) ? x : 0);
const str = (x: unknown, max = 80) => String(x ?? '').slice(0, max);

async function tokenCall(p: Provider, params: Record<string, string>) {
  const body = new URLSearchParams({ client_id: P[p].id, client_secret: P[p].secret, ...params });
  const r = await fetch(P[p].token, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body });
  const t = await r.json().catch(() => ({}));
  if (!r.ok || !t.access_token) throw new Error('token');
  return t;
}
const expiry = (t: { expires_at?: number; expires_in?: number }) => new Date(t.expires_at ? t.expires_at * 1000 : Date.now() + (t.expires_in || 3600) * 1000).toISOString();

// Local "YYYY-MM-DDTHH:MM" of a UTC time, with Whoop's "+02:00" style offset.
function local(utc: unknown, offset: unknown) {
  const m = /^([+-])(\d\d):(\d\d)$/.exec(String(offset || ''));
  const shift = m ? (m[1] === '-' ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3])) * 60000 : 0;
  return new Date(new Date(String(utc)).getTime() + shift).toISOString().slice(0, 16);
}

async function getJson(url: string, token: string) {
  const r = await fetch(url, { headers: { authorization: `Bearer ${token}` } });
  if (r.status === 401) throw new Error('revoked');
  if (r.status === 429) throw new Error('rate_limited');
  if (!r.ok) throw new Error('provider');
  return r.json();
}

async function whoopAll(path: string, token: string, start: string) {
  const out: Record<string, unknown>[] = []; let next = '';
  for (let i = 0; i < 3; i++) {
    const q = new URLSearchParams({ start, limit: '25' }); if (next) q.set('nextToken', next);
    const page = await getJson(`${WHOOP}${path}?${q}`, token);
    out.push(...(page.records || [])); next = page.next_token || '';
    if (!next) break;
  }
  return out;
}

async function readStrava(token: string, after: number) {
  const list = await getJson(`https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=60`, token);
  return {
    acts: (Array.isArray(list) ? list : []).map((a: Record<string, unknown>) => ({
      id: `s${a.id}`, src: 'strava', day: str(a.start_date_local, 10), time: str(a.start_date_local).slice(11, 16),
      type: str(a.sport_type || a.type, 40), name: str(a.name), min: Math.round(n(a.moving_time) / 60),
      km: Math.round(n(a.distance) / 100) / 10, hr: Math.round(n(a.average_heartrate)), hrMax: Math.round(n(a.max_heartrate)),
      // Cycling with power: the kilojoules of work are close to the kilocalories burnt.
      kcal: Math.round(n(a.kilojoules)),
    })),
    rec: [],
  };
}

async function readWhoop(token: string, start: string) {
  const [work, recov, sleep] = await Promise.all([whoopAll('/activity/workout', token, start), whoopAll('/recovery', token, start), whoopAll('/activity/sleep', token, start)]);
  const sleeps = new Map(sleep.filter((s) => !s.nap).map((s) => [String(s.id), s]));
  const acts = work.filter((w) => w.score_state === 'SCORED').map((w) => {
    const sc = (w.score || {}) as Record<string, unknown>; const at = local(w.start, w.timezone_offset);
    return {
      id: `w${w.id}`, src: 'whoop', day: at.slice(0, 10), time: at.slice(11, 16), type: str(w.sport_name, 40), name: '',
      min: Math.round((new Date(String(w.end)).getTime() - new Date(String(w.start)).getTime()) / 60000),
      km: Math.round(n(sc.distance_meter) / 100) / 10, hr: Math.round(n(sc.average_heart_rate)), hrMax: Math.round(n(sc.max_heart_rate)),
      kcal: Math.round(n(sc.kilojoule) / 4.184), strain: Math.round(n(sc.strain) * 10) / 10,
    };
  });
  const rec = recov.filter((r) => r.score_state === 'SCORED').map((r) => {
    const sc = (r.score || {}) as Record<string, unknown>; const s = sleeps.get(String(r.sleep_id));
    const st = ((s && (s.score as Record<string, unknown> || {}).stage_summary) || {}) as Record<string, unknown>;
    const slept = n(st.total_light_sleep_time_milli) + n(st.total_slow_wave_sleep_time_milli) + n(st.total_rem_sleep_time_milli);
    return {
      day: s ? local(s.end, s.timezone_offset).slice(0, 10) : str(r.created_at, 10),
      score: Math.round(n(sc.recovery_score)), rhr: Math.round(n(sc.resting_heart_rate)), hrv: Math.round(n(sc.hrv_rmssd_milli)),
      sleep: Math.round(slept / 360000) / 10,
    };
  });
  return { acts, rec };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  // The client ids are public: the page needs them to open the sign-in page of Strava or Whoop.
  if (req.method === 'GET') return json({ strava: ready('strava') ? P.strava.id : '', whoop: ready('whoop') ? P.whoop.id : '' });
  if (req.method !== 'POST') return deny('method', 405);

  const admin = createClient(env('SUPABASE_URL'), env('SUPABASE_SERVICE_ROLE_KEY'));
  const jwt = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  const { data: auth } = await admin.auth.getUser(jwt);
  const user = auth?.user;
  if (!user) return deny('signed_out', 401);

  let body: { action?: string; provider?: unknown; code?: unknown; redirect?: unknown; days?: unknown };
  try { body = await req.json(); } catch { return deny('bad_request', 400); }
  const table = () => admin.from('watch_links');

  if (body.action === 'status') {
    const { data } = await table().select('provider, athlete').eq('user_id', user.id);
    const out: Record<string, unknown> = {};
    (['strava', 'whoop'] as Provider[]).forEach((p) => { const r = (data || []).find((x) => x.provider === p); out[p] = { ready: ready(p), linked: !!r, name: r ? r.athlete : null }; });
    return json(out);
  }

  const p = body.provider;
  if (!isProvider(p)) return deny('bad_request', 400);
  if (!ready(p)) return deny('not_configured', 503);

  if (body.action === 'connect') {
    if (typeof body.code !== 'string' || body.code.length > 200 || !okRedirect(body.redirect)) return deny('bad_request', 400);
    let t;
    try { t = await tokenCall(p, { grant_type: 'authorization_code', code: body.code, ...(p === 'whoop' ? { redirect_uri: String(body.redirect) } : {}) }); } catch { return deny('code_refused', 400); }
    if (!t.refresh_token) return deny('code_refused', 400);
    const athlete = p === 'strava' && t.athlete ? str(t.athlete.firstname, 40) : null;
    const { error } = await table().upsert({ user_id: user.id, provider: p, access_token: t.access_token, refresh_token: t.refresh_token, expires_at: expiry(t), athlete, updated_at: new Date().toISOString() });
    if (error) return deny('store_error', 500);
    return json({ linked: true, name: athlete });
  }

  const { data: row } = await table().select('*').eq('user_id', user.id).eq('provider', p).maybeSingle() as { data: Row | null };
  if (!row) return deny('not_linked', 404);

  // A token about to expire is renewed; both services hand out a new refresh token each time.
  async function fresh(r: Row) {
    if (new Date(r.expires_at).getTime() - 120000 > Date.now()) return r.access_token;
    const t = await tokenCall(r.provider, { grant_type: 'refresh_token', refresh_token: r.refresh_token, ...(r.provider === 'whoop' ? { scope: 'offline' } : {}) });
    await table().update({ access_token: t.access_token, refresh_token: t.refresh_token || r.refresh_token, expires_at: expiry(t), updated_at: new Date().toISOString() }).eq('user_id', r.user_id).eq('provider', r.provider);
    return t.access_token as string;
  }

  if (body.action === 'disconnect') {
    try {
      const token = await fresh(row);
      if (p === 'strava') await fetch('https://www.strava.com/oauth/deauthorize', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ access_token: token }) });
      else await fetch(`${WHOOP}/user/access`, { method: 'DELETE', headers: { authorization: `Bearer ${token}` } });
    } catch { /* the link is removed on our side anyway */ }
    await table().delete().eq('user_id', user.id).eq('provider', p);
    return json({ linked: false });
  }

  if (body.action === 'sync') {
    const days = Math.max(1, Math.min(MAX_DAYS, Number(body.days) || 7));
    const since = new Date(Date.now() - days * 86400000);
    try {
      const token = await fresh(row);
      return json(p === 'strava' ? await readStrava(token, Math.floor(since.getTime() / 1000)) : await readWhoop(token, since.toISOString()));
    } catch (e) {
      const m = (e as Error).message;
      // A link the member cut from Strava or Whoop is forgotten here too.
      if (m === 'revoked' || m === 'token') { await table().delete().eq('user_id', user.id).eq('provider', p); return deny('revoked', 410); }
      return deny(m === 'rate_limited' ? 'rate_limited' : 'provider', 502);
    }
  }
  return deny('bad_request', 400);
});
