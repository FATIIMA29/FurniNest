// import { defineQuery, groq } from "next-sanity";
// import { client } from "./client";

// export const searchProductsByName = async (searchParam: string) => {
//   try {
//     // Execute Query
//     const PRODUCT_SEARCH_QUERY = defineQuery(`
//       *[_type == "product" && name match $searchParam] | order(name asc)
//     `);

//     // Use sanityClient.fetch to send the query and pass the search parameter with a wildcard
//     const products = await client.fetch(PRODUCT_SEARCH_QUERY, {
//       params: {
//         searchParam: `*${searchParam}*`, // Append wildcard for partial match
//       },
//     });

//     // Return the list of products, or an empty array if none are found
//     return products || [];
//   } catch (error) {
//     console.error("Error fetching products by name:", error);
//     return [];
//   }
// };
