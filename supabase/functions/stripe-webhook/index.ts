// Kin Fit Plus billing: Stripe tells this function when a subscription starts, renews or ends,
// and it sets the member's plan. The member is matched by the Payment Link's client_reference_id (their user id).
// Secrets: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET. Deploy with JWT verification off (Stripe signs its calls):
//   supabase functions deploy stripe-webhook --no-verify-jwt
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.117.1';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', { httpClient: Stripe.createFetchHttpClient() });
const cryptoProvider = Stripe.createSubtleCryptoProvider();
const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const GRACE = 3 * 86400e3; // a late renewal payment does not cut access straight away

// Plan fields for a subscription; the period end moved onto the items in recent Stripe API versions.
function planOf(sub: Stripe.Subscription) {
  const end = (sub as unknown as { current_period_end?: number }).current_period_end ?? sub.items?.data?.[0]?.current_period_end;
  const active = ['active', 'trialing', 'past_due'].includes(sub.status);
  return active && end
    ? { plan: 'plus', plus_until: new Date(end * 1000 + GRACE).toISOString() }
    : { plan: 'free', plus_until: new Date().toISOString() };
}
const subId = (x: unknown) => (typeof x === 'string' ? x : x && typeof x === 'object' ? (x as { id?: string }).id : undefined);

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('method', { status: 405 });
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, req.headers.get('stripe-signature') ?? '', Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? '', undefined, cryptoProvider);
  } catch {
    return new Response('bad signature', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object as Stripe.Checkout.Session;
        const uid = s.client_reference_id; const sid = subId(s.subscription);
        if (!uid || !UUID.test(uid) || !sid) break;
        const sub = await stripe.subscriptions.retrieve(sid);
        await admin.from('profiles').update({ stripe_customer: subId(s.customer) ?? null, ...planOf(sub) }).eq('id', uid);
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await admin.from('profiles').update(planOf(sub)).eq('stripe_customer', subId(sub.customer));
        break;
      }
      case 'invoice.paid': {
        const inv = event.data.object as unknown as { subscription?: unknown; parent?: { subscription_details?: { subscription?: unknown } } };
        const sid = subId(inv.subscription) ?? subId(inv.parent?.subscription_details?.subscription);
        if (!sid) break;
        const sub = await stripe.subscriptions.retrieve(sid);
        await admin.from('profiles').update(planOf(sub)).eq('stripe_customer', subId(sub.customer));
        break;
      }
    }
  } catch {
    return new Response('retry', { status: 500 }); // Stripe retries failed deliveries
  }
  return new Response(JSON.stringify({ received: true }), { headers: { 'content-type': 'application/json' } });
});
