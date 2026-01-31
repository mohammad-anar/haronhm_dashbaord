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
import { Input } from "../ui/input";
import { Ban, BlocksIcon, CheckIcon, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  phone: string;
  orderCount: number;
  status: "Active" | "Blocked";
}

interface UsersTableProps {
  users?: User[];
  handleBlockUnBlock: (id: string, status: string) => void;
}

const tableHeaders = ["Name", "Phone", "Order Count", "Status", "Actions"];

const defaultUsers: User[] = [
  {
    id: "1",
    name: "John",
    phone: "+55668522",
    orderCount: 5,
    status: "Active",
  },
  {
    id: "2",
    name: "Ada",
    phone: "+55668522",
    orderCount: 2,
    status: "Blocked",
  },
  {
    id: "3",
    name: "Smith",
    phone: "+55668522",
    orderCount: 10,
    status: "Active",
  },
];

export function UsersTable({
  users = defaultUsers,
  handleBlockUnBlock,
}: UsersTableProps) {
  const handleUserAction = (id: string, status: string) => {
    handleBlockUnBlock(id, status);
  };
  return (
    <div className="space-y-6 bg-secondary p-5 rounded-xl">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Input
            className="border-border border py-5 bg-white lg:min-w-md"
            placeholder="Search users by name or phone..."
          />
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
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-b border-gray-300 hover:bg-gray-50 last:border-b-0"
                >
                  <TableCell className="py-3 px-4 text-gray-700">
                    {user.name}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-700">
                    {user.phone}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-my-primary font-medium">
                    ${user.orderCount}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Badge
                      variant={"outline"}
                      className={
                        user.status === "Active"
                          ? "bg-my-green/10 text-my-green border-my-green"
                          : "bg-my-red/10 text-my-red border-my-red"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    {/* <div className="flex items-center gap-2">
                      <Button className=" bg-my-primary">
                        <Ban />
                      </Button>
                      <Button className=" bg-my-red">
                        <CheckIcon />
                      </Button>
                    </div> */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center">
                        <DropdownMenuItem
                          onClick={() => handleBlockUnBlock("1", "Block")}
                          className="bg-my-red text-white cursor-pointer"
                        >
                          <Ban className="text-white" /> Block
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleBlockUnBlock("1", "UnBlock")}
                          className="bg-my-green text-white cursor-pointer mt-1"
                        >
                          <CheckIcon className="text-white" /> Unblock
                        </DropdownMenuItem>
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
