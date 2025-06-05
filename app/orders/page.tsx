"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IOrder } from "@/models/Order";
import { IKImage } from "imagekitio-next";
import { IMAGE_VARIANTS } from "@/models/Product";
import { apiClient } from "@/lib/api-client";
import mongoose from "mongoose";
import { Download } from "lucide-react";

interface PopulatedProduct {
  _id: mongoose.Types.ObjectId;
  name: string;
  imageUrl: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiClient.getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchOrders();
  }, [session]);

  if (loading) {
    return (
       <div className="flex justify-center items-center py-12">
        <div className="w-12 h-12 border-4 border-indigo-800 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="lg:w-[80%] mx-auto text-indigo-800 px-4 py-2 sm:py-5 rounded-md">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-10 text-center text-indigo-800">
        My Orders
      </h1>
      {orders.length === 0 && (
        <div className="text-center text-indigo-800 py-20 text-base-content/70 text-lg">
          <p className=""> You haven&apos;t made any purchases.</p>
          <p className="mt-2">
            When you buy an image, your order details will show up here for easy
            access and downloads.
          </p>
        </div>
      )}
      <div className="max-w-3xl mx-auto space-y-8">
        {orders.map((order) => {
          const variantDimensions =
            IMAGE_VARIANTS[
              order.variants.type.toUpperCase() as keyof typeof IMAGE_VARIANTS
            ].dimensions;

          // function isPopulatedProduct(
          //   product: any
          // ): product is PopulatedProduct {
          //   return (
          //     product &&
          //     typeof product.name === "string" &&
          //     typeof product.imageUrl === "string"
          //   );
          // }

          const product = order.productId as PopulatedProduct; // fully typed

          return (
            <div
              key={order._id?.toString()}
              className="bg-blue-100 border rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  {/* Preview Image - Low Quality */}
                  <div
                    className="relative rounded-xl overflow-hidden bg-base-200 shadow-inner"
                    style={{
                      width: "260px",
                      aspectRatio: `${variantDimensions.width} / ${variantDimensions.height}`,
                    }}
                  >
                    <IKImage
                      urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
                      path={product.imageUrl}
                      alt={`Order ${order._id?.toString().slice(-6)}`}
                      transformation={[
                        {
                          quality: 60,
                          // width: variantDimensions.width.toString(),
                          height: variantDimensions.height.toString(),
                          cropMode: "extract",
                          focus: "center",
                        },
                      ]}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-grow w-full">
                    <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
                      <div>
                        <h2 className="text-2xl font-semibold mb-2 text-base-content">
                          Order #{order._id?.toString().slice(-6)}
                        </h2>
                        <div className="space-y-1 text-base-content/70 text-sm">
                          <p>
                            <span className="font-medium">Resolution:</span>{" "}
                            {variantDimensions.width} x{" "}
                            {variantDimensions.height}
                            px
                          </p>
                          <p>
                            <span className="font-medium">License Type:</span>{" "}
                            <span className="capitalize">
                              {order.variants.licence}
                            </span>
                          </p>
                          <p>
                            <span className="font-medium">Status:</span>{" "}
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wide ${
                                order.status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : order.status === "failed"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex flex-col justify-between items-start sm:items-end">
                        <p className="text-2xl font-bold text-base-content">
                          ${order.amount.toFixed(2)}
                        </p>
                        
                          <a
                            href={`${process.env.NEXT_PUBLIC_URL_ENDPOINT}/tr:q-100,w-${variantDimensions.width},h-${variantDimensions.height},cm-resize/${product.imageUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn btn-primary mt-4 sm:mt-0 flex items-center gap-2 ${
                              order.status !== "completed"
                                ? "pointer-events-none opacity-50"
                                : ""
                            }`}
                            download={`image-${order._id
                              ?.toString()
                              .slice(-6)}.jpg`}
                          >
                            <Download className="w-4 h-4" />
                            Download Image 
                          </a>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
