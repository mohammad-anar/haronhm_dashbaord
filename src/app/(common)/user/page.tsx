/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ProductsPagination } from "@/components/shared/Pagination/MyPatination";
import { UsersTable } from "@/components/tables/UsersTable";
import { useState } from "react";

const ProductManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleBlockUnBlock = (id: string, status: string) => {
    console.log(id, status);
  };
  return (
    <div>
      <div className="p-5">
        <h3 className="text-2xl sm:text-3xl  font-semibold mb-3 text-primary/90">
          User Lists
        </h3>
        <p>Manage and view all registered users</p>
      </div>
      {/* table */}
      <div className="max-w-full w-full p-5 mx-auto">
        <UsersTable handleBlockUnBlock={handleBlockUnBlock} />
        <ProductsPagination
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
