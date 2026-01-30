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
import { IconEye } from "@tabler/icons-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Product {
  id: string;
  userName: string;
  whatsAppNumber: string;
  animal: string;
  status: "Pending" | "Confirmed" | "Canceled";
}

interface ProductsTableProps {
  orders?: Product[];
  handleViewProduct: (id: string) => void;
}

const tableHeaders = [
  "Order ID",
  "User Name",
  "WhatsApp Number",
  "Animal",
  "Status",
  "Action",
];

const defaultOrders: Product[] = [
  {
    id: "ORD-0001",
    userName: "User1",
    whatsAppNumber: "+8801245689952",
    animal: "Cow",
    status: "Pending",
  },
  {
    id: "ORD-0002",
    userName: "User1",
    whatsAppNumber: "+8801245689952",
    animal: "Cow",
    status: "Confirmed",
  },
  {
    id: "ORD-0003",
    userName: "User1",
    whatsAppNumber: "+8801245689952",
    animal: "Cow",
    status: "Canceled",
  },
];

export function OrdersTable({
  orders = defaultOrders,
  handleViewProduct,
}: ProductsTableProps) {
  const [status, setStatus] = useState("All Status");
  return (
    <div className="space-y-6 bg-secondary p-5 rounded-xl">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Input
            className="border-border bg-white py-5 max-w-lg"
            placeholder="Search orders..."
          />
          <Select
            defaultValue="All Status"
            value={status}
            onValueChange={(val) => {
              setStatus(val);
            }}
          >
            <SelectTrigger className={cn("w-[180px] border-border bg-white")}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="All Status">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
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
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  className="border-b border-gray-300 hover:bg-gray-50 last:border-b-0"
                >
                  <TableCell className="py-3 px-4 text-gray-700">
                    {order.id}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-700">
                    {order.userName}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-orange-500 font-medium">
                    {order.whatsAppNumber}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-orange-500 font-medium">
                    {order.animal}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Badge
                      variant="outline"
                      className={
                        order.status === "Confirmed"
                          ? "bg-green-50 text-green-700 border-green-500"
                          : order.status === "Pending"
                            ? ""
                            : "bg-orange-50 text-orange-700 border-red-500"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleViewProduct(order.id)}
                        className=" bg-blue-500 cursor-pointer"
                      >
                        <IconEye />
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
