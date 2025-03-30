"use client";

import { useEffect } from "react";
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
  const hideNavbar = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
