import { IProduct } from "@/models/Product";
import ProductCard from "./ProductCard";

interface ImageGalleryProps {
  products?: IProduct[] | null; // optional or null if loading or error
  loading: boolean;
}

export default function ImageGallery({ products, loading }: ImageGalleryProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-12 h-12 border-4 border-indigo-800 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center text-xl py-12 text-indigo-800">
        No products found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {products.map((product) => (
        <ProductCard key={product._id?.toString()} product={product} />
      ))}
    </div>
  );
}
