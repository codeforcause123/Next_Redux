import Link from "next/link";
import ProductCart from "./components/ProductCart";

export default function Home() {
  return (
    <>
      <h1 className="bg-red-600 text-white text-center mx-2 rounded-md">
        Hello World
      </h1>
      <div className="content-center flex flex-row justify-around mt-10">
        <Link href="/users" className="btn btn-outline btn-info rounded">
          Users
        </Link>
        <ProductCart />
      </div>
    </>
  );
}
