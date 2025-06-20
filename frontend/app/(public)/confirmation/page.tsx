"use client";
import CheckoutSteps from "@/components/public/CheckoutSteps";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

export default function ConfirmationPage(){

    return(
        <>
         <div className="p-4">
                <h1 className=" text-2xl font-bold mb-2">Confirmation</h1>
                <p className="text-gray-500 font-semibold">
                  You Have four items in your cart.
                </p>
                <CheckoutSteps cart checkout confirmation/>
                <div className="rounded bg-white border p-10 gap-4 flex flex-col items-center justify-center">
                    <CircleCheck size={100} color="#27CE60"/>
                    <h1 className="text-xl font-semibold text-center">Your order has been confirmed.</h1>
                    <p className="text-red-600 text-lg">This page is created intentionally to complete the checkout process. After placing the order (through payment gateway or cash on delivery), use will redirected to this page, saying the order has been placed. Also we can show the order items as well.</p>
                    <div className="flex gap-2 flex-wrap items-center justify-center">
                        <Link href="/customer/orders" className="border rounded p-2 border-red-600">Track your order</Link>
                        <Link href="/" className="border rounded p-2 text-white bg-red-600">Shop More</Link>
                    </div>
                </div>

                <div className="bg-white border rounded p-4 mt-5 mb-10">
                    <h3 className="font-semibold text-lg">Latest products based on your interest.</h3>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        <div className="rounded border bg-red-100 p-4 grid gap-2">
                            <div className="bg-gray-100 border rounded w-full h-[100px] flex items-center justify-center">image</div>
                            <div className="bg-gray-50 w-full h-[20px]">product name</div>
                            <div className="bg-gray-50 w-full h-[20px]">description</div>
                            <div className="bg-gray-50 w-full h-[20px]">$ 100</div>
                            <div className="bg-gray-50 w-full h-[20px]">tag</div>
                        </div>
                        <div className="rounded border bg-red-100 p-4 grid gap-2">
                            <div className="bg-gray-100 border rounded w-full h-[100px] flex items-center justify-center">image</div>
                            <div className="bg-gray-50 w-full h-[20px]">product name</div>
                            <div className="bg-gray-50 w-full h-[20px]">description</div>
                            <div className="bg-gray-50 w-full h-[20px]">$ 100</div>
                            <div className="bg-gray-50 w-full h-[20px]">tag</div>
                        </div>
                        <div className="rounded border bg-red-100 p-4 grid gap-2">
                            <div className="bg-gray-100 border rounded w-full h-[100px] flex items-center justify-center">image</div>
                            <div className="bg-gray-50 w-full h-[20px]">product name</div>
                            <div className="bg-gray-50 w-full h-[20px]">description</div>
                            <div className="bg-gray-50 w-full h-[20px]">$ 100</div>
                            <div className="bg-gray-50 w-full h-[20px]">tag</div>
                        </div>
                        <div className="rounded border bg-red-100 p-4 grid gap-2">
                            <div className="bg-gray-100 border rounded w-full h-[100px] flex items-center justify-center">image</div>
                            <div className="bg-gray-50 w-full h-[20px]">product name</div>
                            <div className="bg-gray-50 w-full h-[20px]">description</div>
                            <div className="bg-gray-50 w-full h-[20px]">$ 100</div>
                            <div className="bg-gray-50 w-full h-[20px]">tag</div>
                        </div>
                        <div className="rounded border bg-red-100 p-4 grid gap-2">
                            <div className="bg-gray-100 border rounded w-full h-[100px] flex items-center justify-center">image</div>
                            <div className="bg-gray-50 w-full h-[20px]">product name</div>
                            <div className="bg-gray-50 w-full h-[20px]">description</div>
                            <div className="bg-gray-50 w-full h-[20px]">$ 100</div>
                            <div className="bg-gray-50 w-full h-[20px]">tag</div>
                        </div>
                    </div>
                </div>
                
        </div>
        </>
    )
}