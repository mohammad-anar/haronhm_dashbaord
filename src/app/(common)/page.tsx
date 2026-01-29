"use client";

import { SectionCards } from "@/components/section-cards";

import { ProductsPagination } from "@/components/shared/Pagination/MyPatination";
import { ProductsTable } from "@/components/tables/productTable";
import { useState } from "react";

const Mainpage = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
              <ProductsTable />
              <ProductsPagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mainpage;
