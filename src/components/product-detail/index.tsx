"use client";
import React from "react";
import { ProductThumbnail } from "./product-thumnail";
import { ProductDetailInfo } from "./product-detail-info";

export default function ProductDetail({ product }: any) {
    return (
        <section className="container mx-auto flex flex-col gap-12 rounded-md bg-white px-4 py-12 shadow-sm lg:flex-row lg:gap-8 lg:p-24">
            <ProductThumbnail product={product} />
            <ProductDetailInfo product={product} />
        </section>
    )
}