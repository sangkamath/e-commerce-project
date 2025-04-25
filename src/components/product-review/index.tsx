import React from "react";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getProductReview } from "@/lib/services";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Rating } from "@mui/material";
import { StarIcon } from "lucide-react";
import { Button } from "../button";
import { formatDate, getInitials, getRatingText } from "@/lib/helper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ReviewsResponse } from "@/lib/definitions";
import { Loader2 } from "lucide-react";

export default function ProductReview({ productName }: { productName: string }) {
    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["reviews", productName],
        queryFn: async ({ pageParam = 1 }) => await getProductReview(productName, { page: pageParam }),
        getNextPageParam: (lastPage, pages) =>
            lastPage.pagination.has_more ? lastPage.pagination.page + 1 : undefined,
        initialPageParam: 1,
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

    if (isError) {
        return <>
            <DialogTitle asChild>
                <VisuallyHidden>
                    <h2>My Accessible Title</h2>
                </VisuallyHidden>
            </DialogTitle>
            <DialogDescription className={cn("mt-6 pt-6")}>
                Error loading reviews
            </DialogDescription>
        </>
    }

    const allReviews = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <>
            <DialogTitle asChild>
                <VisuallyHidden>
                    <h2>My Accessible Title</h2>
                </VisuallyHidden>
            </DialogTitle>
            <DialogDescription>
            </DialogDescription>
            <div className="h-full w-full xl:mt-1 xl:pt-1">
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-8">
                    <ReviewsSummary data={data?.pages[0].aggregate} />
                    <Reviews
                        data={allReviews}
                        fetchNextPage={fetchNextPage}
                        hasNextPage={hasNextPage}
                        isFetchingNextPage={isFetchingNextPage}
                    />
                </div>
            </div>
        </>
    )
}

function ReviewsSummary({ data }: { data: SummaryReview }) {
    const sortedCounts = [...data.counts].sort((a, b) => b.rating - a.rating);

    function getRatingColor(rating: number): string {
        switch (rating) {
            case 5:
                return "#16A34A";
            case 4:
                return "#22C55E";
            case 3:
                return "#FDE047";
            case 2:
                return "#EAB308";
            case 1:
                return "bg-red-500";
            default:
                return "bg-gray-200";
        }
    }

    return (
        <div className="flex w-full flex-col xl:max-w-[384px]">
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold leading-7 text-neutral-900">
                    Overall Rating
                </h2>
                <div className="mb-1 flex items-center gap-2">
                    <span className="text-base font-semibold leading-6 text-neutral-900">
                        {data?.rating ?? 0}
                    </span>
                    <Rating
                        name="text-feedback"
                        readOnly
                        precision={0.5}
                        value={data?.rating}
                        emptyIcon={
                            <StarIcon style={{ opacity: 0.55 }} fontSize="h-4 w-4" />
                        }
                    />
                    {data?.total > 0 ? <p>{`Based on ${data.total} reviews`}</p> : null}
                </div>
            </div>
            <div className="flex w-full flex-col gap-4">
                {sortedCounts.map((count: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        <p className="w-[120px] text-base font-medium leading-6 text-neutral-600">
                            {getRatingText(count.rating)}
                        </p>
                        <Progress
                            value={count.count}
                            max={100}
                            className={`h-2 flex-1 bg-gray-200`}
                            color={getRatingColor(count.rating)}
                        />
                        <p className="text-right text-base font-normal leading-6 text-neutral-600">
                            {count.count}
                        </p>
                    </div>
                ))}
            </div>
            <Button variant="secondary" className={cn("mx-auto mt-4 w-[153px] px-5 py-3")}>
                Write a review
            </Button>
        </div>
    )
}

function Reviews({ data, fetchNextPage, hasNextPage, isFetchingNextPage }: { data: ReviewsResponse[], fetchNextPage: () => void, hasNextPage: boolean, isFetchingNextPage: boolean }) {
    if (!data || !Array.isArray(data)) {
        return <div>No reviews available</div>;
    }

    return (
        <div className="flex h-full flex-1 flex-col gap-1 md:gap-4">
            <div className="flex h-[290px] flex-col gap-6 overflow-scroll md:h-[320px] xl:h-[420px]">
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
                            <p className="ml-auto">{formatDate(review.created_at)}</p>
                        </div>
                        <p className="text-base font-normal leading-6 text-neutral-600">
                            {review.content}
                        </p>
                    </div>
                ))}
            </div>
            {hasNextPage && (
                <Button
                    variant="secondary"
                    className={cn("mx-auto mt-10 w-full px-5 py-3")}
                    onClick={() => fetchNextPage()}
                >
                    {isFetchingNextPage && (
                        <Loader2 className="mr-2 animate-spin text-black" size={16} />
                    )}
                    Show 10 more reviews
                </Button>
            )}
        </div>
    );
}

interface SummaryReview {
    rating: number;
    total: number;
    counts: Count[];
}

interface Count {
    count: number;
    rating: number;
}