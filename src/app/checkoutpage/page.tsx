"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useStripe, useElements, PaymentElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
    
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) return;
      
        try {
          // ✅ Step 1: Submit the form validation
          const { error: submitError } = await elements.submit();
          if (submitError) {
            console.error("Validation error:", submitError.message);
            return;
          }
      
          // ✅ Step 2: Confirm the payment only after form submission is successful
          const { error: paymentError } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: { return_url: `/payment-success` },
          });
      
          if (paymentError) {
            console.error("Payment error:", paymentError.message);
          }
        } catch (err) {
          console.error("Unexpected error:", err);
        }
      };
    

    return (
        <form onSubmit={handleSubmit} className="p-8">
            <PaymentElement />
            <button className="w-full bg-black text-white py-2 mt-5" disabled={!stripe}>
                Pay Now
            </button>
        </form>
    );
};

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const total = Number(searchParams.get("total")) || 0;
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: total }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [total]);

    if (!clientSecret) {
        return <p>Loading payment...</p>; // Wait until clientSecret is available
    }

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm clientSecret={clientSecret} />
        </Elements>
    );
}
