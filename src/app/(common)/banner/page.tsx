/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AddBannerForm } from "@/components/shared/forms/AddBannerForm";
import { EditBannerForm } from "@/components/shared/forms/EditBannerForm";
import { MyModal } from "@/components/shared/Modal/MyModal";
import { ProductsPagination } from "@/components/shared/Pagination/MyPatination";
import { BannerTable } from "@/components/tables/BannerTable";
import { useState } from "react";

const BannerPage = () => {
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
      console.error("Error Updating animal:", error);
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
    <div>
      <div className="p-5">
        <h3 className="text-2xl sm:text-3xl  font-semibold mb-3 text-primary/90">
          Banner Management
        </h3>
        <p>Manage your app Banners</p>
      </div>
      {/* table */}
      <div className="max-w-full w-full p-5 mx-auto">
        <BannerTable
          handleAddProduct={handleAddProduct}
          handleEditProduct={handleEditProduct}
          handleDeleteProduct={handleDeleteProduct}
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
        title="Add New Banner"
        contentClassName="max-w-md"
      >
        <AddBannerForm onSubmit={handleSubmit} loading={loading} />
      </MyModal>
      <MyModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Edit Banner"
        contentClassName="max-w-md"
      >
        <EditBannerForm onSubmit={handleEditSubmit} loading={loading} />
      </MyModal>
    </div>
  );
};

export default BannerPage;
