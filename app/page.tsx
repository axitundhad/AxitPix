// "use client";

// import { apiClient } from "@/lib/api-client";
// import { IProduct } from "@/models/Product";
// import { useEffect, useState } from "react";
// import ImageGallery from "./components/ImageGallery";

// export default function Home() {
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchProducts = async (query = "") => {
//       try {
//         const data = await apiClient.getProducts(query);
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//     const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     fetchProducts(searchTerm.trim());
//   };

//   return (
//     <main className="w-[90%] mx-auto px-4 md:px-8 py-5 ">
//       <h1 className="text-3xl md:text-3xl text-indigo-800 font-extrabold text-center mb-10 tracking-tight">
//         Discover & Purchase Stunning Photos, Curated Just for You
//       </h1>
//        {/* 🔍 Search Bar */}
//       <form onSubmit={handleSearch} className="mb-4 flex gap-2">
//         <input
//           type="text"
//           placeholder="Search by title, description or category..."
//           className="w-full px-4 py-2 border border-indigo-300 rounded-md shadow-sm focus:outline-none"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 transition"
//         >
//           Search
//         </button>
//       </form>
//       <div className="">
//         <ImageGallery products={products} loading={isLoading} />
//       </div>
//     </main>
//   );
// }

"use client";

import { apiClient } from "@/lib/api-client";
import { IProduct } from "@/models/Product";
import { useEffect, useState } from "react";
import ImageGallery from "./components/ImageGallery";

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

  const handleCategoryClick = (category: string) => {
    setSearchTerm(""); // Clear search bar
    setSelectedCategory(category);
    if (category === "All") {
      fetchProducts();
    } else {
      fetchProducts(category.toLowerCase());
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
    <main className="w-[90%] mx-auto px-4 md:px-8 py-5">
      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search images"
          className="w-full px-4 py-2 border border-indigo-300 rounded-md shadow-md focus:outline-none"
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
            className={`px-4 py-2 rounded-full border-2 shadow-lg transition ${
              selectedCategory === category
                ? "bg-indigo-700 text-white border-2"
                : "bg-indigo-100 text-indigo-700 opacity-60 hover:opacity-100"
            }`}
          >
            {category}
          </button>
        ))}
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
      {!isLoading && products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          {searchTerm
            ? `No products found for "${searchTerm}".`
            : `No products available for ${selectedCategory.toLowerCase()} category.`}
        </p>
      ) : (
        <ImageGallery products={products} loading={isLoading} />
      )}
    </main>
  );
}
