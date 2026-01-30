/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SectionCards } from "@/components/section-cards";
import { AddAnimalForm } from "@/components/shared/forms/AddProductForm";
import { EditAnimalForm } from "@/components/shared/forms/EditProductForm";
import { MyModal } from "@/components/shared/Modal/MyModal";

import { ProductsPagination } from "@/components/shared/Pagination/MyPatination";
import { ProductsTable } from "@/components/tables/productTable";
import { useState } from "react";

const Mainpage = () => {
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
  const handleEditSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Update Animal:", data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error Updationg animal:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };
  const handleEditProduct = (id: string) => {
    console.log(id);
    setIsEditModalOpen(true);
  };
  const handleDeleteProduct = (id: string) => {
    console.log(id);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="p-5">
              <h3 className="text-2xl sm:text-3xl  font-semibold mb-3 text-primary/90">
                Dashboard Overview
              </h3>
              <p>Welcome back, Admin</p>
            </div>
            <SectionCards />
            <div className="max-w-full w-full p-5 mx-auto">
              <ProductsTable
                handleAddProduct={handleAddProduct}
                handleEditProduct={handleEditProduct}
                handleDeleteProduct={handleDeleteProduct}
                isRecent={true}
              />
              <ProductsPagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
      <MyModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Add New Animal"
        contentClassName="max-w-md"
      >
        <AddAnimalForm onSubmit={handleSubmit} loading={loading} />
      </MyModal>
      <MyModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Edit Animal"
        contentClassName="max-w-md"
      >
        <EditAnimalForm onSubmit={handleEditSubmit} loading={loading} />
      </MyModal>
    </>
  );
};

export default Mainpage;
