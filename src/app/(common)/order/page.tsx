/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MyModal } from "@/components/shared/Modal/MyModal";
import { ProductsPagination } from "@/components/shared/Pagination/MyPatination";
import { OrdersTable } from "@/components/tables/OrderTable";
import { useState } from "react";

const OrderManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProduct = (id: string) => {
    console.log(id);
    setIsModalOpen(true);
  };
  return (
    <div>
      <div className="p-5">
        <h3 className="text-2xl sm:text-3xl  font-semibold mb-3 text-primary/90">
          Order Management
        </h3>
        <p>Manage your orders here</p>
      </div>
      {/* table */}
      <div className="max-w-full w-full p-5 mx-auto">
        <OrdersTable handleViewProduct={handleViewProduct} />
        <ProductsPagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
        />
      </div>
      <MyModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Add New Animal"
        contentClassName="max-w-md"
      >
        <h2>Product details</h2>
      </MyModal>
    </div>
  );
};

export default OrderManagement;
