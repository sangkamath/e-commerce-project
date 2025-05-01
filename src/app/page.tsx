
import ProductDetail from "@/components/product-detail";
import React, { Suspense } from "react";
import { getProductById } from "@/lib/services";
import { Product } from "@/lib/definitions";
import ProductSpecifications from "@/components/product-specifications";
import ProductsGrid from "@/components/products-grid";
import Footer from "@/components/footer";


export default async function Home() {
  const product: Product | undefined = await getProductById("urban-drift-bucket-hat");

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <main className="min-h-screen w-full bg-gray-300 p-10">
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetail product={product} />
      </Suspense>
      <ProductSpecifications />
      <ProductsGrid />
      <Footer />
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