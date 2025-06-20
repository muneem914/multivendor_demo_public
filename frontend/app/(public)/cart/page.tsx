"use client";
import CheckoutSteps from "@/components/public/CheckoutSteps";
import { Plus, Minus, Store, Tag, Trash2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { FormEvent, useState } from "react";
import image from '@/public/images.jpeg';
import { useRouter } from "next/navigation";

export default function Cart() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      alert("Quantity can't be less than 1");
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };


  type Product = {
  id: string
  name: string
  img: StaticImageData
  description: string
  price: number
  storeId: string
}

type Store = {
  id: string
  name: string
  products: Product[]
}

const stores: Store[] = [
  {
    id: 'store1',
    name: 'Store Gadget',
    products: [
      { id: 's1p1', name: 'Headphones',img: image,  description: 'product description s1p1', price: 100, storeId: 'store1' },
      { id: 's1p2', name: 'Mouse',img: image,  description: 'product description s1p2', price: 40, storeId: 'store1' },
    ],
  },
  {
    id: 'store2',
    name: 'Tech World',
    products: [
      { id: 's2p1', name: 'Keyboard',img: image, description: 'product description s2p1', price: 60, storeId: 'store2' },
      { id: 's2p2', name: 'Webcam',img: image, description: 'product description s2p2', price: 80, storeId: 'store2' },
    ],
  },
]


// State for checkboxes
const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());

// Toggle individual product selection
const toggleProduct = (productId: string) => {
  setSelectedProducts(prevSelected => {
    const newSelected = new Set(prevSelected);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    return newSelected;
  });
};

// Toggle all products from one store
const toggleStore = (store: Store) => {
  setSelectedProducts(prevSelected => {
    const newSelected = new Set(prevSelected);
    const storeProductIds = store.products.map(p => p.id);
    const allSelected = storeProductIds.every(id => newSelected.has(id));

    storeProductIds.forEach(id => {
      if (allSelected) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
    });

    return newSelected;
  });
};

// Toggle all products from all stores
const toggleAll = () => {
  const allProductIds = stores.flatMap(store => store.products.map(p => p.id));
  const allSelected = allProductIds.every(id => selectedProducts.has(id));

  setSelectedProducts(allSelected ? new Set() : new Set(allProductIds));
};

const isStoreSelected = (store: Store) =>
  store.products.every(p => selectedProducts.has(p.id))

const allProductIds = stores.flatMap(s => s.products.map(p => p.id))
const isAllSelected = allProductIds.every(id => selectedProducts.has(id))


console.log(isStoreSelected);
console.log(isAllSelected)
console.log(selectedProducts)

const route = useRouter();

