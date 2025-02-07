import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Product } from "../../../../type/product";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface ProductPageProps {
  params: { slug: string };
}

// Fetch product data from Sanity
async function getProduct(slug: string): Promise<Product | null> {
  const product: Product | null = await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      _type,
      image,
      price,
      description,
      discountPercentage,
      "slug": slug.current
    }`,
    { slug }
  );
  return product || null;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = await getProduct(slug);

  // Handle invalid product case
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-3xl font-bold text-red-500">Product Not Found</h2>
        <p className="text-gray-500 mt-2">{`The product you're looking for doesn't exist.`}</p>
        <Link href="/">
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700">
            Go Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div className="flex justify-center">
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg shadow-lg object-cover border"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="bg-white p-6 shadow-lg rounded-lg border flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-4">{product.description}</p>
          
          {product.discountPercentage > 0 && (
            <p className="text-green-600 font-semibold text-lg mb-2">
              {product.discountPercentage}% OFF
            </p>
          )}
          
          <p className="text-2xl font-bold text-purple-600 mb-4">${product.price}</p>

          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
