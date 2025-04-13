import Image from "next/image";

export default async function Home() {
  const products = await getProducts();
  const collections = await getCollections();
  console.log(products);
  console.log(collections);

  return (
    <main className="flex items-center justify-center gap-10 px-4">
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