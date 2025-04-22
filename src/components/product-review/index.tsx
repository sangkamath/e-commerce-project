import React from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { getProductReview } from "@/lib/services";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function ProductReview({ productName }: { productName: string }) {
    const { data, isLoading } = useQuery({
        queryKey: ["reviews", productName],
        queryFn: async () => await getProductReview(productName),
    });

    if (isLoading) {
        return <>
            <DialogTitle asChild>
                <VisuallyHidden>
                    <h2>My Accessible Title</h2>
                </VisuallyHidden>
            </DialogTitle>
            <DialogDescription className={cn("mt-6 pt-6")}>
                Loading...
            </DialogDescription>
        </>

    }

    return (
        <>
            <DialogTitle asChild>
                <VisuallyHidden>
                    <h2>My Accessible Title</h2>
                </VisuallyHidden>
            </DialogTitle>
            <DialogDescription className={cn("mt-6 pt-6")}>
                Description
            </DialogDescription>
        </>
    )
}