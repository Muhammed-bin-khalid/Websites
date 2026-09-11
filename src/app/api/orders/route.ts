import { NextResponse } from 'next/server';
import config from '../../../../business-config';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Log the order (in production, you'd save to database or send email)
    console.log('Order received:', data);

    // If email is configured, you could send email here
    if (config.cart.emailRecipient) {
      // Example: integrate with email service (SendGrid, Resend, etc.)
      // await sendEmail({
      //   to: config.cart.emailRecipient,
      //   subject: `New Order from ${data.customer.name}`,
      //   body: generateOrderEmailHTML(data)
      // });
    }

    return NextResponse.json({ success: true, message: 'Order received' });
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process order' },
      { status: 500 }
    );
  }
}
