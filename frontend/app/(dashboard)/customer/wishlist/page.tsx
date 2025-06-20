import { Plus, ShoppingCart, Store, Trash2 } from "lucide-react";
import Image from "next/image";

export default function CustomerWishlistPage() {
  return (
    <>
      <div className="grid sm:flex items-center justify-between gap-3">
        <div className=" order-2 sm:order-1">
          <h1 className="text-2xl font-bold mb-1">Wishlist</h1>
          <p className="text-gray-500 mb-5">
            Manage your saved items across multiple wishlists.
          </p>
        </div>
        <div className=" order-1 sm:order-2">
          <button className="rounded px-3 py-2 flex gap-3 bg-red-600 cursor-pointer text-white">
            <Plus /> Create New List
          </button>
        </div>
      </div>
      <button className="w-full flex gap-2 p-3 bg-white text-gray-500 rounded border cursor-pointer">
        <Plus /> All All To Cart
      </button>
      
      <div className="bg-white p-6 rounded border my-5">
        <div className="flex gap-4 border-b pb-3">
          <input
            type="checkbox"
            className="w-4 h-4 accent-red-500"
            name=""
            id="cartCheckbox"
          />
          <label htmlFor="cartCheckbox" className="flex gap-3 text-gray-500">
            <Store /> Store gadget
          </label>
        </div>

        <div className="grid sm:flex justify-between gap-4 my-5">
          <div className="flex gap-4">
            <input
              type="checkbox"
              className="w-4 h-4 my-auto accent-red-500"
              name=""
              id="cartCheckbox"
            />
            <div className="border w-[90px] h-[90px] rounded-lg flex items-center justify-center p-2">
              <Image
                src="/images.jpeg"
                width={100}
                height={100}
                objectFit="cover"
                alt="product image"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="wrap-break-word">
                <h3 className="font-semibold text-gray-900 leading-tight sm:leading-normal text-[15px] sm:text-lg">
                  Wireless Noise-Cancelling Headphones
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                  Black | <span className="text-gray-400">Premium Edition</span>
                </p>
              </div>
              <p className="font-bold text-gray-900 mt-2 text-base sm:text-md">
                $249.99
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto flex flex-row sm:flex-col gap-3 justify-between items-center sm:items-end">
            <button className="text-gray-500 hover:text-red-600 cursor-pointer order-2 sm:order-1 ">
              <Trash2 />
            </button>
            <button className="flex items-center justify-center gap-2 px-3 py-2 rounded text-white bg-red-600 cursor-pointer order-1 sm:order-2 w-full sm:w-auto">
              <ShoppingCart /> Add to Cart
            </button>
          </div>
        </div>



        
      </div>
    </>
  );
}
