'use client'
import {

  ArrowLeft,
  CircleCheck,
  Mail,
  MapPin,
  Phone,
  Printer,
  Truck,
  X,
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function OrderViewPage() {

const handlePrint = () => {
  const input = document.getElementById("order_print") as HTMLElement;
  if (!input) return;

  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice-order-id.pdf");
  });
};


  return (
    <>
      <div className="grid lg:flex justify-between gap-3">
        <h1 className="text-2xl font-bold mb-1 flex items-center gap-3">
          <ArrowLeft /> Order Details
        </h1>
        <div className="flex gap-3">
          <button onClick={handlePrint} className="flex gap-2 items-center px-3 py-2 hover:border-red-500 hover:text-red-500 border rounded">
            <Printer /> Print Invoice
          </button>
          <button className="flex gap-2 items-center px-3 py-2 bg-red-500 text-white border rounded">
            <Phone /> Contact Buyer
          </button>
        </div>
      </div>

      <div id="order_print" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
        <span style={{color: '#000000'}}>Hello from print.</span>
        </div>


      <div className="my-4 bg-white p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 mb-4">
          <div className="col-span-3 border rounded p-4">

            <div className="grid grid-cols-[auto_1fr] grid-rows-2 md:grid-flow-col md:grid-rows-2 gap-4 md:gap-y-0">
              <div className=" row-span-1 md:row-span-2 flex justify-center items-center">
                <img
                  src="/images.jpeg"
                  alt="image"
                  className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] object-cover"
                />
              </div>
              <div className=" flex items-start sm:items-center w-full justify-between gap-1 sm:gap-2">
                <h3 className="text-lg md:text-xl font-semibold">
                  Over the headphone wireless headphone
                </h3>
                <span className="rounded-full bg-yellow-100 capitalize text-yellow-600 px-3 py-1">
                  Pending
                </span>
              </div>
              <div className="border-t pt-3 sm:border-0 col-span-2 flex justify-between gap-1 sm:gap-2 md:gap-3">
                <div className="grid">
                  <p className="text-gray-500 mb-1 text-sm sm:text-lg">
                    Order ID
                  </p>
                  <p className="text-sm sm:text-lg">ORD-001</p>
                </div>
                <div className="grid">
                  <p className="text-gray-500 mb-1 text-sm sm:text-lg">Date</p>
                  <p className="text-sm sm:text-lg">May 15, 2025</p>
                </div>
                <div className="grid">
                  <p className="text-gray-500 mb-1 text-sm sm:text-lg">
                    Quantity
                  </p>
                  <p className="text-sm sm:text-lg">1</p>
                </div>
                <div className="grid">
                  <p className="text-gray-500 mb-1 text-sm sm:text-lg">
                    Condition
                  </p>
                  <p className="text-sm sm:text-lg">New</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="border rounded p-4">
            <h1 className="text-lg sm:text-xl font-semibold mb-5">Timeline</h1>


        <div className="relative">
            <span className="absolute border-l-2 h-[calc(100%-75px)] top-5 left-[19px] "></span>
                <div className="pl-2">
              <div className="flex gap-3 pb-6">
                <span className="p-0 m-0 text-blue-600 bg-white h-fit z-20 mt-1"><CircleCheck/></span>
                <div className="">
                  <h3 className="text-lg font-semibold pt-0">Order Placed</h3>
                  <p className="text-gray-500">May 15, 2025</p>
                </div>
              </div>
              <div className="flex gap-3 pb-6">
                <span className="p-0 m-0 text-blue-600 bg-white h-fit z-20 mt-1"><CircleCheck/></span>
                <div className="">
                  <h3 className="text-lg font-semibold pt-0">Payment confirmed</h3>
                  <p className="text-gray-500">May 15, 2025</p>
                </div>
              </div>
              <div className="flex gap-3 pb-6">
                <span className="p-0 m-0 text-gray-300 bg-white h-fit z-20 mt-1"><CircleCheck/></span>
                <div className="">
                  <h3 className="text-lg font-semibold pt-0">Processed</h3>
                  <p className="text-gray-500">Waiting for processing</p>
                </div>
              </div>
              <div className="flex gap-3 pb-6">
                <span className="p-0 m-0 text-gray-300 bg-white h-fit z-20 mt-1"><CircleCheck/></span>
                <div className="">
                  <h3 className="text-lg font-semibold pt-0">Shipped</h3>
                  <p className="text-gray-500">Not Shipped yet</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="p-0 m-0 text-gray-300 bg-white h-fit z-20 mt-1"><CircleCheck/></span>
                <div className="">
                  <h3 className="text-lg font-semibold pt-0">Delivered</h3>
                  <p className="text-gray-500">Waiting for delivery</p>
                </div>
              </div>
            </div>
        </div>



          </div>
          <div className="border rounded p-4">
            <h1 className="text-lg sm:text-xl font-semibold mb-5">
              Buyer Information
            </h1>
            <h3 className="text-lg my-4 font-semibold text-gray-500">Buyer</h3>
            <p className="font-semibold mb-1">Mike Turner</p>
            <p className="flex items-center gap-2 text-gray-500"><Mail/> example@gmail.com</p>
            <h3 className="text-lg my-4 font-semibold text-gray-500">Shipping Addeess</h3>
            <div className="flex gap-2">
                <span className="pt-1"><MapPin/></span>
                <p>62 Elm treee, Ave, Coventry, wst midlandds uk</p>
            </div>
            <h3 className="text-lg my-4 font-semibold text-gray-500">Payment Method</h3>
            <p className="font-semibold mb-1">Credit Card</p>
            <p className="flex items-center gap-2 text-gray-500 mb-5"><Mail/> **** **** **** 4242</p>
            <span className="py-1 px-3 bg-green-100 text-green-600 mt-5 rounded-full capitalize">paid</span>
          </div>

          <div className="border rounded p-4 h-fit">
            <h1 className="text-lg sm:text-xl font-semibold mb-5">
              Payment Info
            </h1>
            <div className="flex justify-between my-2">
                <p className="text-gray-500">Subtotal</p>
                <p className="">$99.99</p>
            </div>
            <div className="flex justify-between my-2">
                <p className="text-gray-500">Shipping</p>
                <p className="">$00.00</p>
            </div>
            <div className="flex justify-between my-2">
                <p className="text-gray-500">Tax</p>
                <p className="">$00.00</p>
            </div>
            <div className="flex justify-between my-2">
                <p className="text-gray-500">Discount</p>
                <p className="">$00.00</p>
            </div>
            <div className="border my-2"></div>
            <div className="flex font-semibold justify-between my-2">
                <p className="text-gray-500">Total</p>
                <p className="">$99.99</p>
            </div>
          </div>

        </div>
        <div className="flex gap-3">
          <button className="flex gap-2 items-center px-3 py-2 hover:border-red-500 hover:text-red-500 border rounded">
            <X /> Cancel Order
          </button>
          <button className="flex gap-2 items-center px-3 py-2 bg-red-500 text-white border rounded">
            <Truck /> Ship Order
          </button>
        </div>
      </div>
    </>
  );
}
