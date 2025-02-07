'use client';
import React, { useState, useEffect } from 'react';
import { FcApproval } from 'react-icons/fc';

const PaymentSuccess = () => {
    const [total, setTotal] = useState<number | null>(null);
    const [isClient, setIsClient] = useState(false); // Track hydration

    useEffect(() => {
        setIsClient(true); // Now we are on the client
        const storedTotal = localStorage.getItem('totalAmount');
        if (storedTotal) {
            setTotal(Number(storedTotal));
        }
    }, []);

    if (!isClient || total === null) { 
        return <div>Loading...</div>; // Prevent mismatch
    }

    const handleGoToHomepage = () => {
        window.location.href = '/';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-md max-w-md text-center"> 
                <div className="flex items-center justify-center mb-8"> 
                    <FcApproval size={70} className='mr-4' /> 
                </div>
                <h1 className="text-3xl font-bold p-1">Order Placed Successfully!</h1>
                <p className="text-lg mb-4">Your order has been placed successfully.</p>
                <p>You will receive an order confirmation email shortly.</p>
                <p>Your total amount: ${total.toFixed(2)}</p>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
                    onClick={handleGoToHomepage} 
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
