"use client";

import { IKImage } from "imagekitio-next";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Order {
  _id: string;
  amount: number;
  createdAt: string;
  userId: {
    email: string;
  };
  productId: {
    imageUrl: string;
  };
}

export default function SellingPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        const sorted = data.sort(
          (a: Order, b: Order) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(sorted);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <main className="max-w-5xl mx-auto sm:px-4 py-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">
        Total Selling
      </h1>
      <div className="bg-blue-100 shadow-md border border-indigo-600 rounded-lg p-4 mb-6 text-indigo-800">
        <p className="text-lg font-medium">
          🧾 Total Orders: <span className="font-bold">{orders.length}</span>
        </p>
        <p className="text-lg font-medium">
          💰 Total Amount:{" "}
          <span className="font-bold">${totalAmount.toFixed(2)}</span>
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-12 h-12 border-4 border-indigo-800 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow-md bg-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className=" flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative size-20 overflow-hidden">
                  <IKImage
                    path={order.productId.imageUrl as string}
                    alt="Order Image"
                    loading="eager"
                    className="object-cover rounded-md border border-indigo-300"
                    transformation={[
                      { height: 80, width: 80, quality: 80, focus: "center" },
                    ]}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 ">
                    <Image
                      src="/gmail.png"
                      alt="Gmail"
                      width={20}
                      height={20}
                    />
                    <p className="font-semibold text-sm sm:text-md text-indigo-800">
                      {order.userId.email}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    🗓️ {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="absolute right-14 pt-7 sm:pt-0  sm:relative font-bold text-indigo-800 text-lg sm:text-xl">
                ${order.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
