"use client";
import { Button, buttonVariants } from "@/components/button";
import { Badge } from "@/components/badge";
import Link from "next/link";
import { Input } from "@/components/input";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center gap-10 px-4">
      <div className="flex items-center gap-4" >
      <Badge variant="brand">Default</Badge>
         <Badge variant="error" size="medium">
           Default
         </Badge>
         <Badge variant="neutral" size="large">
           Default
         </Badge>
         <Badge variant="success" size="medium">
           Default
         </Badge>
         <Badge variant="warning" size="small">
           Default
         </Badge>

         <div className="w-full max-w-[300px]">
         <Input type="text" placeholder="name@email.com" />
       </div>
      </div>
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