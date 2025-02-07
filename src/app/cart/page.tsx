"use client";

import React, { useEffect, useState } from "react";
import { Product } from "../../../type/product";
import { getCartItems, removeFromCart, updateCartQuantity } from "../actions/actions";
import Swal from "sweetalert2";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import {  useRouter } from "next/navigation";
import { CgChevronRight } from "react-icons/cg";
import Link from "next/link";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Removed", "Item has been removed.", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) handleQuantityChange(id, product.stockLevel + 1);
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.stockLevel > 1) handleQuantityChange(id, product.stockLevel - 1);
  };

  const calculatedTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.stockLevel, 0);
  };
  const router= useRouter();
  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to checkout",
      text: "Please review your cart before checkout",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, proceed!",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Your order has been successfully processed", "success");
        router.push('/checkout');
        setCartItems([]);
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Breadcrumb */}
      <div className="py-6 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-gray-500 text-sm">
            <Link href="/cart" className="hover:text-black  text-black transition">
              Cart
            </Link>
            <CgChevronRight className="w-4 h-4" />
            <Link href="/checkout" className="hover:text-black  transition">
              Checkout
            </Link>
            <CgChevronRight className="w-4 h-4" />
            <Link href="/payment" className="hover:text-black font-medium transition">
              Payment
            </Link>
          </nav>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white border rounded-lg p-4 shadow-md"
              >
                {/* Product Info */}
                <div className="flex items-center space-x-4">
                {item.image && (
                  <Image
                  src={urlFor(item.image).url()}
                  className="w-16 h-16 object-cover rounded-lg"
                  alt="image"
                  width={500}
                  height={500}/>

                  
                     )}
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    onClick={() => handleDecrement(item._id)}
                  >
                    -
                  </button>
                  <span>{item.stockLevel}</span>
                  <button
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                    onClick={() => handleIncrement(item._id)}
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white border rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Total Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total Price:</span>
              <span>${calculatedTotal().toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4"
              onClick={handleProceed}
            >
              Proceed to Checkout
            </button>
            
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
