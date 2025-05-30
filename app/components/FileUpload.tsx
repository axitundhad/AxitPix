"use client";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function FileUpload({
  onSuccess,
}: {
  onSuccess: (response: IKUploadResponse) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    setError(err.message);
    setUploading(false);
  };

  const handleSuccess = (response: IKUploadResponse) => {
    setUploading(false);
    setError(null);
    onSuccess(response);
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };

  return (
    <div className="space-y-2">
      <IKUpload
        fileName="product-image.png"
        onError={onError}
        onSuccess={handleSuccess}
        onUploadStart={handleStartUpload}
        //  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
        className=" file-input text-gray-300 opacity-70 file-input-bordered w-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-700 transition duration-200 cursor-pointer"
        validateFile={(file: File) => {
          const validTypes = ["image/png", "image/jpeg", "image/webp"];
          if (!validTypes.includes(file.type)) {
            setError("Please upload a valid image file (JPEG, PNG, or WebP)");
            return false;
          }

          if (file.size > 5 * 1024 * 1024) {
            setError("File size must be less than 5MB");
            return false;
          }

          return true;
        }}
      />

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-primary">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Uploading...</span>
        </div>
      )}

      {error && <div className="text-error text-sm">{error}</div>}
    </div>
  );
}
