"use client";
import { IProduct } from "@/lib/definitions";
import Image from "next/image";
import React from "react";
import { Badge } from "../badge";
import { Button } from "../button";
import { Rating } from "@mui/material";
import { Label, Radio, RadioGroup } from "@headlessui/react";
import { StarIcon, CheckIcon, CirclePlus, MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useState, Fragment } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface Plans {
    color: string;
    label: string;
    value: string;
}

interface SIZES {
    label: string;
    value: string;
}

function ProductThumbnail() {
    const [selectedImage, setSelectedImage] = React.useState<string>("/image.png");

    const thumbnails = [
        { src: "/image.png", alt: "image thumbnail" },
        { src: "/image-1.jpg", alt: "image thumbnail" },
        { src: "/image-2.jpg", alt: "image thumbnail" },
        { src: "/image-3.jpg", alt: "image thumbnail" },
        { src: "/image-4.jpg", alt: "image thumbnail" }
    ];

    return (
        <div className="flex w-full flex-1 flex-col gap-6 lg:min-w-[48%]">
            <div className="flex flex-col gap-6">
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg md:h-[800px]">
                    <Image src={selectedImage} alt="selected image" fill />
                </div>
                <div className="no-scrollbar flex h-[120px] gap-4 overflow-scroll md:h-[190px]">
                    {thumbnails.map((thumbnail, index) => (
                        <div
                            key={index}
                            className="relative h-full w-full min-w-[80px] flex-1 cursor-pointer overflow-hidden rounded-lg md:min-w-[188px] lg:min-w-[160px]"
                            onClick={() => setSelectedImage(thumbnail.src)}
                        >
                            <Image src={thumbnail.src} alt={thumbnail.alt} fill />
                        </div>
                    ))}
                </div>
            </div>
        </div>);
}

