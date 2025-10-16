import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

function verifyWebhookSignature(
  payload: string,
  receivedSignature: string,
  secretKey: string
): boolean {
  try {
    const expectedSignature = createHmac("sha256", secretKey)
      .update(payload)
      .digest("hex");

    // Use timing-safe comparison to prevent timing attacks
    return timingSafeEqual(
      Buffer.from(expectedSignature, "hex"),
      Buffer.from(receivedSignature, "hex")
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('chipi-signature');
    const webhookSecret = process.env.CHIPI_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("CHIPI_WEBHOOK_SECRET not configured");
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    if (!signature || !verifyWebhookSignature(payload, signature, webhookSecret)) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(payload);
    console.log("Received Chipi webhook:", event);

    if (event.event === 'transaction.sent' && event.data.transaction.status === 'SUCCESS') {
      // Handle successful payment
      const transaction = event.data.transaction;
      
      console.log(`Payment received: ${transaction.amount} USDC from ${transaction.senderAddress}`);
      
      // Here you can:
      // 1. Update your database
      // 2. Send confirmation emails
      // 3. Fulfill orders
      // 4. Update user balances
      // 5. Trigger other business logic
      
      // Example: Log the successful payment
      console.log(`✅ Payment Success:
        - Amount: ${transaction.amount} USDC
        - From: ${transaction.senderAddress}
        - To: ${transaction.recipientAddress}
        - Transaction Hash: ${transaction.transactionHash}
        - Timestamp: ${new Date().toISOString()}
      `);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
