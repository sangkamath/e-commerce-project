import Product from "@/lib/models";
import { IProduct } from "@/lib/definitions";
import ProductDetail from "@/components/product-detail";
import { connectDB } from "@/lib/db";
import React, { Suspense } from "react";


export default async function Home() {

  return (
    <main className="min-h-screen w-full bg-gray-300 p-4">
      <div className="hidden border-border" />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetail product={[]} />
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