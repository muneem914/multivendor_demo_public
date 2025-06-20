import Link from "next/link";

export default function RootPage() {
  return (
    <>
      <div className="">
        <h1 className="text-lg text-center mt-4">
          welcome to FourBTech E-commerce solution.
        </h1>
        <h1 className="text-lg text-center mt-4">
          This page is just to make a public layout. That it can have more than one layout; even for each role-based access it can have completely different layout. 
        </h1>
        <h1 className="text-lg text-center mt-4">
          This is not yet completed. But I will definitely complete this to add my portfolio. 
        </h1>
        <h1 className="text-lg text-center mt-4">
          This above secondary navigation menu has been made intentionally as a public route/layout. After login, this will be hidden on dashboard.
        </h1>
        <h1 className="text-lg text-center mt-4">
          Dont worry! Every single piece is customizable.
        </h1>
        <h1 className="text-2xl text-center mt-5">Thank You</h1>

        <div className="text-center mt-10">
          <Link href='https://forms.gle/tc9ULscbWx7BFHy1A' className="bg-red-500 text-white p-2 rounded">Your Opinion Matters</Link>
        </div>
      </div>
    </>
  );
}
