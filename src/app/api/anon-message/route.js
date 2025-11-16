import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const webhook = process.env.DISCORD_ANON_WEBHOOK_URL;
    if (!webhook) {
      console.error('Discord anonymous webhook URL not configured');
      return NextResponse.json({ 
        error: 'Service configuration error. Please try again later.' 
      }, { status: 500 });
    }

    // Create Discord embed
    const embed = {
      title: '📩 New Anonymous Message',
      description: message.length > 4096 ? message.substring(0, 4093) + '...' : message,
      color: 0x8b5cf0, // Purple color
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Portfolio Anonymous Message',
      },
    };

    const payload = {
      embeds: [embed],
    };

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

    return NextResponse.json({ ok: true, message: 'Anonymous message sent — thank you!' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
