import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, project, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const projectLabels: Record<string, string> = {
      ai: 'AI Voice Agent / Automation',
      infrastructure: 'Infrastructure / Hosting',
      web: 'Website / Web App',
      payment: 'Payment Integration',
      other: 'Other',
    };

    const projectLabel = projectLabels[project] || project || 'Not specified';

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'muhammedbinkhaled@icloud.com',
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectLabel}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
