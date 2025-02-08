import { groq } from "next-sanity";


export const allCars = groq `*[_type == "car"]`;
export const four = groq`*[_type == "car" && defined(slug.current)] {
 _id,
    name,
     "slug": slug.current,
     _type,
     
     originalPrice,
     pricePerDay
     description,         
    
image {
asset -> {
      _ref
    }
},
     
}`;

