import React from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { getProductReview } from "@/lib/services";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Rating } from "@mui/material";
import { StarIcon } from "lucide-react";
import { Button } from "../button";
import { formatDate, toBase64, getInitials } from "@/lib/helper";
import { Shimmer } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
            <DialogDescription>
            </DialogDescription>
            <div>
                <div className="flex flex-col gap-10 lg:gap-8">
                    <ReviewsSummary data={data.aggregate} />
                    <Reviews data={data.data} />
                </div>
            </div>
        </>
    )
}

function ReviewsSummary({ data }: { data: any }) {
    return (
        <div className="flex w-full max-w-[384px] flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold leading-7 text-neutral-900">
                    Overall Rating
                </h2>
                <div className="flex items-center gap-2">
                    <span className="text-base font-semibold leading-6 text-neutral-900">
                        {data?.rating ?? 0}
                    </span>
                    <Rating
                        name="text-feedback"
                        readOnly
                        precision={0.5}
                        value={data?.rating}
                        emptyIcon={
                            <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                        }
                    />
                    {data?.total > 0 ? <p>{`Based on ${data.total} reviews`}</p> : null}
                </div>
            </div>
            <div>stat</div>
            <Button variant="secondary" className={cn("mx-auto w-[153px] px-5 py-3")}>
                Write a review
            </Button>
        </div>
    )
}

function Reviews({ data }: { data: any }) {
    if (!data || !Array.isArray(data)) {
        return <div>No reviews available</div>;
    }

    return (
        <>
            <div className="flex w-full flex-col gap-6 lg:flex-1">
                {data.map((review: any, index: number) => (
                    <div className="flex flex-col gap-4" key={index}>
                        <div className="flex gap-4">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full">
                                {review.user.avatar_url ? (
                                    <Avatar>
                                        <AvatarImage className="object-cover"
                                            src={review?.user?.avatar_url} />
                                    </Avatar>
                                ) : (
                                    <Avatar>
                                        <AvatarFallback>
                                            {getInitials(review.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <h4>{review.user.name}</h4>
                                <Rating
                                    name="text-feedback"
                                    readOnly
                                    precision={0.5}
                                    value={review.rating}
                                    emptyIcon={
                                        <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                                    }
                                />
                            </div>
                            <p className="ml-auto">{review.created_at}</p>
                        </div>
                        <p className="text-base font-normal leading-6 text-neutral-600">
                            {review.content}
                        </p>
                    </div>
                ))}
            </div>
            <Button variant="secondary" className={cn("mx-auto w-full px-5 py-3")}>
                Show 10 more reviews
            </Button>
        </>
    );
}