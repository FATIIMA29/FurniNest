"use client";

import { FaTh, FaList,  FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa"; // For icons
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { addToCart } from "../actions/actions";
import { Product } from "../../../type/product";

const ShopList: React.FC = () => {
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchproduct() {
      const fetchedProduct: Product[] = await client.fetch(allProducts);
      setProduct(fetchedProduct);
    }
    fetchproduct();
  }, []);

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
          Shop List
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Home / Pages / <span className="text-pink-500">Shop List</span>
          </p>
        </div>
      </header>

      {/* Main Section (Below Jumbotron) */}
      <main className="container mx-auto px-6 py-16">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Ecommerce Accessories and Fashion Items
            </h1>
            <p className="text-sm sm:text-base text-gray-500">
              About 9630 Results
            </p>
          </div>

          {/* Right Side Controls */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
  <div className="flex items-center space-x-2">
    <label className="text-sm text-gray-600">Per page:</label>
    <input
      type="number"
      min="1"
      className="p-2 border rounded-md text-sm w-full sm:w-32"
      defaultValue="12"
    />
  </div>

  <div className="flex items-center space-x-4">
    <label className="text-sm text-gray-600">Sort by:</label>
    <select className="p-2 border rounded-md text-sm w-full sm:w-32">
      <option value="relevance">Relevance</option>
      <option value="price-low-high">Price: Low to High</option>
      <option value="price-high-low">Price: High to Low</option>
      <option value="newest">Newest</option>
    </select>
  </div>

  <div className="flex items-center space-x-4">
    {/* Grid View Button */}
    <button
      onClick={() => setViewStyle("grid")}
      className={`p-2 rounded-md ${viewStyle === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
    >
      <FaTh className="text-gray-600" />
    </button>

    {/* List View Button */}
    <button
      onClick={() => setViewStyle("list")}
      className={`p-2 rounded-md ${viewStyle === "list" ? "bg-green-500 text-white" : "bg-gray-200"}`}
    >
      <FaList className="text-gray-600" />
    </button>

    {/* Search Input */}
    <input
      type="text"
      className="p-2 border rounded-md text-sm w-full sm:w-32"
    />
  </div>
</div>

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {product.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-xl shadow-lg p-4 flex items-center space-x-6 overflow-hidden"
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
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <div className="text-md text-gray-600 mt-1">
                  <span className="line-through text-gray-400 mr-2">${product.price}</span>
                  <span className="text-red-500 font-bold">${product.price}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {product.description}
                </p>
                <div className="flex items-center mt-4 space-x-4 text-gray-600">
                  <button
                    className="text-blue-600 hover:text-blue-800 transition"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <FaShoppingCart size={18} />
                  </button>
                  <FaHeart className="hover:text-red-500 cursor-pointer transition" size={18} />
                  <FaSearch className="hover:text-gray-800 cursor-pointer transition" size={18} />
                </div>
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

export default ShopList;
