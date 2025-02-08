import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity"
import Image from "next/image"; 
import { Car } from "../../../../types/products";



interface CarPageProps {
    params : Promise <{slug : string}>
}

async function getCar(slug : string): Promise<Car> {
    return client.fetch(
        groq`*[_type == "car" && slug.current == $slug][0] {
       _id,
    name,   
            slug,
            brand,
            type,
            fuelCapacity,
            transmission,
            seatingCapacity,
            pricePerDay,
            originalPrice,
            tags,
            description,
            image
        }`, {slug}
    ) 
} 
export default async function CarPage({params} :CarPageProps ) {
    const { slug } = await  params;
    const car = await getCar(slug);
    

    return(
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
<div className="aspect-square ">

{car.image  && (
    <Image
    src={urlFor(car.image).url()}
    alt={car.name}
    width={500}
    height={500}
    className="rounded-lg shadow-md"
    />

)}
</div>
<div className="flex flex-col gap-8">
    
    <h1 className="text-4xl font-bold">{car.name}</h1>
                    <p><strong>Brand:</strong> {car.brand}</p>
                    <p><strong>Type:</strong> {car.type}</p>
                    <p><strong>Fuel Capacity:</strong> {car.fuelCapacity}</p>
                    <p><strong>Transmission:</strong> {car.transmission}</p>
                    <p><strong>Seating Capacity:</strong> {car.seatingCapacity}</p>
                    <p><strong>Price Per Day:</strong> {car.pricePerDay}</p>
                    <p><strong>Original Price:</strong> {car.originalPrice}</p>
                    <p><strong>description:</strong> {car.description}</p>
                    <p><strong>Tags:</strong> {car.tags}</p>
                    
    
</div>
        </div>

      </div>  
    )
}    
