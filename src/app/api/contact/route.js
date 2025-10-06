import { NextResponse } from 'next/server';

// POST /api/contact
export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, subject, message, website } = data || {};

    // honeypot check
    if (website) {
      // silently accept to waste bot time
      return NextResponse.json({ ok: true });
    }

    // basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'name, email and message are required' }, { status: 400 });
    }

    const webhook = process.env.DISCORD_WEBHOOK_URL;
    const payload = {
      // Format nicely for Discord
      content: `**New contact form submission**\n**Name:** ${name}\n**Email:** ${email}\n**Subject:** ${subject || '-'}\n**Message:**\n${message}`,
    };

    if (!webhook) {
      // In dev, avoid failing — log for developer
      console.warn('DISCORD_WEBHOOK_URL not configured. Payload:', payload);
      return NextResponse.json({ ok: true, note: 'webhook-not-configured' });
    }

    const r = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const text = await r.text().catch(() => '');
      console.error('Discord webhook responded with', r.status, text);
      return NextResponse.json({ error: 'failed to send to webhook' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('api/contact error', err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}