function ProductDetailInfo() {
    const router = useRouter();
    const searchParams = useSearchParams();
    let plans: Plans[] = [
        { color: "#10B981", label: "Green", value: "green" },
        { color: "#CA8A04", label: "Orange", value: "orange" },
    ];

    let SIZES: SIZES[] = [
        { label: "XS", value: "xs" },
        { label: "S", value: "s" },
        { label: "M", value: "m" },
        { label: "L", value: "l" },
        { label: "XL", value: "xl" },
    ];

    const [selected, setSelected] = useState<string>(plans[0].color);
    const [sizes, setSizes] = useState<string>(SIZES[0].value);

    const handleSelect = (color: string) => {
        setSelected(color);
        let paramName = plans.find((plan) => plan.color === color)?.value ?? "";
        const params = new URLSearchParams(searchParams.toString());
        params.set("color", paramName);
        router.replace(`/?${params.toString()}`);
    }

    const handleSize = (selectedSize: string) => {
        setSizes(selectedSize);
        let paramName =
            SIZES.find((size) => size.value === selectedSize)?.value ?? "";
        const params = new URLSearchParams(searchParams);
        params.set("size", paramName);
        router.replace(`/?${params.toString()}`);
    }

    return (
        <div className="flex w-full min-w-[48%] flex-1 flex-col">
            <div className="flex flex-col">
                <h1 className="text-3xl font-semibold leading-9 text-neutral-900 md:text-5xl md:leading-[48px]">
                    Voyager Hoodie
                </h1>
                <div className="mt-5 flex flex-col">
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-medium leading-9 text-neutral-600">
                            $76
                        </span>
                        <span className="text-lg font-medium leading-7 text-neutral-400">
                            $95
                        </span>
                    </div>
                    <Badge variant="warning" size="medium" className="mt-2 self-start">
                        %20 OFF
                    </Badge>
                </div>
                <div className="mt-3 flex items-center gap-2">
                    <h6 className="text-xl font-normal leading-7 text-neutral-900">
                        4.1
                    </h6>
                    <Rating
                        name="text-feedback"
                        value={4.1}
                        precision={0.5}
                        emptyIcon={
                            <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                        }
                    />
                    <p className="text-sm font-medium leading-5 text-indigo-700">
                        See all 62 reviews
                    </p>
                </div>
            </div>
            <p className="my-8 text-base font-normal leading-6 text-neutral-600">
                The Voyager Hoodie is for the explorer at heart. Its durable fabric and
                roomy pockets are perfect for those who are always searching for the
                next adventure.
            </p>
            <div className="mb-8 flex flex-col">
                <div>
                    <h6 className="mb-2 text-sm font-normal leading-5 text-neutral-500">
                        Available Colors
                    </h6>
                    <RadioGroup value={selected} onChange={handleSelect} className="mt-2">
                        <div className="flex gap-4">
                            {plans.map((plan: Plans) => (
                                <Radio
                                    key={plan.color}
                                    value={plan.color}
                                    className={({ checked }) =>
                                        cn(
                                            "relative flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full shadow-md focus:outline-none data-active:ring-2 data-active:ring-indigo-500 data-active:ring-offset-2",
                                            checked && "ring-2 ring-indigo-500 ring-offset-2"
                                        )
                                    }
                                    style={{ backgroundColor: plan.color }}
                                >
                                    {({ checked }) => (
                                        <>
                                            <div className="flex w-full items-center justify-center">
                                                {checked && (
                                                    <div className="flex-shrink-0 text-white">
                                                        <CheckIcon className="h-6 w-6" />
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </Radio>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
                <div className="mt-8">
                    <h6 className="mb-2 text-sm font-normal leading-5 text-neutral-500">
                        Available Sizes
                    </h6>
                    <RadioGroup value={sizes} onChange={handleSize} className="">
                        <div className="flex flex-wrap gap-4">
                            {SIZES.map((size) => (
                                <Radio
                                    key={size.value}
                                    value={size.value}
                                    className={({ checked }) =>
                                        cn(
                                            "relative flex h-[48px] w-[64px] cursor-pointer items-center justify-center rounded border border-neutral-200 bg-white focus:outline-none data-active:ring-2 data-active:ring-indigo-500 data-active:ring-offset-2",
                                            checked && "ring-2 ring-indigo-500 ring-offset-2"
                                        )
                                    }
                                >
                                    <Label className="text-base font-medium leading-6 text-neutral-900">
                                        {size.label}
                                    </Label>
                                </Radio>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <Button variant="primary" size="large">
                Add to Cart
            </Button>
            <Accordion type="multiple" className="mt-6 marker:text-neutral-600">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium leading-7 text-neutral-900">
                        Features
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className="list-inside list-disc">
                            <li className="text-base font-normal leading-6 text-neutral-600">
                                Designed for comfort and durability
                            </li>
                            <li className="text-base font-normal leading-6 text-neutral-600">
                                Designed for comfort and durability
                            </li>
                            <li className="text-base font-normal leading-6 text-neutral-600">
                                Designed for comfort and durability
                            </li>
                            <li className="text-base font-normal leading-6 text-neutral-600">
                                Designed for comfort and durability
                            </li>
                            <li className="text-base font-normal leading-6 text-neutral-600">
                                Designed for comfort and durability
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium leading-7 text-neutral-900">
                        Fabric & Care
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className="list-inside list-disc">
                            <li className="text-base font-normal leading-6 text-neutral-600">
                                Designed for comfort and durability
                            </li>
                            <li className="text-base font-normal leading-6 text-neutral-600">
                                Designed for comfort and durability
                            </li>
                            <li className="text-base font-normal leading-6 text-neutral-600">
                                Designed for comfort and durability
                            </li>
                            <li className="text-base font-normal leading-6 text-neutral-600">
                                Designed for comfort and durability
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium leading-7 text-neutral-900">
                        Shipping
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className="list-inside list-disc">
                            <li className="text-base font-normal leading-6 text-neutral-600">
                                Designed for comfort and durability
                            </li>
                            <li className="text-base font-normal leading-6 text-neutral-600">
                                Designed for comfort and durability
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>);
}

export default function ProductDetail({ product }: { product?: IProduct[] | null }) {
    //let { name } = product[0];
    return (
        <section className="container mx-auto flex flex-col gap-12 rounded-md bg-white px-4 py-12 shadow-sm lg:flex-row lg:gap-8 lg:p-24">
            <ProductThumbnail />
            <ProductDetailInfo />
        </section>
    )
}