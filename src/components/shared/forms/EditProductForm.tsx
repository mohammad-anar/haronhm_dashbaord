"use client";

import React from "react";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";

// Validation schema
const animalFormSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  type: z.string().optional(),
  price: z.string().optional(),
  description: z.string().optional(),
  image: z.instanceof(File).nullable().optional(),
});

type AnimalFormValues = z.infer<typeof animalFormSchema>;

interface AddAnimalFormProps {
  onSubmit: (data: AnimalFormValues) => void | Promise<void>;
  loading?: boolean;
}

export function EditAnimalForm({
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
    watch,
    reset,
  } = useForm<AnimalFormValues>({
    resolver: zodResolver(animalFormSchema),
    defaultValues: {
      name: "",
      category: "",
      type: "",
      price: "",
      description: "",
      image: null,
    },
  });

  const imageFile = watch("image");

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
        <Label className="text-sm font-medium text-gray-700">Name</Label>
        <Input
          {...register("name")}
          placeholder="Enter animal name"
          className="py-5 border-2 border-border"
          disabled={loading}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Category</Label>
        <Select
          onValueChange={(value) => setValue("category", value)}
          disabled={loading}
        >
          <SelectTrigger className="py-3 w-full border-2 border-border">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Livestock">Livestock</SelectItem>
            <SelectItem value="Pets">Pets</SelectItem>
            <SelectItem value="Wild">Wild</SelectItem>
            <SelectItem value="Farm">Farm</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>

      {/* Type */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Type</Label>
        <Input
          {...register("type")}
          placeholder="e.g., Cow, Sheep, Dog"
          className="py-5 border-2 border-border"
          disabled={loading}
        />
        {errors.type && (
          <p className="text-xs text-red-500">{errors.type.message}</p>
        )}
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Price</Label>
        <div className="relative">
          <Input
            {...register("price")}
            placeholder="0.00"
            type="number"
            step="0.01"
            className="py-5 border-2 border-border"
            disabled={loading}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            USD
          </span>
        </div>
        {errors.price && (
          <p className="text-xs text-red-500">{errors.price.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Description</Label>
        <Textarea
          {...register("description")}
          placeholder="Enter description"
          className="py-5 border-2 border-border min-h-20 resize-none"
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
          {loading ? "Updating..." : "Update Animal"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1 bg-transparent "
          onClick={() => {
            reset();
            setPreview(null);
          }}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
