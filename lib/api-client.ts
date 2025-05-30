import { IOrder } from "@/models/Order";
import { ImageVariant, IProduct } from "@/models/Product";
import { Types } from "mongoose";

export type ProductFormData = Omit<IProduct, "_id">;

export interface CreateOrderData {
  productId: Types.ObjectId | string;
  variant: ImageVariant;
}

type FetchOptions<T = unknown> = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: T;
  headers?: Record<string, string>;
};

class ApiClient {
  private async fetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(endpoint, {
    // const response = await fetch(`http://localhost:3000/api/products`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  }

  async getProducts() {
    return this.fetch<IProduct[]>("/api/products");
  }

  async getProduct(id: string) {
    return this.fetch<IProduct>(`/api/products/${id}`);
  }

  async createProduct(productData: ProductFormData) {
    return this.fetch<IProduct>("/api/products", {
      method: "POST",
      body: productData,
    });
  }

  async getUserOrders() {
    return this.fetch<IOrder[]>("/api/orders/user");
  }

  async createOrder(orderData: CreateOrderData) {
    const sanitizedOrderData = {
      ...orderData,
      productId: orderData.productId.toString(),
    };

    return this.fetch<{ orderId: string; amount: number }>("/api/orders", {
      method: "POST",
      body: sanitizedOrderData,
    });
  }
}

export const apiClient = new ApiClient();
