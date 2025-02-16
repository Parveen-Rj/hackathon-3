import Image from "next/image";
import React from "react";

export default function Card() {
  return (
    <div className="h-auto  w-full flex flex-wrap items-center justify-between px-4 py-4 bg-white">
      {/* Logo */}
      <div className="w-[120px] h-[40px] flex-shrink-0">
        <Image
          src="/Ads2.png"
          alt="ads2"
          width={500}  
          height={300}
          className="w-full h-full object-contain ml-4"
        />
      </div>
      </div>
  )
    }
   