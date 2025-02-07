'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "../../../type/product";
import { FaList, FaTh } from "react-icons/fa";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/queries";
import Swal from "sweetalert2";
import { addToCart } from "../actions/actions";



const Shop = () => {
 const [product, setProduct ] = useState<Product[]>([])
 useEffect(()=>{
  async function fetchproduct() {
    const fetchedProduct : Product[] = await client.fetch(allProducts)
  setProduct(fetchedProduct)  
  }
  fetchproduct()
 },[]) 
 const handleAddToCart = (e: React.MouseEvent, product: Product) => {
     e.preventDefault();
     Swal.fire({
       position: "top-right",
       icon: "success",
       title: `${product.name} added to cart`,
       showConfirmButton: false,
       timer: 1000,
     });
     addToCart(product);
   };
 





 const [viewStyle, setViewStyle] = useState("grid");

 
  
  return (
    <>
 

    <div className="bg-gray-50 min-h-screen">
      {/* Jumbotron Header */}
      <header className="bg-gray-100 py-6 sm:py-8 md:py-12 bg-cover bg-center relative">
        <div className="container mx-auto px-6 text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Shop Grid Default
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Home / Pages / <span className="text-pink-500">Shop Grid Default</span>
          </p>
        </div>
      </header>

      {/* Main Section (Below Jumbotron) */}
      <main className="container mx-auto px-6 py-16">
        {/* Original Header Content Moved Below Jumbotron */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-6">
          <div>
            <h1 className="text-1xl sm:text-3xl md:text-2xl font-bold text-blue-900 mb-4">
              Ecommerce Accessories and Fashion Items
            </h1>
            <p className="text-sm sm:text-base text-gray-500">About 9630 Results</p>
          </div>

          {/* Right Side Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
            {/* Per Page Input */}
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Per page:</label>
              <input
                type="number"
                min="1"
                className="p-2 border rounded-md text-sm w-full sm:w-32"
                defaultValue="12"
              />
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center space-x-4">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select className="p-2 border rounded-md text-sm w-full sm:w-32">
                <option value="relevance">Relevance</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* View and Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setViewStyle("grid")}
                className={`p-2 rounded-md ${viewStyle === "grid" ? "bg-gray-200" : "bg-transparent"}`}
              >
                <FaTh className="text-gray-600" />
              </button>
              <button
                onClick={() => setViewStyle("list")}
                className={`p-2 rounded-md ${viewStyle === "list" ? "bg-gray-200" : "bg-transparent"}`}
              >
                <FaList className="text-gray-600" />
              </button>

              {/* Small Input Field */}
              <input
                type="text"
                className="p-2 border rounded-md text-sm w-full sm:w-32"
              />
            </div>
          </div>
        </div>

        {/* Product Grid or List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {product.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-xl shadow-md p-4 text-center relative group overflow-hidden transition-all duration-300 hover:bg-purple-100"
          >
            <Link href={`/product/${product.slug.current}`}>
              {/* Image */}
              {product.image && (
                <Image
                  src={urlFor(product.image).url()}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-56 object-contain rounded-lg group-hover:scale-110 transition-all duration-300"
                />
              )}

              {/* Product Name */}
              <h3 className="text-md font-semibold text-gray-800 group-hover:text-purple mt-4">
                {product.name}
              </h3>

              {/* Price and Discount Percentage */}
              <div className="text-sm text-gray-600 group-hover:text-purple mt-2">
                <span>${product.price}</span>
                {product.discountPercentage > 0 && (
                  <span className="text-red-500 ml-2">
                    -{product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="mt-4">
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-200 ease-in-out"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Add To Cart
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
            
  
            
            
             
                   
                 
      </main>
    </div>
  
    </>
  );
};

export default Shop;
