
import React from "react";
import Header from "./components/Header";
import CarList from "./components/carList/page";
import Footer from "./components/Footer";
import Card from "./components/card";


export default function Page() {
  return (
    <div>
      <Header/>
      <Card/>
     <CarList/>
     
     <Footer/>
     
    </div>
  );
}
