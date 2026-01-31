"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const animalFormSchema = z.object({
  title: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.instanceof(File).nullable(),
});

type AnimalFormValues = z.infer<typeof animalFormSchema>;

interface AddAnimalFormProps {
  onSubmit: (data: AnimalFormValues) => void | Promise<void>;
  loading?: boolean;
}

export function AddBannerForm({
  onSubmit,
  loading = false,
}: AddAnimalFormProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<AnimalFormValues>({
    resolver: zodResolver(animalFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });


  // Handle image file changes
  const handleImageChange = (file: File | null) => {
    if (file) {
      setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageChange(files[0]);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleImageChange(files[0]);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (data: AnimalFormValues) => {
    await onSubmit(data);
    reset();
    setPreview(null);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Title</Label>
        <Input
          {...register("title")}
          placeholder="Enter Banner title"
          className="py-5 border-2 border-border"
          disabled={loading}
        />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Description</Label>
        <Input
          {...register("description")}
          placeholder="Enter Banner description"
          className="py-5 border-2 border-border"
          disabled={loading}
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Image Upload with Drag and Drop */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 block">Image</Label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg transition-colors ${
            dragActive
              ? "bg-my-green text-white"
              : preview
                ? "bg-my-green text-white"
                : "bg-my-green text-white hover:bg-green-700"
          }`}
        >
          {preview ? (
            <Image
              src={preview || "/placeholder.svg"}
              width={500}
              height={300}
              alt="Preview"
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="size-8" />
              <span className="text-sm font-medium">Select File</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={loading}
          />
        </div>
        {errors.image && (
          <p className="text-xs text-red-500">{errors.image.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-my-primary text-white hover:bg-my-primary/80 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Banner"}
        </Button>
      </div>
    </form>
  );
}
