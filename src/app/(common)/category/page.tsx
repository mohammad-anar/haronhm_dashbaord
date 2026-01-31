/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AddCategoryForm } from "@/components/shared/forms/AddCategoryForm";
import { EditCategoryForm } from "@/components/shared/forms/EditCategoryForm";
import { MyModal } from "@/components/shared/Modal/MyModal";
import { ProductsPagination } from "@/components/shared/Pagination/MyPatination";
import { CategoryTable } from "@/components/tables/CategoryTable";
import { useState } from "react";

const CategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Animal added:", data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding animal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    setIsModalOpen(true);
  };
  const handleEditCategory = (id: string) => {
    console.log(id);
    setIsEditModalOpen(true);
  };
  const handleDeleteCategory = (id: string) => {
    console.log(id);
    setIsEditModalOpen(true);
  };
  return (
    <div>
      <div className="p-5">
        <h3 className="text-2xl sm:text-3xl  font-semibold mb-3 text-primary/90">
          Category Management
        </h3>
        <p>Manage your livestock categories</p>
      </div>
      {/* table */}
      <div className="max-w-full w-full p-5 mx-auto">
        <CategoryTable
          handleAddCategory={handleAddCategory}
          handleEditCategory={handleEditCategory}
          handleDeleteCategory={handleDeleteCategory}
        />
        <ProductsPagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
        />
      </div>
      <MyModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Add New Category"
        contentClassName="max-w-md"
      >
        <AddCategoryForm onSubmit={handleSubmit} loading={loading} />
      </MyModal>
      <MyModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Edit Category"
        contentClassName="max-w-md"
      >
        <EditCategoryForm onSubmit={handleSubmit} loading={loading} />
      </MyModal>
    </div>
  );
};

export default CategoryPage;
