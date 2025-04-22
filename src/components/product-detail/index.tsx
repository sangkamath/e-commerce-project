"use client";
import React from "react";
import { ProductThumbnail } from "./product-thumnail";
import { ProductDetailInfo } from "./product-detail-info";
import { Product } from "@/lib/definitions";

interface ProductDetailProps {
    product: Product;
}
// This component is used to display the product detail page
// It takes a product object as a prop and displays the product thumbnail and product detail info

export default function ProductDetail({ product }: ProductDetailProps) {
    return (
        <section className="container mx-auto flex flex-col gap-12 rounded-md bg-white px-4 py-12 shadow-sm lg:flex-row lg:gap-8 lg:p-24">
            <ProductThumbnail product={product} />
            <ProductDetailInfo product={product} />
        </section>
    )
}