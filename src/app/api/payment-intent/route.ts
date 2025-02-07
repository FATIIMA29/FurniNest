import Stripe from 'stripe';
import { NextRequest, NextResponse } from "next/server";
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing from environment variables");
}
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15', // Ensure the correct API version
  });

export async function POST(request: NextRequest) {
    console.log("Received POST request to /api/payment-intent");
  
    try {
      const body = await request.json();
      console.log("Request Body:", body);
  
      if (!body.amount || body.amount <= 0) {
        console.log("Invalid amount received");
        return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
      }
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount: body.amount,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });
  
      console.log("Payment Intent Created:", paymentIntent);
      return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  
    } catch (err: unknown) {
      console.error("Stripe Payment Intent Error:", err);
      if (err instanceof Error) {
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
  