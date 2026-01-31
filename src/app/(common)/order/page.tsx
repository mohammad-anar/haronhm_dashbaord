/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import productImage from "@/assets/product.png";
import { MyModal } from "@/components/shared/Modal/MyModal";
import { ProductsPagination } from "@/components/shared/Pagination/MyPatination";
import { OrdersTable } from "@/components/tables/OrderTable";
import { Clock, User } from "lucide-react";
import Image from "next/image";
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
        title=""
        contentClassName="!w-[800px] !max-w-none"
      >
        <div className="space-y-5">
          <div className="bg-[#E5E7EB] border-gray-300 border-2 rounded-2xl p-8 ">
            <div className="flex justify-between items-start mb-3">
              <h1 className="text-lg font-semibold text-gray-800">
                Order #ORD-2024-001
              </h1>
              <span className="bg-my-green text-white px-3 py-1 text-sm rounded-full font-semibold">
                Pending
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <span>Jan 15, 2026</span>
              <Clock size={20} />
              <span>2:30 PM</span>
            </div>

            {/* Product */}
            <div className="flex gap-6">
              <div className="shrink-0">
                <Image
                  src={productImage}
                  alt="Premium Sheep Merino"
                  width={300}
                  height={300}
                  className="w-28 h-28 rounded-2xl object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Premium Sheep Merino
                </h2>
                <p className="text-my-green font-semibold mb-2">
                  Healthy & Well-fed
                </p>
                <p className="text-2xl font-bold text-my-primary">$ 850</p>
              </div>
            </div>
          </div>

          {/* User Information Card */}
          <div className="border-2 border-gray-300 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <User size={28} className="text-my-green" />
              <h2 className="text-2xl font-semibold text-my-green">
                User Information
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex gap-8">
                <span className="text-gray-800 font-semibold text-lg">
                  User Name :
                </span>
                <span className="text-my-green font-semibold text-lg">
                  John Doe
                </span>
              </div>

              <div className="flex gap-8">
                <span className="text-gray-800 font-semibold text-lg">
                  WhatsApp Number :
                </span>
                <span className="text-my-green font-semibold text-lg">
                  01745....
                </span>
              </div>

              <div className="flex gap-8">
                <span className="text-gray-800 font-semibold text-lg">
                  Address :
                </span>
                <span className="text-my-green font-semibold text-lg">
                  Dhaka Gulsan House #12
                </span>
              </div>
            </div>
          </div>
        </div>
      </MyModal>
    </div>
  );
};

export default OrderManagement;
