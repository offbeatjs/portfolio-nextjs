import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, project, budget } = await request.json();

    // Validate required fields
    if (!name || !email || !project) {
      return NextResponse.json(
        { ok: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_HIRE_ME_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('Discord webhook URL not configured');
      return NextResponse.json(
        { ok: false, message: 'Service configuration error. Please email me instead.' },
        { status: 500 }
      );
    }

    // Create Discord embed
    const embed = {
      title: '💼 New Hire Request',
      color: 0x5b8cff, // Blue color
      fields: [
        {
          name: '👤 Client Name',
          value: name,
          inline: true,
        },
        {
          name: '📧 Email',
          value: email,
          inline: true,
        },
        {
          name: '📝 Project Brief',
          value: project.length > 1024 ? project.substring(0, 1021) + '...' : project,
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Portfolio Hire Request',
      },
    };

    if (budget) {
      embed.fields.push({
        name: '💰 Budget Range',
        value: budget,
        inline: true,
      });
    }

    // Send to Discord
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!discordResponse.ok) {
      throw new Error('Discord webhook failed');
    }

    return NextResponse.json({
      ok: true,
      message: 'Request submitted successfully! I\'ll get back to you within 12-24 hours.',
    });
  } catch (error) {
    console.error('Error sending hire request:', error);
    return NextResponse.json(
      {
        ok: false,
        message: 'Failed to send request. Please email me directly at the.yashh@icloud.com',
      },
      { status: 500 }
    );
  }
}
