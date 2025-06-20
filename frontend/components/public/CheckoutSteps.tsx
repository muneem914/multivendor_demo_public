import { CircleCheck, Minus } from "lucide-react";
import Link from "next/link";
type CheckoutStepsProps = {
  cart?: boolean;
  checkout?: boolean;
  confirmation?: boolean;
};

export default function CheckoutSteps({
  cart,
  checkout,
  confirmation,
}: CheckoutStepsProps) {
  return (
    <>
      <div className="flex items-center gap-1 sm:gap-3 my-8">
        {cart ? (
          <Link href="/cart" className="flex items-center gap-1 text-blue-600">
            <CircleCheck />
            Cart
            <Minus />
          </Link>
        ) : (
          <Link href="#!" className="flex items-center gap-1 text-gray-500">
            <CircleCheck />
            Cart
            <Minus />
          </Link>
        )}

        {checkout ? (
          <Link href="/checkout" className="flex items-center gap-1 text-blue-600">
            <CircleCheck />
            Checkout
            <Minus />
          </Link>
        ) : (
          <Link href="#!" className="flex items-center gap-1 text-gray-500">
            <CircleCheck />
            Checkout
            <Minus />
          </Link>
        )}

        {confirmation ? (
          <Link href="/confirmation" className="flex items-center gap-1 text-blue-600">
            <CircleCheck />
            Confirmation
            {/* <Minus /> */}
          </Link>
        ) : (
          <Link href="#!" className="flex items-center gap-1 text-gray-500">
            <CircleCheck />
            Confirmation
            {/* <Minus /> */}
          </Link>
        )}

      </div>
    </>
  );
}
