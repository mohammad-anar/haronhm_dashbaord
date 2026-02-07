import { IconMenuOrder } from "@tabler/icons-react";
import React from "react";

const Notification = ({ data }: { data: any }) => {
  return (
    <div className="flex items-center  gap-3 bg-my-primary/10 hover:bg-gray-100 duration-300 rounded-md px-3 p-2 cursor-pointer">
      <IconMenuOrder />
      <div>
        <h4 className="text-sm  font-bold">{data.message}</h4>
        {/* date */}
        <p className="text-sm">{new Date(data.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Notification;
