"use client";
import { apiClient } from "@/lib/api-client";
import { IProduct } from "@/models/Product";
import { useEffect, useRef, useState } from "react";
// import ImageSlider from "./components/ImageSlider";
import ImageGallery from "./components/ImageGallery";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Bird",
    "Animal",
    "Nature",
    "Beach",
    "Mountains",
    "City",
  ];

  const galleryRef = useRef<HTMLDivElement | null>(null);

  const fetchProducts = async (query = "") => {
    setIsLoading(true);
    try {
      const data = await apiClient.getProducts(query); // query = "" or "sunset"
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryClick = async (category: string, scrollToGallery = false ) => {
    setSearchTerm(""); // Clear search bar
    setSelectedCategory(category);
    if (category === "All") {
      await fetchProducts();
    } else {
      await fetchProducts(category.toLowerCase());
    }
     if (scrollToGallery && galleryRef.current) {
      window.scrollTo({
      top: galleryRef.current.offsetTop - 87, // 1000px offset for header
      behavior: "smooth",
    });
    }
  };

  useEffect(() => {
    fetchProducts(); // Initial fetch (no search)
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(searchTerm.trim());
  };

  return (
    <main className="w-[90%] mx-auto sm:px-4 md:px-8 sm:py-3 py-5">
      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search images"
          className="w-full sm:px-4 py-2 border border-indigo-300 rounded-md shadow-md focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-700 text-white rounded-md  border-2 hover:bg-indigo-800 transition"
        >
          Search
        </button>
      </form>

      {/* 🧭 Category Buttons */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`sm:px-4 py-2 rounded-full border-2 shadow-lg transition ${
              selectedCategory === category
                ? "bg-indigo-700 text-white border-2"
                : "bg-indigo-100 text-indigo-700 opacity-60 hover:opacity-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mb-3 relative cursor-pointer rounded-lg shadow-lg">
        <button
          className="absolute inset-0 z-10 opacity-0"
          onClick={() => handleCategoryClick("Nature", true)} // ⭐ Pass scroll flag
          aria-label="View Nature category"
        />
        
        <Image src="/hero1.jpg" alt="Hero Image" width={1200} height={600} className="w-full sm:h-auto h-25 rounded-lg shadow-lg" />
        
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl text-indigo-800 font-extrabold text-center mb-6 tracking-tight">
        Discover & Purchase Stunning Photos, Curated Just for You
      </h1>

      {/* 📸 Image Gallery */}
      {/* <ImageGallery products={products} loading={isLoading} />
       */}
      {/* {!isLoading && products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No products available for {selectedCategory.toLowerCase()} category.
        </p>
      ) : (
        <ImageGallery products={products} loading={isLoading} />
      )} */}
      <div ref={galleryRef} className="min-h-screen">
      {!isLoading && products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          {searchTerm
            ? `No products found for "${searchTerm}".`
            : `No products available for ${selectedCategory.toLowerCase()} category.`}
        </p>
      ) : (
        <ImageGallery products={products} loading={isLoading} />
      )}
      </div>
    </main>
  );
}
