import { FaHeart, FaShoppingCart, FaSearchPlus } from "react-icons/fa"; // Import the icons
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Product } from "../../../type/product";
import { client } from "@/sanity/lib/client";
import {   trending } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { addToCart } from "../actions/actions";


const TrendingProducts = () => {
 const [product, setProduct ] = useState<Product[]>([])
 useEffect(()=>{
  async function fetchproduct() {
    const fetchedProduct : Product[] = await client.fetch(trending)
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
  return (
<section className="py-16 px-8 bg-white">
<h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
Trending Products
        </h2>






    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {product.map((product)=>(


<div
       key={product._id}
       className="bg-white border rounded-xl shadow-md p-4 text-center relative group overflow-hidden transition-all duration-300 hover:bg-purple-100"
     >
    
    <Link href={`/product/${product.slug.current}`}>

       {/* Image */}
       {product.image &&( <Image
           src={urlFor(product.image).url()}
         alt={product.name}
         width={300}
         height={300}
         className="w-full h-56 object-contain rounded-lg group-hover:scale-110 transition-all duration-300"
       />  )} 
     
       {/* Product Name (Left Bottom) */}
       <h3 className="absolute bottom-3 left-4 text-md font-semibold text-gray-800 group-hover:text-purple ml-6 transition-all duration-300 sm:ml-6">
         {product.name}
       </h3>
     
       {/* Price and Discount Percentage (Right Bottom) */}
       <div className="absolute bottom-3 right-4 text-sm text-gray-600 group-hover:text-purple transition-all duration-300 sm:mt-0 mt-12">
         <span>${product.price}</span>
         {product.discountPercentage > 0 && (
           <span className="text-red-500 ml-2">-{product.discountPercentage}%</span>
         )}
       </div>
     
       {/* Icons in Bottom Left on Hover */}
       <div className="absolute bottom-12 left-6 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
         {/* Quick View */}
         <button className="p-2 bg-gray-200 rounded-full text-gray-600 hover:text-pink-500">
                <FaSearchPlus />
         </button>
     
         {/* Add to Cart */}
         <button
           className="p-2 bg-gray-200 rounded-full text-gray-600 hover:text-pink-500"
           onClick={(e) => handleAddToCart(e, product)}
         >
             <FaShoppingCart />
         </button>
     
         {/* Add to Wishlist */}
         <button className="p-2 bg-gray-200 rounded-full text-gray-600 hover:text-pink-500">
           <FaHeart />
         </button>
       </div>
       </Link>
     </div>

  
       ))} 
     </div>
     </section> );
};

export default TrendingProducts;
