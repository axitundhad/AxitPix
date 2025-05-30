import { IKImage } from "imagekitio-next";
import Link from "next/link";
import { IProduct, IMAGE_VARIANTS } from "@/models/Product";
import { Eye } from "lucide-react";

export default function ProductCard({ product }: { product: IProduct }) {
  // const lowestPrice = product?.variants?.reduce(
  //   (min, variant) => (variant.price < min ? variant.price : min),
  //   product.variants[0]?.price || 0
  // );

  const lowestPrice = product?.variants?.length
  ? product.variants.reduce(
      (min, variant) => (variant.price < min ? variant.price : min),
      product.variants[0].price
    )
  : 0;

  return (
    <div className="card bg-blue-100 border border-gray-200  rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative px-4 pt-4">
        <Link
          href={`/products/${product._id}`}
          className="relative group w-full"
        >
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{
              aspectRatio:
                IMAGE_VARIANTS.SQUARE.dimensions.width /
                IMAGE_VARIANTS.SQUARE.dimensions.height,
            }}
          >
            <IKImage
              path={product.imageUrl as string}
              alt={product.name as string}
              loading="eager"
              transformation={[
                {
                  // height: IMAGE_VARIANTS.SQUARE.dimensions.height.toString(),
                  width: IMAGE_VARIANTS.SQUARE.dimensions.width.toString(),
                  cropMode: "extract",
                  focus: "center",
                  quality: 80,
                },
              ]}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
      </figure>
          {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl" /> */}

      <div className="card-body p-4">
        <Link
          href={`/products/${product._id}`}
          className="hover:opacity-90 transition-opacity"
        >
          <h2 className="text-lg font-semibold text-indigo-500 ">
            {product.name}
          </h2>
        </Link>

        <p className="text-sm  text-indigo-400 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        <div className="card-actions justify-between items-center mt-4">
          <div className="flex flex-col">
            <span className="text-base font-bold text-indigo-500 ">
            From ${lowestPrice.toFixed(2)}
            </span>
            <span className="text-xs text-indigo-400">
              {product?.variants?.length} sizes available
            </span>
          </div>
              
          <Link
            href={`/products/${product._id}`}
            className="btn btn-primary btn-sm flex flex-row items-center justify-center mt-2 gap-2 rounded-lg shadow hover:shadow-md transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
            View Options
          </Link>
          
        </div>
      </div>
    </div>
  );
}
