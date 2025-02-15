/*"use client"
import React, { useEffect, useState } from 'react'
import { Car } from '../../../types/products'
import { getCartItems } from '../actions/actions'

import Link from 'next/link'
import Image from 'next/image'

import { urlFor } from '@/sanity/lib/image'
import { CgChevronRight } from "react-icons/cg";

import { client } from '@/sanity/lib/client'



const CheckOut = () => {

    const [cartItems, setCartItems] = useState<Car[]>([])
    const [discount, setDiscount] = useState<number>(0)
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        zipCode: "",
        city: "",
    });
    const [formErrors, setFormErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        address: false,
        zipCode: false,
        city: false,
    })

    useEffect(() => {
        setCartItems(getCartItems())
        const appliedDiscount = localStorage.getItem("appliedDiscount")
        if (appliedDiscount) {
            setDiscount(Number(appliedDiscount))
        }
    }, [])

    const subTotal = cartItems.reduce(
        (total, item) => total + item.originalPrice * item.inventory, 0)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [e.target.value]: e.target.value,
        });
    };
    const ValidateForm = () => {
        const errors = {
            firstName: !formValues.firstName,
            lastName: !formValues.lastName,
            email: !formValues.email,
            phone: !formValues.phone,
            address: !formValues.address,
            zipCode: !formValues.zipCode,
            city: !formValues.city,
        };
        setFormErrors(errors);
        return Object.values(errors).every((error) => !error);
    };
    const handlePlaceOrder = async () => {
        const orderData = {
            _type: "order",
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            address: formValues.address,
            city: formValues.city,
            zipCode: formValues.zipCode,
            phone: formValues.phone,
            email: formValues.email,
            cartItems: cartItems.map(item => ({
                _type: "reference",
                _ref: item._id
            })),
            total: subTotal,
            discount: discount,
            orderDate: new Date().toISOString(),

        };
        try {
            await client.create(orderData)
            localStorage.removeItem("appliedDiscount")
        } catch (error) {
            console.error("arror creating order", error)
        }




    };
    return (
        <div className='min-h-screen bg-gray-50'>

            <div className='mt-6'>
                <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <nav className='flix items-center gap-2 py-4'>
                        <Link href={"/cart"}
                            className='text-[#666666] hover:text-black transition text-sm'>
                            cart
                        </Link>
                        <CgChevronRight />
                        <span>
                            Secure Your Ride – Quick & Easy Checkout!
                        </span>
                    </nav>
                </div>
            </div>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <div className='bg-white border-rounded-lg p-6 space-x-6'>
                        <h2 className='text-lg font-semibold mb-4'>
                            Your Rental Summary
                        </h2>
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item._id}
                                    className='flex items-center gap-4 py-3 border-b'>
                                    <div className='w-6 h-16 rounded overflow-hidden'>
                                        {item.image && (
                                            <Image
                                                src={urlFor(item.image).url()}
                                                alt='image'
                                                width={50}
                                                height={50}
                                                className="object-cover w-full h-full" />
                                        )}
                                    </div>
                                    <div className='flex-1'>
                                        <h3 className='text-sm font-medium'>
                                            {item.name}
                                        </h3>
                                        <p className='text-xs text-gray-500'>Days Rented: {item.inventory}</p>
                                    </div>
                                    <p>
                                        ${item.originalPrice * item.inventory}</p>
                                </div>
                            ))
                        ) : (
                            <p className='text-xs font-medium'>No cars selected for rent</p>
                        )}
                        <div className='text-right pt-4'>
                            <p className='text-sm'>
                                SubTotal: <span className='font-medium'>${subTotal}</span>
                            </p>
                            <p className='text-sm'>
                                Discount: <span className='font-medium'>${discount}</span>
                            </p>
                            <p className='text-lg font-semiboldn'>
                                Total : ${subTotal.toFixed(2)}
                            </p>
                        </div>




                    </div>

                    


                    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Billing Information</h2>
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">First Name  </label>

                                <input
                                    type="text"
                                    id='firstName'
                                    placeholder='Enter Your First Name'
                                    value={formValues.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                                {formErrors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        First Name is Required
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Last Name </label>
                                <input
                                    type="text"
                                    id='firstName'
                                    placeholder='Enter Your First Name'
                                    value={formValues.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                                {formErrors.lastName && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Last Name is Required
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Address</label>
                                <input
                                    type="text"
                                    id='firstName'
                                    placeholder='Enter Your First Name'
                                    value={formValues.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                                {formErrors.address && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Address is Required
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">Phone</label>
                                <input
                                    type="text"
                                    id='firstName'
                                    placeholder='Enter Your First Name'
                                    value={formValues.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                                {formErrors.phone && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Phone is Required
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">City</label>
                                <input
                                    type="text"
                                    id='firstName'
                                    placeholder='Enter Your First Name'
                                    value={formValues.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                                {formErrors.city && (
                                    <p className="text-red-500 text-sm mt-1">
                                        City is Required
                                    </p>

                                )}
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium">ZipCode</label>
                                <input
                                    type="text"
                                    id='firstName'
                                    placeholder='Enter Your First Name'
                                    value={formValues.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                                {formErrors.zipCode && (
                                    <p className="text-red-500 text-sm mt-1">
                                        ZipCode is Required
                                    </p>
                                )}
                            </div>
                            <button onClick={handlePlaceOrder}
                                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200">
                                Place Order
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};
export default CheckOut



if(validateForm()) {
    localStorage.removeItem("appliedDiscount")
}*/





