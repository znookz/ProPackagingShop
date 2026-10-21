// Cloudflare Pages Function: POST /api/contact
// Verifies the Turnstile token, then emails the quote request to the shop via Resend.
// No database: nothing is stored.
//
// Environment variables (Pages → Settings → Environment variables):
//   TURNSTILE_SECRET  Turnstile secret key
//   RESEND_API_KEY    API key from resend.com
//   CONTACT_TO        shop inbox that receives requests
//   CONTACT_FROM      verified sender, e.g. "Foldwork <quote@yourdomain.com>"

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

const clip = (v, n) => String(v ?? '').trim().slice(0, n);

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400);
  }

  // Honeypot: bots fill hidden fields. Pretend success and drop it.
  if (data.website) return json({ ok: true });

  const name = clip(data.name, 120);
  const contact = clip(data.contact, 120);
  if (!name || !contact) return json({ ok: false, error: 'missing_fields' }, 400);

  if (!env.TURNSTILE_SECRET || !env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return json({ ok: false, error: 'not_configured' }, 503);
  }

  const token = clip(data['cf-turnstile-response'], 2048);
  const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET,
      response: token,
      remoteip: request.headers.get('CF-Connecting-IP') ?? '',
    }),
  });
  const verdict = await check.json().catch(() => ({}));
  if (!verdict.success) return json({ ok: false, error: 'turnstile' }, 403);

  const lines = [
    `Name / company: ${name}`,
    `Phone or LINE:  ${contact}`,
    `Type:           ${clip(data.type, 40)}`,
    `Product:        ${clip(data.product, 80)}`,
    `Quantity:       ${clip(data.qty, 80)}`,
    `Size:           ${clip(data.size, 120)}`,
    `Artwork link:   ${clip(data.file, 500)}`,
    `Language:       ${clip(data.lang, 4)}`,
    '',
    clip(data.note, 4000),
  ];

  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM,
      to: [env.CONTACT_TO],
      subject: `Quote request: ${name}`,
      text: lines.join('\n'),
    }),
  });
  if (!sent.ok) return json({ ok: false, error: 'send_failed' }, 502);
  return json({ ok: true });
}

export const onRequest = () => json({ ok: false, error: 'method_not_allowed' }, 405);
