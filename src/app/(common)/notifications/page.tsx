import { Button } from "@/components/ui/button";
import { IconUser } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const NotificationPage = () => {
  return (
    <div className="p-5">
      {/* header */}
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold">Notifications</h4>
        <Button
          variant={"link"}
          className="hover:text-my-primary cursor-pointer"
        >
          Mark all as read
        </Button>
      </div>
      {/* content */}
      <div className="mt-5 space-y-3">
        <Link
          href={"#"}
          className="cursor-pointer p-3 flex items-center gap-5 bg-my-primary/20 border border-transparent hover:border-border hover:bg-my-primary/10 duration-300"
        >
          <IconUser size={30} />
          <div>
            <p className="font-medium">
              A new request to purchase a cow has been submitted. Admin approval
              required.
            </p>
            <p>2 min ago</p>
          </div>
        </Link>
        <Link
          href={"#"}
          className="cursor-pointer p-3 flex items-center gap-5 bg-my-primary/20 border border-transparent hover:border-border hover:bg-my-primary/10 duration-300"
        >
          <IconUser size={30} />
          <div>
            <p className="font-medium">
              A new request to purchase a cow has been submitted. Admin approval
              required.
            </p>
            <p>2 min ago</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotificationPage;
