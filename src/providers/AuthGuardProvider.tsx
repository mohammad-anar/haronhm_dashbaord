"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const isAuthPage =
      pathname.startsWith("/login") || pathname.startsWith("/auth");

    if (!isLoggedIn && !isAuthPage) {
      router.replace("/login");
    }

    if (isLoggedIn && isAuthPage) {
      router.replace("/");
    }

    setChecking(false);
  }, [pathname, router]);

  if (checking) return null;

  return <>{children}</>;
}
