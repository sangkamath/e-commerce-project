import Product from "@/lib/models";
import { IProduct } from "@/lib/definitions";
import ProductDetail from "@/components/product-detail";
import React, { Suspense } from "react";
import { getProductById } from "@/lib/services";


export default async function Home() {
  const product = await getProductById("urban-drift-bucket-hat");
  console.log(product);
  return (
    <main className="min-h-screen w-full bg-gray-300 p-10">
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetail product={product} />
      </Suspense>
    </main>
  );
}

const getProducts = async () => {
  const response = await fetch(
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products",
  );
  const data = await response.json();
  return data;
};

const getCollections = async () => {
  let url =
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/collections";

  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};