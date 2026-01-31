"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { Input } from "../ui/input";
import banner1 from "@/assets/banner1.png";
import Image, { StaticImageData } from "next/image";

interface Banner {
  id: string;
  image: StaticImageData | string;
  title: string;
  description: string;
}

interface ProductsTableProps {
  banners?: Banner[];
  handleAddProduct: () => void;
  handleEditProduct: (id: string) => void;
  handleDeleteProduct: (id: string) => void;
}

const tableHeaders = ["Image", "Title", "Description", "Action"];

const defaultBanners: Banner[] = [
  {
    id: "1",
    image: banner1,
    title: "Premium Quality Livestock",
    description: "Healthy animals from certified farms",
  },
  {
    id: "2",
    image: banner1,
    title: "Banner title 2",
    description: "Banner descriptions",
  },
];

export function BannerTable({
  banners = defaultBanners,
  handleAddProduct,
  handleEditProduct,
  handleDeleteProduct,
}: ProductsTableProps) {
  const handleClick = () => {
    handleAddProduct();
  };
  const handleEditClick = (id: string) => {
    handleEditProduct(id);
  };
  const handleDeleteClick = (id: string) => {
    handleDeleteProduct(id);
  };
  return (
    <div className="space-y-6 bg-secondary p-5 rounded-xl">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg lg:text-xl font-semibold ">
            <Input
              className="border-border border-2 bg-white lg:min-w-md"
              placeholder="Search banners..."
            />
          </div>

          <Button onClick={handleClick} className="bg-my-primary">
            <IconPlus /> Add Banners
          </Button>
        </div>
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-white border-b border-gray-300 hover:bg-white">
                {tableHeaders.map((title) => (
                  <TableHead
                    key={title}
                    className="text-gray-700 font-semibold text-sm py-3 px-4"
                  >
                    {title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow
                  key={banner.id}
                  className="border-b border-gray-300 hover:bg-gray-50 last:border-b-0"
                >
                  <TableCell className="py-3 px-4">
                    <div className="max-w-36 h-12 bg-gray-200 rounded-md flex items-center justify-center text-xl">
                      <Image
                        src={banner.image}
                        width={400}
                        height={200}
                        alt="Banner1"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-700">
                    {banner.title}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-700">
                    {banner.description}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleEditClick(banner.id)}
                        className=" bg-my-primary"
                      >
                        <IconPencil />
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(banner.id)}
                        className=" bg-my-red"
                      >
                        <IconTrash />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
