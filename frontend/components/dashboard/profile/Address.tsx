'use client'

import { useAppSelector } from "@/lib/redux/hooks";
import { Check, Edit, MapPin, Trash2 } from "lucide-react"

const Address = () => {
    const { user } = useAppSelector((state) => state.auth);
      console.log(user?.addresses);
    const addresses = user?.addresses
  return (
    <>
        {
            addresses?.map((address, index) => (
                <div key={index} className="rounded border p-4 mt-4">
                    <h3 className="font-semibold text-lg flex gap-3 mb-4"><MapPin/>{address.label}</h3>
                    <p className="text-gray-500 capitalize"> {address.street}, {address.city} - {address.postalCode}</p>
                    <p className="text-gray-500 capitalize"> {address.state}, {address.country}</p>
                    <div className="flex gap-3 flex-wrap mt-3">
                        <button className="flex items-center gap-1 p-2 rounded border py-2 px-3 cursor-pointer"><Edit/>Edit</button>
                        <button className="flex items-center gap-1 p-2 text-red-500 rounded border border-red-200 py-2 px-3 cursor-pointer"><Trash2/>Delete</button>
                        {
                            address.isDefault ? <button className="flex items-center gap-1 text-gray-500 p-2 py-2 px-3r"><Check/> Default</button> : 
                            <button className="flex items-center gap-1 p-2 rounded border py-2 px-3 cursor-not-allowed" title="currently not available">Set as Default</button>
                        }
                    </div>
                </div>
            ))
        }
    </>
  )
}

export default Address