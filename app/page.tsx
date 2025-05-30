"use client";

import { apiClient } from "@/lib/api-client";
import { IProduct } from "@/models/Product";
import { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiClient.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="w-[90%] mx-auto px-4 md:px-8 py-5 ">
      <h1 className="text-3xl md:text-3xl text-indigo-800 font-extrabold text-center mb-10 tracking-tight">
        Discover & Purchase Stunning Photos, Curated Just for You
      </h1>
      <div className="">
        <ImageGallery products={products} loading={isLoading} />
      </div>
    </main>
  );
}
