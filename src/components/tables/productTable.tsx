"use client";

import { MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconPencil, IconPlus } from "@tabler/icons-react";

interface Product {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  availability: "Stock" | "Out Of Stock";
}

interface ProductsTableProps {
  products?: Product[];
}

const tableHeaders = [
  "Image",
  "Name",
  "Category",
  "Price",
  "Availability",
  "Action",
];

const defaultProducts: Product[] = [
  {
    id: "1",
    image: "🐄",
    name: "Cow",
    category: "Cow",
    price: 1250,
    availability: "Stock",
  },
  {
    id: "2",
    image: "🐪",
    name: "Camel",
    category: "Camel",
    price: 850,
    availability: "Out Of Stock",
  },
  {
    id: "3",
    image: "🐑",
    name: "Sheep",
    category: "Sheep",
    price: 850,
    availability: "Stock",
  },
];

export function ProductsTable({
  products = defaultProducts,
}: ProductsTableProps) {
  return (
    <div className="space-y-6 bg-secondary p-5 rounded-xl">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg lg:text-xl font-semibold ">Recent Products</h2>
          <Button className="bg-my-primary">
            <IconPlus /> Add Product
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
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  className="border-b border-gray-300 hover:bg-gray-50 last:border-b-0"
                >
                  <TableCell className="py-3 px-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-xl">
                      {product.image}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-700">
                    {product.name}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-700">
                    {product.category}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-orange-500 font-medium">
                    ${product.price}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Badge
                      variant={
                        product.availability === "Stock"
                          ? "outline"
                          : "secondary"
                      }
                      className={
                        product.availability === "Stock"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-orange-50 text-orange-700 border-orange-200"
                      }
                    >
                      {product.availability}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="center"
                        className="bg-transparent border-0 shadow-none flex items-center justify-centers"
                      >
                        <Button className=" bg-my-primary">
                          <IconPencil />
                          Edit
                        </Button>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
