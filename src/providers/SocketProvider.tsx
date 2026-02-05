"use client";

import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { setConnected } from "@/redux/features/socketSlice";
import { getSocket } from "@/lib/socket";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = getSocket();

    socket.on("connect", () => {
      console.log("✅ Socket connected", socket.id);
      dispatch(setConnected(true));
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      dispatch(setConnected(false));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [dispatch]);

  return <>{children}</>;
};
