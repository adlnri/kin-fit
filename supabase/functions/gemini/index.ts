// Kin Fit Plus AI: forwards a Gemini request for a signed-in Plus member, within a daily quota.
// The Gemini key is a Supabase secret (GEMINI_API_KEY) and never reaches the browser.
// Deploy with JWT verification off (the function checks the member itself):
//   supabase functions deploy gemini --no-verify-jwt
import { createClient } from 'npm:@supabase/supabase-js@2.117.1';

const KEY = Deno.env.get('GEMINI_API_KEY') ?? '';
const LIMIT = Number(Deno.env.get('KINFIT_DAILY_LIMIT') ?? '60');
const MODELS = new Set(['gemini-3.8-flash', 'gemini-2.5-flash-lite']);
const MAX_BODY = 3_000_000; // a resized meal photo fits well under this
const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'authorization, apikey, content-type, x-client-info',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
};
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, 'content-type': 'application/json' } });
const deny = (message: string, status: number) => json({ error: { message } }, status);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method === 'GET') return json({ ready: !!KEY, limit: LIMIT });
  if (req.method !== 'POST') return deny('method', 405);
  if (!KEY) return deny('not_configured', 503);

  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const jwt = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  const { data: auth } = await admin.auth.getUser(jwt);
  const user = auth?.user;
  if (!user) return deny('signed_out', 401);

  const { data: prof } = await admin.from('profiles').select('plan, plus_until').eq('id', user.id).maybeSingle();
  const plus = prof && prof.plan === 'plus' && (!prof.plus_until || new Date(prof.plus_until) > new Date());
  if (!plus) return deny('not_plus', 402);

  const raw = await req.text();
  if (raw.length > MAX_BODY) return deny('too_large', 413);
  let body: { model?: string; request?: Record<string, unknown> };
  try { body = JSON.parse(raw); } catch { return deny('bad_request', 400); }
  if (!body.model || !MODELS.has(body.model) || !body.request || typeof body.request !== 'object') return deny('bad_request', 400);

  const { data: n, error } = await admin.rpc('ai_take', { p_user: user.id, p_limit: LIMIT });
  if (error) return deny('quota_error', 500);
  if (n < 0) return deny('daily_limit', 429);

  // Keep answers to a sane size whatever the page asks for.
  const gen = (body.request.generationConfig ?? {}) as Record<string, unknown>;
  body.request.generationConfig = { ...gen, maxOutputTokens: Math.min(Number(gen.maxOutputTokens) || 4096, 16000) };

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${body.model}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': KEY },
    body: JSON.stringify(body.request),
  });
  return new Response(await res.text(), { status: res.status, headers: { ...CORS, 'content-type': 'application/json' } });
});
