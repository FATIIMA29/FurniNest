"use client";
import React, { useState, useEffect } from "react";
import { Product } from "../../../type/product";
import { getCartItems } from "../actions/actions";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";



if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}


const CartPage = () => {
  
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [total, setTotal] = useState(0);
 

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();
      setCartItems(items);
    };

    fetchCartItems();

    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  useEffect(() => {
    const subTotal = cartItems.reduce((total, item) => total + item.price * item.stockLevel, 0);
    setTotal(subTotal - discount + 10);
  }, [cartItems, discount]);

  const router = useRouter();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    saveInfo: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Check if all required fields are filled
  useEffect(() => {
    const { firstName, lastName, address, city, phone } = formValues;
    setIsFormValid(
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      address.trim() !== "" &&
      city.trim() !== "" &&
      phone.trim() !== ""
    );
  }, [formValues]); // Runs every time formValues change

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all required fields before proceeding.",
      });
      return;
    }

    router.push("/payment"); // Redirect to payment page
  };

  const subTotal = cartItems.reduce((total, item) => total + item.price * item.stockLevel, 0);
 


 
  


  
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
            <Link href="/checkout" className="hover:text-black text-black transition">
              Checkout
            </Link>
            <CgChevronRight className="w-4 h-4" />
            <Link href="/payment" className="hover:text-black font-medium transition">
              Payment
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
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
            <p className="text-sm">Subtotal: <span className="font-medium">${subTotal.toFixed(2)}</span></p>
            <p className="text-sm">Discount: <span className="font-medium text-red-500">-${discount.toFixed(2)}</span></p>
            <p className="text-sm">Shipping: <span className="font-medium">$10</span></p>
            <p className="text-lg font-semibold border-t pt-2">Total: <span className="text-blue-600">${total}</span></p>
          </div>
        </div>



{/* Billing & Delivery Information */}
<div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold border-b pb-2">Checkout Details</h2>
          <form onSubmit={handleProceed} className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-3 py-2 border rounded-md"
              value={formValues.firstName}
              onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-3 py-2 border rounded-md"
              value={formValues.lastName}
              onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full px-3 py-2 border rounded-md"
              value={formValues.address}
              onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
            />
            {/* City Dropdown */}
            <select
              className="w-full px-3 py-2 border rounded-md"
              value={formValues.city}
              onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
            >
              <option value="">Select City</option>
              <option value="Karachi">Karachi</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Lahore">Lahore</option>
            </select>
            <input
              type="text"
              placeholder="City"
              className="w-full px-3 py-2 border rounded-md"
              value={formValues.city}
              onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full px-3 py-2 border rounded-md"
              value={formValues.phone}
              onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
            />
             {/* Shipping & Payment Section */}
             <div className="bg-gray-100 p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold">Shipping Charges</h3>
              <div className="flex justify-between items-center mt-2">
                <span>Standard Shipping</span>
                <span className="font-bold text-slate-700">$10</span>
              </div>
            </div>


            <button
              type="submit"
              className={`w-full mt-6 py-3 font-semibold rounded-md shadow-md transition ${
                isFormValid ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
      </div>

      
    </div>
  );
};

export default CartPage;
