'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CgChevronRight } from 'react-icons/cg';
import { Product } from '../../../type/product';
import { getCartItems } from '../actions/actions';
import Image from 'next/image';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { urlFor } from '@/sanity/lib/image';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// Checkout Form Component
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
        confirmParams: {  return_url: `${window.location.origin}/payment-success` },
      });
  
      if (paymentError) {
        console.error("Payment error:", paymentError.message);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-lg shadow-md">
      <PaymentElement />
      <button className="w-full bg-black text-white py-2 mt-4" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

const Payment = () => {
  const [discount, setDiscount] = useState<number>(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();
      setCartItems(items);
    };

    fetchCartItems();

    // Load discount from localStorage
    const appliedDiscount = localStorage.getItem('appliedDiscount');
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subTotal = cartItems.reduce((total, item) => total + item.price * item.stockLevel, 0);
  const total = subTotal - discount + 10;

  // Fetch clientSecret when total changes
  useEffect(() => {
    if (total > 0) {
      fetch('/api/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total })
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }
  }, [total]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Breadcrumb */}
      <div className="py-6 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-gray-500 text-sm">
            <Link href="/cart" className="hover:text-black transition">
              Cart
            </Link>
            <CgChevronRight className="w-4 h-4" />
            <Link href="/checkout" className="hover:text-black transition">
              Checkout
            </Link>
            <CgChevronRight className="w-4 h-4" />
            <span className="text-black font-medium">Payment</span>
          </nav>
        </div>
      </div>

      {/* Payment Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 py-4 border-b">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  {item.image && (
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-xs text-gray-500">Quantity: {item.stockLevel}</p>
                </div>
                <p className="text-sm font-medium">${(item.price * item.stockLevel).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          )}
          <div className="text-right pt-4 space-y-1">
            <p className="text-sm">
              Subtotal: <span className="font-medium">${subTotal.toFixed(2)}</span>
            </p>
            <p className="text-sm">
              Discount: <span className="font-medium text-red-500">-${discount.toFixed(2)}</span>
            </p>
            <p className="text-sm">
              Shipping: <span className="font-medium">$10</span>
            </p>
            <p className="text-lg font-semibold border-t pt-2">
              Total: <span className="text-blue-600">${total}</span>
            </p>
          </div>
          {/* Proceed to Checkout Button */}
          {!showCheckoutForm && (
            <button
            
              onClick={() => {
                localStorage.setItem('totalAmount', total.toString()); // Store total before checkout
                setShowCheckoutForm(true);
              }}
              className="w-full bg-blue-600 text-white py-2 mt-5 rounded-lg hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </button>
          )}
        </div>

        {/* Checkout Form */}
        {showCheckoutForm && clientSecret && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold border-b pb-2">Payment</h2>
            <p className="text-sm mt-2">All transactions are secure and encrypted.</p>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
