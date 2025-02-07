import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
export async function POST(request: NextRequest) {
    try {
        const { amount } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // ✅ Fixed field name
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
        })

        return NextResponse.json({ clientSecret: paymentIntent.client_secret })

    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 })
        }
    }
}
