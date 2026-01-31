"use client";

import React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import Image from "next/image";

const categorySchema = z.object({
  categoryName: z.string().min(1, "Category name is required"),
  categoryImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB",
    ),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface AddCategoryFormProps {
  onSubmit: (data: CategoryFormData) => Promise<void>;
  loading?: boolean;
}

export function AddCategoryForm({
  onSubmit,
  loading = false,
}: AddCategoryFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        handleFileSelect(file);
      }
    }
  };

  const handleDragActive = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragInactive = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileSelect = (file: File) => {
    setSelectedFileName(file.name);
    setPreview(URL.createObjectURL(file));
    setValue("categoryImage", file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFormSubmit = async (data: CategoryFormData) => {
    try {
      await onSubmit(data);
      reset();
      setPreview(null);
      setSelectedFileName("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Category Image Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Category Image
        </label>
        <div
          onDrop={handleDrop}
          onDragEnter={handleDragActive}
          onDragLeave={handleDragInactive}
          onDragOver={handleDragActive}
          className={`relative flex items-center justify-center rounded-xl h-32 cursor-pointer transition-all ${
            dragActive
              ? "bg-green-700 ring-2 ring-green-800"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
            required
          />
          <div className="flex flex-col items-center justify-center pointer-events-none gap-2">
            {preview ? (
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={preview || "/placeholder.svg"}
                  width={300}
                  height={300}
                  alt="Preview"
                  className="w-12 h-12 rounded object-cover"
                />
                <span className="text-xs text-white font-medium">
                  {selectedFileName}
                </span>
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 text-white" />
                <span className="text-sm font-medium text-white">
                  Select File
                </span>
              </>
            )}
          </div>
        </div>
        {errors.categoryImage && (
          <p className="text-sm text-red-600">{errors.categoryImage.message}</p>
        )}
      </div>

      {/* Category Name Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Category Name
        </label>
        <Input
          {...register("categoryName")}
          placeholder="e.g. Cow"
          className="bg-gray-50 border-gray-200"
        />
        {errors.categoryName && (
          <p className="text-sm text-red-600">{errors.categoryName.message}</p>
        )}
      </div>

      {/* Save Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg px-6 py-2"
      >
        {loading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
