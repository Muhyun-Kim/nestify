"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/user";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const restoreUser = useUserStore((state) => state.restoreUser);

  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

  return <>{children}</>;
}
