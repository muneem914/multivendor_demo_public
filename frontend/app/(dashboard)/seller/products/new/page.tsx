'use client'
import { ArrowLeft, Plus, Trash2, } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/dashboard/ImageUploader";
import ConditionSelector from "@/components/dashboard/Conditions";
import FeaturesSelector from "@/components/dashboard/Features";


export default function NewProductPage() {
    const route = useRouter()
    const handleGoBack = () => {
        route.back()
    }

    const conditions = [
    { id: "conNew", label: "New" },
    { id: "conOpenBox", label: "Open Box" },
    { id: "conRefurbished", label: "Refurbished" },
    { id: "conVGood", label: "Very Good" },
    { id: "conGood", label: "Good" },
    { id: "conUsed", label: "Used" },
    { id: "conDefect", label: "Defective" },
    ];



    return (
        <>
            <h1 className="text-xl font-semibold flex items-center gap-3"><ArrowLeft className="cursor-pointer" onClick={handleGoBack}/> Add New Product</h1>
            <p className="text-gray-500 mt-2 mb-5">Fill in thee details to list your product for sale</p>
            <div className="p-4 rounded bg-white border my-5">
                <h3 className="text-lg font-semibold mb-4">General Information</h3>

                <div className="grid my-4">
                    <label htmlFor="prdTitle" className="font-semibold mb-2">Product Title <span className="text-red-600 ml-2">*</span></label>
                    <input type="text" name="" id="prdTitle" className="border rounded p-2" placeholder="Custom title for search engines"/>
                </div>
                <div className="grid my-4">
                    <label htmlFor="prodDesc" className="font-semibold mb-2">Description <span className="text-red-600 ml-2">*</span></label>
                    <textarea rows={4} name="" id="prodDesc" className="border rounded p-2" placeholder="Custom description for search engines"/>
                </div>

                <ImageUploader/>

                <div className="border p-4 rounded my-3">
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold mb-2">Category <span className="text-red-600 ml-2">*</span></label>
                        <select name="" id="" className="border rounded p-2">
                            <option>Select Category</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="p-4 rounded bg-white border my-5">
                <div className="flex items-center justify-between mb-4 gap-1">
                    <h3 className="text-lg font-semibold">Specifications</h3>
                    <button className="text-blue-600 flex items-center text-wrap text-sm sm:text-base gap-1 sm:gap-2 cursor-pointer">
                        <Plus/> Add specification
                    </button>
                </div>
                <div className="flex flex-col my-4">
                        <label htmlFor="" className="font-semibold mb-2">Brand <span className="text-red-600 ml-2">*</span></label>
                        <select name="" id="" className="border rounded p-2">
                            <option>Select Brand</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                        </select>
                    </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold mb-2">Model <span className="text-red-600 ml-2">*</span></label>
                        <select name="" id="" className="border rounded p-2">
                            <option>Select Model</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold mb-2">Storage <span className="text-red-600 ml-2">*</span></label>
                        <select name="" id="" className="border rounded p-2">
                            <option>Select Storage</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold mb-2">Ram <span className="text-red-600 ml-2">*</span></label>
                        <select name="" id="" className="border rounded p-2">
                            <option>Select Ram</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold mb-2">Colour <span className="text-red-600 ml-2">*</span></label>
                        <select name="" id="" className="border rounded p-2">
                            <option>Select Colour</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <ConditionSelector conditions={conditions}/>
                    <FeaturesSelector/>

                </div>

            </div>

            <div className="p-4 rounded bg-white border my-5">
                <h3 className="text-lg font-semibold mb-4">Pricing & Inventory</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold mb-2">Price($) <span className="text-red-600 ml-2">*</span></label>
                        <input type="number" name="" id="" className="border rounded p-2" placeholder="0.00" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold mb-2">Sale Price($)</label>
                        <input type="number" name="" id="" className="border rounded p-2" placeholder="0.00" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold mb-2">Quantity($) <span className="text-red-600 ml-2">*</span></label>
                        <input type="number" name="" id="" className="border rounded p-2" placeholder="0" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold mb-2">SKU</label>
                        <input type="text" name="" id="" className="border rounded p-2" placeholder="e.g. MP-001" />
                    </div>
                </div>
            </div>

            <div className="p-4 rounded bg-white border my-5 flex items-center gap-3">
                <input type="checkbox" name="" id="negotiation" className="w-4 h-4" />
                <label htmlFor="negotiation" className="">Enable Negotiation</label>
            </div>

            <div className="p-4 rounded bg-white border my-5">
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                <div className="grid my-4">
                    <label htmlFor="tags" className="font-semibold mb-2">Tags</label>
                    <input type="text" name="" id="tags" className="border rounded p-2" placeholder="e.g. smartphone, android, 5G (separate with commas)"/>
                    <span className="text-gray-500 mt-2">Tags help buyer for search engines</span>
                </div>
                <div className="grid my-4">
                    <label htmlFor="seoTitle" className="font-semibold mb-2">SEO Title</label>
                    <input type="text" name="" id="seoTitle" className="border rounded p-2" placeholder="Custom title for search engines"/>
                </div>
                <div className="grid my-4">
                    <label htmlFor="seoDesc" className="font-semibold mb-2">SEO Description</label>
                    <textarea rows={4} name="" id="seoDesc" className="border rounded p-2" placeholder="Custom description for search engines"/>
                </div>
            </div>
            <br />
            <br />
            <br />
            <div className="grid sm:flex grid-cols-1 gap-2 items-center justify-between">
                <button className=" order-2 sm:order-1 p-2 border rounded text-red-500 flex gap-2 items-center justify-center cursor-pointer">
                    <Trash2/> Discard
                </button>
                <div className="grid order-1 sm:order-2 sm:flex grid-cols-1 gap-2">
                    <button className="order-2 sm:order-1 p-2 border rounded cursor-pointer">
                    Save Draft
                    </button>
                    <button className="order-1 sm:order-2 p-2 border rounded text-white bg-red-600 flex gap-2 justify-center items-center cursor-pointer">
                        Send for Review
                    </button>
                </div>
            </div>


        </>
    )
}