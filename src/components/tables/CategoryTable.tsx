"use client";

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
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";

interface Category {
  id: string;
  image: string;
  categoryName: string;
  status: "Active" | "Inactive";
}

interface ProductsTableProps {
  categories?: Category[];
  handleAddCategory: () => void;
  handleEditCategory: (id: string) => void;
  handleDeleteCategory: (id: string) => void;
}

const tableHeaders = ["Image", "Category Name", "status", "Action"];

const defaultCategories: Category[] = [
  {
    id: "1",
    image: "🐄",
    categoryName: "Cow",
    status: "Active",
  },
  {
    id: "2",
    image: "🐪",
    categoryName: "Camel",
    status: "Active",
  },
  {
    id: "3",
    image: "🐑",
    categoryName: "Sheep",
    status: "Active",
  },
];

export function CategoryTable({
  categories = defaultCategories,
  handleAddCategory,
  handleEditCategory,
  handleDeleteCategory,
}: ProductsTableProps) {
  const handleClick = () => {
    handleAddCategory();
  };
  const handleEditClick = (id: string) => {
    handleEditCategory(id);
  };
  const handleDeleteClick = (id: string) => {
    handleDeleteCategory(id);
  };
  return (
    <div className="space-y-6 bg-secondary p-5 rounded-xl">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg lg:text-xl font-semibold ">Recent Category</h2>
          <Button onClick={handleClick} className="bg-my-primary">
            <IconPlus /> Add Category
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
              {categories.map((categories) => (
                <TableRow
                  key={categories.id}
                  className="border-b border-gray-300 hover:bg-gray-50 last:border-b-0"
                >
                  <TableCell className="py-3 px-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-xl">
                      {categories.image}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-700">
                    {categories.categoryName}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Badge
                      variant={
                        categories.status === "Active" ? "outline" : "secondary"
                      }
                      className={
                        categories.status === "Active"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-orange-50 text-orange-700 border-orange-200"
                      }
                    >
                      {categories.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => handleEditClick(categories.id)}
                        className=" bg-my-primary"
                      >
                        <IconPencil />
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(categories.id)}
                        className=" bg-my-primary"
                      >
                        <IconTrash />
                      </Button>
                    </div>
                    {/* <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="center"
                        className="bg-transparent border-0 shadow-none flex items-center justify-centers"
                      >
                        
                      </DropdownMenuContent>
                    </DropdownMenu> */}
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
