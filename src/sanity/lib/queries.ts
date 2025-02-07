import { groq } from "next-sanity";

export const allProducts = groq`*[_type == "product"]`;

export const four = groq`*[_type == "product"][0..2]`;

export const latest = groq`*[_type == "product"][6..8]`;
export const trending = groq`*[_type == "product"][3..5]`;
