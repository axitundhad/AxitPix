"use client";

import AdminProductForm from "../components/AdminProductForm";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-blue-100  px-4 py-12">
      <div className="w-[80%] mx-auto bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-800 ">
          Add New Product
        </h1>
        <AdminProductForm />
      </div>
    </div>
  );
}
