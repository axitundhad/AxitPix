"use client";

import AdminProductForm from "../components/AdminProductForm";

export default function AdminPage() {
  return (
    <div className="sm:px-4 ">
      {/* <div className="lg:w-[80%] mx-auto bg-indigo-100 rounded-xl shadow-2xl p-8"> */}
        {/* <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-800 ">
          Add New Product
        </h1> */}
        <AdminProductForm />
      {/* </div> */}
    </div>
  );
}
