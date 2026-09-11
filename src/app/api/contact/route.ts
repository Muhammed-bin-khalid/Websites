import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Log the contact form submission
    console.log('Contact form received:', data);

    // In production, integrate with email service
    // await sendEmail({
    //   to: config.contact.email,
    //   subject: `Contact from ${data.name}`,
    //   body: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
    // });

    return NextResponse.json({ success: true, message: 'Message received' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