"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCartItems } from "@/app/actions/actions";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { CgChevronRight } from "react-icons/cg";
import { Car } from "../../../types/products";
import { client } from "@/sanity/lib/client";
import Swal from "sweetalert2";



export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Car[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

  useEffect(() => {
    
    setCartItems(getCartItems)
    //fetchCartItems();


    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.pricePerDay * item.inventory,
    0
  );
  //const total = Math.max(subTotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const ValidateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      address: !formValues.address,
      city: !formValues.city,
      zipCode: !formValues.zipCode,
      phone: !formValues.phone,
      email: !formValues.email,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = async () => {
Swal.fire({
  title: "Processing your order...",
  text: "Please wait a moment",
  icon:"info",
  showCancelButton : true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor :"#d33",
  confirmButtonText : "Processed!"
  
}).then((result) => {
  if(result.isConfirmed) {
   if (ValidateForm()) {
    localStorage.removeItem("appliedDiscount");
    Swal.fire(
      "Success!",
      "Your order has been successfully processed!",
      "success"
    );
   } else {
    Swal.fire(
     "Error!",
     "Please fill in the all the fields before proceeding.",
     "error" 
    );
   }
  }
});   


    
    const orderData = {
      _type: "order",
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      address: formValues.address,
      city: formValues.city,
      zipCode: formValues.zipCode,
      phone: formValues.phone,
      email: formValues.email,
      cartItems: cartItems.map(item => ({
          _type: "reference",
          _ref: item._id
      })),
      total: subtotal,
      discount: discount,
      orderDate: new Date().toISOString(),

  };
  try {
      await client.create(orderData)
      localStorage.removeItem("appliedDiscount")
  } catch (error) {
      console.error("arror creating order", error)
  }

  };

  return (
    <div className={`min-h-screen bg-gray-50`}>
      {/* Breadcrumb */}
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-4">
            <Link
              href={"/cart"}
              className="text-[#666666] hover:text-black transition text-sm"
            >
              Cart
            </Link>
            <CgChevronRight className="w-4 h-4 text-[#666666]" />
            <span className="text-sm">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 py-3 border-b"
                >
                  <div className="w-16 h-16 rounded overflow-hidden">
                    {item.image && (
                      <Image
                        src={urlFor(item.image).url()}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">
                      Quantity: {item.inventory}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    ${item.pricePerDay * item.inventory}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            <div className="text-right pt-4">
              <p className="text-sm">
                Subtotal: <span className="font-medium">${subtotal.toFixed(2)}</span>
              </p>
              <p className="text-sm">
                Discount: <span className="font-medium">-${discount.toFixed(2)}</span>
              </p>
              <p className="text-lg font-semibold">
                Total: ${subtotal.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Billing Form */}
          <div className="bg-white border rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  className="border px-3 py-2 w-full rounded"
                />
                {formErrors.firstName && (
                  <p className="text-sm text-red-500">
                    First name is required.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName">Last Name </label>
                <input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                />
                {formErrors.lastName && (
                  <p className="text-sm text-red-500">
                    Last name is required.
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="address">Address </label>
              <input
                id="address"
                placeholder="Enter your address"
                value={formValues.address}
                onChange={handleInputChange}
              />
              {formErrors.address && (
                <p className="text-sm text-red-500">Address is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                id="city"
                placeholder="Enter your city"
                value={formValues.city}
                onChange={handleInputChange}
              />
              {formErrors.city && (
                <p className="text-sm text-red-500">City is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="zipCode">Zip Code</label>
              <input
                id="zipCode"
                placeholder="Enter your zip code"
                value={formValues.zipCode}
                onChange={handleInputChange}
              />
              {formErrors.zipCode && (
                <p className="text-sm text-red-500">Zip Code is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                placeholder="Enter your phone number"
                value={formValues.phone}
                onChange={handleInputChange}
              />
              {formErrors.phone && (
                <p className="text-sm text-red-500">Phone is required.</p>
              )}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder="Enter your email address"
                value={formValues.email}
                onChange={handleInputChange}
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">Email is required.</p>
              )}
            </div>
            <button
              className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}