import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const webhook = process.env.DISCORD_WEBHOOK_URL;
    if (!webhook) {
      // For safety in local dev, return success but log message
      console.warn('Anonymous message received (webhook not configured):', message);
      return NextResponse.json({ ok: true, note: 'webhook not configured' });
    }

    const payload = { content: `Anonymous message:\n${message}` };

    const r = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const text = await r.text();
      console.error('Webhook send failed:', r.status, text);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
