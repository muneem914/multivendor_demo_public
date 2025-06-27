"use client";

import { useGetCustomerByIdQuery } from "@/lib/redux/api/userApi";
import { Address } from "@/types/user";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AdminCustomerDetails() {
  const params = useParams();

  const { data } = useGetCustomerByIdQuery(params.id);
  const customer = data?.customer;
  return (
    <>
      <h1 className="text-2xl flex gap-3 items-center font-semibold">
        <Link href="/admin/customers">
          <ArrowLeft />
        </Link>{" "}
        Customer Details
      </h1>
      <br />
      <h1 className="text-2xl text-green-600">
        N.B. this page will contain all information with all addresses of a
        customer with full control (edit, update, order invoice)- also all
        orders
      </h1>
      <br />
      <h1 className="text-2xl">Customer ID: {customer?._id}</h1>
      <br />
      <h1 className="text-2xl">
        Name: {customer?.fName} {customer?.lName}
      </h1>
      <br />
      <h1 className="text-2xl">Email: {customer?.email}</h1>
      <br />
      <h1 className="text-2xl">Phone: +880 {customer?.phone}</h1>
      <br />
      <h1 className="text-2xl">Addresses: {customer?.addresses?.length}</h1>
      <ul className="list-disc">
        {customer?.addresses?.map((address: Address) => (
          <li className="text-xl ml-8 m-3" key={address._id}>
            Label: {address.label} | Street: {address.street} | City:{" "}
            {address.city} | State: {address.state} | Postal Code:{" "}
            {address.postalCode} | Country: {address.country}
          </li>
        ))}
      </ul>
    </>
  );
}
