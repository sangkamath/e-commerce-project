"use client";
import React from "react";
import { useState, Fragment } from "react";
import { Rating } from "@mui/material";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { StarIcon, CheckIcon, Minus, Plus } from "lucide-react";
import { Label, Radio, RadioGroup } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { adjustSize } from "@/lib/helper";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function ProductDetailInfo({ product }: any) {
    const { name, description, reviews = 0, rating, info, inventory, colors, sizes } = product;
    const router = useRouter();
    const searchParams = useSearchParams();

    let defaultSize = sizes[0] ?? null;
    let defaultColor = colors[0] ?? null;

    let sizeParam: string | number = searchParams.get("size") ?? defaultSize;
    const colorParam = searchParams.get("color") ?? defaultColor;

    if (!isNaN(parseFloat(sizeParam as string))) {
        sizeParam = parseFloat(sizeParam as string);
    }

    const [selected, setSelected] = useState<string>(colorParam);
    const [curSize, setCurSize] = useState<string | number>(sizeParam);
    const [quantity, setQuantity] = useState<number>(1);

    const itemStock = inventory.find(
        (item: any) =>
            (item.size === sizeParam ||
                (sizeParam === "std" && item.size === null) ||
                (typeof sizeParam === "number" && item.size === sizeParam)) &&
            item.color === colorParam,
    );

    const filteredItemByColor: any = inventory.filter(
        (item: any) => item.color === colorParam,
    );

    const handleSelect = (color: string) => {
        setSelected(color);
        router.replace(`/?color=${color}&size=${curSize}`);
    }

    const handleSize = (size: string) => {
        setCurSize(size);
        router.replace(`/?color=${selected}&size=${size}`);
    };

    const handleIncrease = () => {
        if (itemStock && quantity < itemStock.stock) {
            setQuantity(quantity + 1);
        }
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <div className="flex w-full flex-1 flex-col lg:min-w-[48%]">
            <div className="flex flex-col">
                <h1 className="text-3xl font-semibold leading-9 text-neutral-900 md:text-5xl md:leading-[48px]">
                    {name}
                </h1>
                <div className="mt-5 flex flex-col">
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-medium leading-9 text-neutral-600">
                            ${inventory[0].sale_price}
                        </span>
                        <span className="text-lg font-medium leading-7 text-neutral-400">
                            ${inventory[0].list_price}
                        </span>
                    </div>
                    {inventory[0].discount && <Badge variant="warning" size="medium" className="mt-2 self-start">
                        %{inventory} OFF
                    </Badge>}
                </div>
                <div className="mt-3 flex items-center gap-2">
                    <h6 className="text-xl font-normal leading-7 text-neutral-900">
                        {rating}
                    </h6>
                    <Rating
                        name="text-feedback"
                        readOnly
                        value={rating}
                        precision={0.5}
                        emptyIcon={
                            <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                        }
                    />
                    <p className="text-sm font-medium leading-5 text-indigo-700">
                        {reviews === 0 && (
                            <>
                                <span className="text-sm font-medium leading-5 text-neutral-500">
                                    No reviews yet.
                                </span>
                                Be the first.
                            </>
                        )}
                        {reviews === 1 && `See ${reviews} review`}
                        {reviews > 1 && `See all ${reviews} reviews`}
                    </p>
                </div>
            </div>
            <p className="my-8 text-base font-normal leading-6 text-neutral-600">
                {description}
            </p>
            <div className="mb-8 flex flex-col">
                <div>
                    <h6 className="mb-2 text-sm font-normal leading-5 text-neutral-500">
                        Available Colors
                    </h6>
                    <RadioGroup value={selected} onChange={handleSelect} className="mt-2">
                        <div className="flex gap-4">
                            {colors.map((col: string, idx: number) => (
                                <Radio
                                    key={idx}
                                    value={col}
                                    className={({ checked }) =>
                                        cn(
                                            "relative flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full shadow-md focus:outline-none data-active:ring-2 data-active:ring-indigo-500 data-active:ring-offset-2",
                                            checked && "ring-2 ring-indigo-500 ring-offset-2"
                                        )
                                    }
                                    style={{ backgroundColor: col }}
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
                    <RadioGroup value={curSize} onChange={handleSize} className="">
                        <div className="flex flex-wrap gap-4">
                            {filteredItemByColor?.map((item: any) => (
                                <Radio
                                    key={item.sku}
                                    value={item.size ?? "std"}
                                    disabled={item.stock === 0}
                                    className={({ checked }) =>
                                        cn(
                                            "relative flex h-[48px] w-[64px] cursor-pointer items-center justify-center rounded border border-neutral-200 bg-white focus:outline-none data-active:ring-2 data-active:ring-indigo-500 data-active:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                            checked && "ring-2 ring-indigo-500 ring-offset-2"
                                        )
                                    }
                                >
                                    <Label className="text-base font-medium leading-6 text-neutral-900">
                                        {typeof item.size === "number"
                                            ? item.size
                                            : adjustSize(item.size)}
                                    </Label>
                                </Radio>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <div className="mb-8 flex flex-col gap-4">
                <h6 className="text-sm font-normal leading-5 text-neutral-500">
                    Quantity
                </h6>
                <div className="flex h-9 w-[125px] items-center justify-between gap-3 rounded-[6px] border border-neutral-200 bg-neutral-50 px-1.5">
                    <button
                        onClick={handleDecrement}
                        className={cn(
                            "inline-flex h-5 w-5 items-center justify-center text-neutral-600 transition-colors",
                            {
                                "cursor-not-allowed text-neutral-400": quantity < 2,
                            },
                        )}
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-sm font-medium leading-5 text-neutral-600">
                        {quantity > itemStock?.stock ? itemStock?.stock : quantity}
                    </span>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger
                                disabled={itemStock?.stock === quantity}
                                className={cn(
                                    "inline-flex h-5 w-5 items-center justify-center text-neutral-600 transition-colors",
                                    {
                                        "cursor-not-allowed text-neutral-400":
                                            itemStock?.stock === quantity,
                                    },
                                )}
                                onClick={handleIncrease}
                            >
                                <Plus className="h-4 w-4" />
                            </TooltipTrigger>
                            <TooltipContent className="inline-flex items-center justify-center rounded-lg bg-neutral-950 px-3 py-2">
                                <p className="text-xs font-medium leading-4 text-white">
                                    {itemStock?.stock === quantity ? "Insufficient stock" : "In stock"}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <Button variant="primary" size="large" disabled={!itemStock || itemStock.stock === 0}>
                Add to Cart
            </Button>
            <Accordion type="multiple" className="mt-6 marker:text-neutral-600">
                {info.map(
                    (
                        {
                            title,
                            description,
                        }: {
                            title: string;
                            description: String[];
                        },
                        index: number,
                    ) => (
                        <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`}>
                            <AccordionTrigger className="text-lg font-medium leading-7 text-neutral-900">
                                {title}
                            </AccordionTrigger>
                            <AccordionContent className="mt-2 text-base font-normal leading-6 text-neutral-600">
                                <ul className="list-inside list-disc">
                                    {description.map((desc, index) => (
                                        <li key={index}>{desc}</li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ),
                )}
            </Accordion>
        </div>);
}


interface Plans {
    color: string;
    label: string;
    value: string;
}
interface SIZES {
    label: string;
    value: string;
}