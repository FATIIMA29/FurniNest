import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Product } from "../../../type/product";
import { client } from "@/sanity/lib/client";
import { four } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { addToCart } from "../actions/actions";

const FeaturedProducts = () => {
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchproduct() {
      const fetchedProduct: Product[] = await client.fetch(four);
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

  return (
    <section className="py-16 px-8 bg-white">
      <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {product.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-xl shadow-md p-4 text-center relative group overflow-hidden transition-all duration-300 hover:bg-purple-100"
          >
            <Link href={`/product/${product.slug.current ?? '#'}`}>
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
    </section>
  );
};

export default FeaturedProducts;
