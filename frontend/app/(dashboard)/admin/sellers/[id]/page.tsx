'use client'

import { useParams } from "next/navigation"

export default function SellerDetails () {
  const params = useParams();

console.log(params);
    return (
        <>
            <h1 className="text-2xl">
                Seller ID: {params.id}
            </h1>
            <br />

            <h1 className="text-3xl">
                Seller information along with their products, will be fetched here.
            </h1>
        </>
    );
}
