"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IOrder } from "@/models/Order";
import { Loader2, Download } from "lucide-react";
import { IKImage } from "imagekitio-next";
import { IMAGE_VARIANTS } from "@/models/Product";
import { apiClient } from "@/lib/api-client";
import mongoose from "mongoose";

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
      <div className="min-h-[70vh] flex justify-center items-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto px-4 py-10 rounded-md shadow-lg">
      <h1 className="text-4xl font-bold mb-10 text-center text-indigo-500">
        My Orders
      </h1>
      {orders.length === 0 && (
        <div className="text-center text-indigo-500 py-20 text-base-content/70 text-lg">
          <p className=""> You haven’t made any purchases.</p>
          <p className="mt-2">
            When you buy an image, your order details will show up here for easy
            access and downloads.
          </p>
        </div>
      )}
      <div className="space-y-8 grid grid-cols-1 md:grid-cols-[50%_50%] h-[90%] gap-6 ">
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
              className="bg-blue-100 rounded-2xl shadow-2xl hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  {/* Preview Image - Low Quality */}
                  <div
                    className="relative rounded-xl overflow-hidden bg-base-200 shadow-inner"
                    style={{
                      width: "200px",
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
                          width: variantDimensions.width.toString(),
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
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
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

                      <div className="text-right flex flex-col justify-between items-end">
                        <p className="text-2xl font-bold text-base-content">
                          ${order.amount.toFixed(2)}
                        </p>
                        {order.status === "completed" && (
                          <a
                            href={`${process.env.NEXT_PUBLIC_URL_ENDPOINT}/tr:q-100,w-${variantDimensions.width},h-${variantDimensions.height},cm-extract,fo-center/${product.imageUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary mt-4 sm:mt-0 gap-2"
                            download={`image-${order._id
                              ?.toString()
                              .slice(-6)}.jpg`}
                          >
                            <Download className="w-4 h-4" />
                            Download High Quality
                          </a>
                        )}
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
