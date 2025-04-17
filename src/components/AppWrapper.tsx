"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const restoreUser = useUserStore((state) => state.restoreUser);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    restoreUser();
    setMounted(true);
  }, [restoreUser]);

  if (!mounted) return null;

  const hideNavbar = pathname === "/login" || pathname === "/sign-up";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
