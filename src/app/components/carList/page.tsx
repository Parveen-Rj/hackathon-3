"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { allCars } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

//import { slug } from "@/app/product/slug/page;
//import product from "@/sanity/schemaTypes/product";
import { Car } from "../../../../types/products";
import { addToCart } from "@/app/actions/actions";
import Swal from "sweetalert2";
//import Car from "@/app/product/[slug]/page";
//import CarPage from "../product/[slug]/page";

const CarList = () => {
    const [car, setCar] = useState<Car[]>([])



    useEffect(() =>{
        async function fetchCar() {
          const fetchedCar : Car[] = await client.fetch(allCars)
          setCar(fetchedCar) 
        }
        fetchCar();
    },[])
const handleAddToCart = (e : React.MouseEvent, car: Car) => {
    e.preventDefault()
    //addToCart(car)
    Swal.fire({
        position : "top-right",
        icon : "success",
        title : `${car.name} added to cart`,
        showConfirmButton : false,
        timer : 1000
    })
    addToCart(car)
    
}



   return (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Our Latest Cars</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {car.map((car) =>(
         
        <div 
        key={car._id}
        className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
        >
        
            <Link href={`/product/${car.slug?.current}`}>
            
            {car.image && (
                <Image
                src={urlFor(car.image).url()}
                alt={car.name}
                width={100}
                height={200}
                className="w-full h-18 object-cover rounded-md"
                />
            )}
           
            <h2 className="text-lg font-semibold mt-4">{car.name}</h2>
            <p className="text-gray-500 mt-2">
{car.pricePerDay ? `${car.pricePerDay}/day`: "Price not available"}
</p>
<button
className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out"
    onClick={(e) => handleAddToCart(e, car)}
    >
Add To Cart
</button>

</Link>

    </div>
      

     )
     )}      
</div>
        </div>
    )
};
export default CarList;
