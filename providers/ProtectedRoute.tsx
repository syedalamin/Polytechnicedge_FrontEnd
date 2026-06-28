"use client";

import { getCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode, useState } from "react";

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
  ADMIN = "ADMIN",
}

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

 

const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = "/",
}: ProtectedRouteProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loginData = getCookie("loginData"); 
    

    if (!loginData) {
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(loginData.role)) {
      router.replace(redirectTo);

      return;
    }

    setLoading(false);
  }, [router, allowedRoles, redirectTo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
