"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";

export const ProtectedRouteForAdmin = ({
  children,
  userRole,
}: {
  children: React.ReactNode;
  userRole?: UserRole;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (userRole !== "ADMIN") {
      router.push("/settings");
    }
  }, [userRole, router]);

  // Prevent rendering children while redirecting
  if (userRole !== "ADMIN") {
    return null;
  }

  return <>{children}</>;
};