const submitHandler = (e: FormEvent) => {
  e.preventDefault();
  route.push('/checkout')
}

  return (
    <>
      <div className="p-4">
        <h1 className=" text-2xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-gray-500 font-semibold">
          You Have four items in your cart.
        </p>
        <CheckoutSteps cart/>
        <div className="grid grid-cols-1 gap-5 sm:flex flex-row my-5">
          <div className="basis-2/3">
            <div className="border rounded-lg bg-white p-4 mb-5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-red-500"
                  name=""
                  id="cartCheckbox"
                  checked={isAllSelected}
                  onChange={toggleAll}

                />
                <label htmlFor="cartCheckbox" className=" text-gray-500">
                  Select All (4 Items)
                </label>
              </div>
              <button className="flex gap-3 text-red-500 hover:text-red-600 items-center">
                <Trash2 /> Delete
              </button>
            </div>

            
            {
                stores.map((store) => (
                    <div key={store.id}>
                    <div className="border rounded-lg bg-white p-4 mb-5">
              <div className="flex gap-4 border-b pb-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-red-500"
                  name=""
                  checked={isStoreSelected(store)}
                  onChange={() => toggleStore(store)}
                  id="cartCheckbox"
                />
                <label
                  htmlFor="cartCheckbox"
                  className="flex gap-3 text-gray-500"
                >
                  <Store /> {store.name}
                </label>
              </div>


              {
                store.products.map((product) => (
                    <div key={product.id}>
                        <div className="grid sm:flex justify-between gap-4 my-5">
                <div className="flex gap-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 my-auto accent-red-500"
                    name=""
                    checked={selectedProducts.has(product.id)}
                    onChange={() => toggleProduct(product.id)}
                    id="cartCheckbox"
                  />
                  <div className="border w-[90px] h-[90px] rounded-lg flex items-center justify-center p-2">
                    <Image
                      src={product.img}
                      width={100}
                      height={100}
                      objectFit="cover"
                      alt="product image"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="wrap-break-word">
                      <h3 className="font-semibold text-gray-900 leading-tight sm:leading-normal text-[15px] sm:text-[18px]">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                        {product.description} 
                        {/* |{" "}
                        <span className="text-gray-400">Premium Edition</span> */}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900 mt-1 text-base sm:text-md">
                      ${product.price}
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-auto flex flex-row sm:flex-col gap-3 sm:justify-between items-center sm:items-end">
                  <button className="text-red-500 hover:text-red-600 cursor-pointer order-2 sm:order-1 ">
                    <Trash2 />
                  </button>
                  <div className="flex items-center justify-center order-1 sm:order-2">
                    <button
                      onClick={handleDecrease}
                      disabled={quantity === 1}
                      className="border rounded-full cursor-pointer p-1 hover:border-red-600 hover:text-red-600 disabled:text-gray-400 disabled:pointer-events-none transition"
                    >
                      <Minus />
                    </button>
                    <input
                      type="number"
                      name=""
                      id=""
                      value={quantity}
                      readOnly
                      className="w-10 text-center pl-2"
                    />
                    <button
                      onClick={handleIncrease}
                      className="border rounded-full cursor-pointer p-1 hover:border-red-600 hover:text-red-600 transition"
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
              </div>
                    </div>
                ))
              }




            </div>
                    </div>
                ))
            }


            {/* <div className="border rounded-lg bg-white p-4 mb-5">
              <div className="flex gap-4 border-b pb-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-red-500"
                  name=""
                  id="cartCheckbox"
                />
                <label
                  htmlFor="cartCheckbox"
                  className="flex gap-3 text-gray-500"
                >
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
                      <h3 className="font-semibold text-gray-900 leading-tight sm:leading-normal text-[15px] sm:text-[18px]">
                        Wireless Noise-Cancelling Headphones
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                        Black |{" "}
                        <span className="text-gray-400">Premium Edition</span>
                      </p>
                    </div>
                    <p className="font-bold text-gray-900 mt-1 text-base sm:text-md">
                      $249.99
                    </p>
                  </div>
                </div>
                <div className="w-full sm:w-auto flex flex-row sm:flex-col gap-3 sm:justify-between items-center sm:items-end">
                  <button className="text-red-500 hover:text-red-600 cursor-pointer order-2 sm:order-1 ">
                    <Trash2 />
                  </button>
                  <div className="flex items-center justify-center order-1 sm:order-2">
                    <button
                      onClick={handleDecrease}
                      disabled={quantity === 1}
                      className="border rounded-full cursor-pointer p-1 hover:border-red-600 hover:text-red-600 disabled:text-gray-400 disabled:pointer-events-none transition"
                    >
                      <Minus />
                    </button>
                    <input
                      type="number"
                      name=""
                      id=""
                      value={quantity}
                      readOnly
                      className="w-10 text-center pl-2"
                    />
                    <button
                      onClick={handleIncrease}
                      className="border rounded-full cursor-pointer p-1 hover:border-red-600 hover:text-red-600 transition"
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
              </div>
            </div> */}




            {/* <div className="border rounded-lg bg-white p-3 mb-5"></div> */}
          </div>

          <div className="basis-1/3 border rounded-lg h-fit bg-white p-3">
            <h3 className="text-lg mb-3 font-bold">Order Summary</h3>
            <div className="flex items-center justify-between mb-2">
              <p>Subtotal</p>
              <p>$ 0.00</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p>Shipping</p>
              <p>$ 0.00</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p>Tax</p>
              <p>$ 0.00</p>
            </div>

            <div className="flex w-full items-center gap-3 mt-2 mb-4">
              <div className="relative">
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
            <hr />
            <div className="flex items-center justify-between font-semibold my-2">
              <p>Total</p>
              <p>$ 0.00</p>
            </div>
            <div className="flex justify-end mt-3">
              <button onClick={submitHandler} className="bg-red-500 text-white hover:bg-red-600 rounded px-3 py-2 cursor-pointer">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
