"use client";

import CheckoutSteps from "@/components/public/CheckoutSteps";
import { Banknote, Check, CircleCheck, LockKeyhole, MapPin, Tag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface AddressItem {
  id: number;
  name: string;
  default: boolean;
  address: string;
}

export default function CheckoutPage() {
  const route = useRouter();
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    route.push("/confirmation");
  };

  const addressesData: AddressItem[] = [
    {
      id: 1,
      name: "home",
      default: true,
      address: "12 Rosewood Lane, Flat 3A, Manchester, M14, 5Tp United Kingdom",
    },
    {
      id: 2,
      name: "work",
      default: false,
      address: "Dhaka, Bananni Bangladesh",
    },
  ];
  const [addresses, setAddresses] = useState(addressesData)



  const addressHandler = (id: number) => {
    const updatedAddresses = addresses.map((address) => ({
        ...address,
        default: address.id === id,
    }));
    setAddresses(updatedAddresses)
  }
  return (
    <>
      <div className="p-4">
        <h1 className=" text-2xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-500 font-semibold">
          Please review and complete your purchase.
        </p>
        <CheckoutSteps cart checkout />

        <div className="border rounded bg-white p-4 mb-10">
          <h3 className="text-lg font-semibold mb-5">Shipping Information</h3>
          <p className="font-semibold">Saved Addresses</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">

            {addresses.map((item) => (
              <div
                onClick={() => addressHandler(item.id)}
                key={item.id}
                className={`border rounded p-3 cursor-pointer ${
                  item.default ? "bg-red-50 border-red-600" : ""
                }`}
              >
                <div className={`flex items-center justify-between mb-5`}>
                  <div className="flex items-center gap-3">
                    <MapPin />{" "}
                    <span className="font-semibold capitalize">
                      {item.name}
                    </span>{" "}
                    {item.default ? (
                      <span className="text-gray-500 flex gap-1 items-center">
                        <Check /> Default
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  {item.default ? (
                    <div className="text-red-600">
                      <CircleCheck size={20} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <p className="text-gray-500">{item.address}</p>
              </div>
            ))}

          </div>

            <form action="">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="grid gap-2">
                        <label htmlFor="name" className="font-semibold">Full Name <span className="text-red-600">*</span></label>
                        <input type="text" placeholder="Enter your full name" required className="border rounded p-2"/>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="number" className="font-semibold">Phone Number <span className="text-red-600">*</span></label>
                        <input type="text" placeholder="Enter your phone number" required className="border rounded p-2"/>
                    </div>
                </div>

                <div className="grid grid-cols-1 my-2 gap-3">
                    <div className="grid gap-2">
                        <label htmlFor="email" className="font-semibold">Email <span className="text-red-600">*</span></label>
                        <input type="text" placeholder="Enter your Email" id="email" required className="border rounded p-2"/>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="address1" className="font-semibold">Address Lane 1 <span className="text-red-600">*</span></label>
                        <input type="text" placeholder="Enter your address" id="address1" required className="border rounded p-2"/>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="address2" className="font-semibold">Address Lane 2 (Optional)</label>
                        <input type="text" placeholder="Enter your address" id="address2" className="border rounded p-2"/>
                    </div>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="grid gap-2">
                        <label htmlFor="city" className="font-semibold">City <span className="text-red-600">*</span></label>
                        <input type="text" placeholder="Your City" required id="city" className="border rounded p-2"/>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="zip" className="font-semibold">Zip/Postal Code <span className="text-red-600">*</span></label>
                        <input type="text" placeholder="Enter your zip code" required id="zip" className="border rounded p-2"/>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="country" className="font-semibold">Country <span className="text-red-600">*</span></label>
                        <input type="text" placeholder="Your country" required id="country" className="border rounded p-2"/>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="state" className="font-semibold">State/Province <span className="text-red-600">*</span></label>
                        <input type="text" placeholder="Enter your state" required id="state" className="border rounded p-2"/>
                    </div>
                </div>

                <div className="flex gap-3 mt-4">
                    <input type="checkbox" name="" id="billing" />
                    <label htmlFor="billing">Billing address is the same as shipping</label>
                </div>
            </form>

        </div>

        <div className="border rounded bg-white p-4 mb-10">
            <h3 className="text-lg font-semibold mb-5">Payment Method</h3>
            <div className="rounded border bg-red-100 border-red-600 p-4 flex gap-2 mb-5">
                <LockKeyhole/>
                <div className="">
                    <h3 className="text-md font-semibold mb-2">You will be redirected to XYZ gateway, to complete your transaction</h3>
                    <p className="text-gray-500">XYZ gateway supports all major payemnt method including credit/debit cards, mobile banking and digital wallets</p>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <input type="checkbox" className="w-4 h-4" name="" id="gateway" />
                <label htmlFor="gateway">I understand I will complete my payment via a secure external gateway (SSLCommerz)</label>
            </div>
            <p className="text-red-600 mt-2 mb-4">* This acknowledgement is required before placing your order.</p>
            <div className="rounded border p-4 flex justify-between gap-2">
                <div className="grid gap-3">
                    <div className="flex gap-2 font-semibold text-lg">
                        <input type="radio" name="" id="cash" className="w-5"/>
                        <label htmlFor="cash" className=" text-md font-semibold">Cash On Delivery</label>
                    </div>
                    <p className="text-gray-500">Payment collected upon delivery</p>
                </div>
                <div className="px-2 py-1 border rounded text-green-500 h-fit flex items-center justify-center">
                    <Banknote size={36}/>
                </div>
            </div>
        </div>

        <div className="border rounded bg-white p-4 mb-10">
            <h3 className="font-semibold mb-5">Promo Code</h3>

            <div className="flex w-full items-center gap-3 mt-2 mb-4">
              <div className="relative w-full z-0">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-500">
                  <Tag />
                </span>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter a promo code"
                  className="w-full border rounded pl-10 pr-3 py-2"
                />
              </div>
              <button className="bg-red-500 text-white hover:bg-red-600 rounded px-3 py-2 cursor-pointer">
                Apply
              </button>
            </div>

        </div>

        <div className="border rounded bg-white p-4 mb-10">
            <h3 className="text-lg font-semibold mb-5">Order Summary</h3>

            <div className="border-b pb-5 my-5 flex gap-2">
                <div className="border rounded p-1">
                    <img src="/images.jpeg" alt="product image" className="w-[60px]" />
                </div>
                <div className="grid  w-full">
                    <div className="wrap-break-word">
                      <h3 className="font-semibold text-gray-900 leading-tight sm:leading-normal text-[15px] sm:text-[18px]">
                        Wireless Noise-Cancelling Headphones
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                        Black |{" "}
                        <span className="text-gray-400">Premium Edition</span>
                      </p>
                    </div>
                    <div className="w-full flex justify-between">
                        <p className="font-bold text-gray-900 mt-1 text-base sm:text-md">
                      $249.99
                    </p>
                        <p className="text-gray-500 text-sm">
                      Quantity: 1
                    </p>
                    </div>
                </div>
            </div>

            <div className="border-b pb-5 my-5 flex gap-2">
                <div className="border rounded p-1">
                    <img src="/images.jpeg" alt="product image" className="w-[60px]" />
                </div>
                <div className="grid  w-full">
                    <div className="wrap-break-word">
                      <h3 className="font-semibold text-gray-900 leading-tight sm:leading-normal text-[15px] sm:text-[18px]">
                        Wireless Noise-Cancelling Headphones
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                        Black |{" "}
                        <span className="text-gray-400">Premium Edition</span>
                      </p>
                    </div>
                    <div className="w-full flex justify-between">
                        <p className="font-bold text-gray-900 mt-1 text-base sm:text-md">
                      $249.99
                    </p>
                        <p className="text-gray-500 text-sm">
                      Quantity: 1
                    </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-2">
                <div className="flex items-center justify-between">
                    <p>Subtotal</p>
                    <p>$809.96</p>
                </div>
                <div className="flex items-center justify-between">
                    <p>Shipping</p>
                    <p>$64.80</p>
                </div>
                <div className="flex items-center justify-between">
                    <p>Tax</p>
                    <p>$12.99</p>
                </div>
                <div className="border-b my-2"></div>
                <div className="flex items-center justify-between text-lg font-semibold">
                    <p className="">Total</p>
                    <p className="">$887.75</p>
                </div>
            </div>

            <div className="flex justify-between items-center mt-5">
                <button className="flex items-center px-3 py-2 gap-2 hover:bg-red-600 hover:text-white cursor-pointer transition border border-red-300 text-red-600 rounded"><X/> Cancel</button>
                <button onClick={submitHandler} className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white cursor-pointer border rounded transition">Place Order</button>
            </div>


        </div>

      </div>
    </>
  );
}
