"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import FileUpload from "./FileUpload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useNotification } from "./Notification";
import { IMAGE_VARIANTS, imageVariantType } from "@/models/Product";
import { apiClient, ProductFormData } from "@/lib/api-client";

export default function AdminProductForm() {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      imageUrl: "",
      variants: [
        {
          type: "SQUARE" as imageVariantType,
          price: 9.99,
          licence: "personal",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const handleUploadSuccess = (response: IKUploadResponse) => {
    setValue("imageUrl", response.filePath);
    showNotification("Image uploaded successfully!", "success");
  };

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      await apiClient.createProduct(data);
      showNotification("Product created successfully!", "success");

      // Reset form after successful submission
      setValue("name", "");
      setValue("description", "");
      setValue("category", "");
      setValue("imageUrl", "");
      setValue("variants", [
        {
          type: "SQUARE" as imageVariantType,
          price: 9.99,
          licence: "personal",
        },
      ]);
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Failed to create product",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto bg-blue-100 lg:w-[80%] shadow-xl text-indigo-800 rounded-2xl p-6 md:p-8 space-y-6"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-800 ">
          Add New Product
        </h1>
      <div className="form-control w-full mx-auto flex flex-col  sm:grid grid-cols-[20%_80%] items-center">
        <label className="label font-medium text-sm md:text-base ">
          Product Name:{" "}
        </label>
        <input
          type="text"
          className={`input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base placeholder:text-gray-400 transition duration-200 ${
            errors.name ? "border-red-500 focus:ring-red-500" : ""
          }`}
          placeholder="Enter product name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-sm text-red-600 mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="form-control w-full mx-auto flex flex-col sm:grid grid-cols-[20%_80%] items-center">
        <label className="label font-medium text-sm md:text-base ">
          Description:{" "}
        </label>
        <textarea
          className={`textarea textarea-bordered  focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base mt-1 h-28 resize-none placeholder:text-gray-400 transition duration-200 ${
            errors.description ? "border-red-500 focus:ring-red-500" : ""
          }`}
          placeholder="Enter product description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="text-sm text-red-600 mt-1">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="form-control w-full mx-aut flex flex-col sm:grid grid-cols-[20%_80%] items-center">
        <label className="label font-medium text-sm md:text-base ">
          Category:{" "}
        </label>
        <input
          type="text"
          className={`input input-bordered focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base placeholder:text-gray-400 transition duration-200 ${
            errors.name ? "border-red-500 focus:ring-red-500" : ""
          }`}
          placeholder="Ex. Bird. Nature, Electronics, Food, etc."
          {...register("category", { required: "category is required for searching" })}
        />
        {errors.name && (
          <span className="text-sm text-red-600 mt-1">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="form-control w-full mx-auto flex flex-col sm:grid grid-cols-[20%_80%] items-center">
        <label className="label font-medium  text-sm md:text-base">
          Product Image:
        </label>
        <div className="w-full">
          <FileUpload onSuccess={handleUploadSuccess} />
        </div>
      </div>

      <div className="divider label font-medium text-sm md:text-base pt-3">
        Image Variants:{" "}
      </div>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="bg-blue-100 rounded-xl p-5 md:p-6 shadow-lg space-y-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-20">
            {/* Size & Aspect Ratio */}
            <div className="form-control w-full flex flex-col items-center">
              <label className="text-sm md:text-base font-medium mb-1 text-center">
                Size & Aspect Ratio
              </label>
              <select
                className="select select-bordered bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base transition duration-200 w-60"
                {...register(`variants.${index}.type`)}
              >
                {Object.entries(IMAGE_VARIANTS).map(([key, value]) => (
                  <option key={key} value={value.type} className="h-5 w-5">
                    {value.label} ({value.dimensions.width}x
                    {value.dimensions.height})
                  </option>
                ))}
              </select>
            </div>

            {/* License */}
            <div className="form-control w-full flex flex-col items-center">
              <label className="text-sm md:text-base font-medium mb-1 text-center">
                License
              </label>
              <select
                className="select select-bordered bg-gray-100  focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base transition duration-200 w-60"
                {...register(`variants.${index}.licence`)}
              >
                <option value="personal">Personal Use</option>
                <option value="commercial">Commercial Use</option>
              </select>
            </div>

            {/* Price */}
            <div className="form-control w-full flex flex-col items-center">
              <label className="text-sm md:text-base font-medium  mb-1 text-center">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                className={`input input-bordered bg-gray-100  focus:outline-none focus:ring-2 text-sm md:text-base transition duration-200 w-60 ${
                  errors.variants?.[index]?.price
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-indigo-500"
                }`}
                {...register(`variants.${index}.price`, {
                  valueAsNumber: true,
                  required: "Price is required",
                  min: { value: 0.01, message: "Price must be greater than 0" },
                })}
              />
              {errors.variants?.[index]?.price && (
                <span className="text-sm text-red-600 mt-1 text-center">
                  {errors.variants[index]?.price?.message}
                </span>
              )}
            </div>

            {/* Remove Button */}
            <div className="flex items-end">
              <button
                type="button"
                className="btn btn-sm bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="btn w-full flex items-center justify-center gap-2 border border-indigo-500 text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-300"
        onClick={() =>
          append({
            type: "SQUARE" as imageVariantType,
            price: 9.99,
            licence: "personal",
          })
        }
      >
        <Plus className="w-4 h-4" />
        Add Variant
      </button>

      <button
        type="submit"
        className="btn w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all duration-300"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating Product...
          </>
        ) : (
          "Create Product"
        )}
      </button>
    </form>
  );
}
