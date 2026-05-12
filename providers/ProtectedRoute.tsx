"use client";

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

function getUserFromCookie() {
  try {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));

    if (!cookie) return null;

    return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
  } catch {
    return null;
  }
}

const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = "/",
}: ProtectedRouteProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = getUserFromCookie();

    if (!userData) {
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(userData.role)) {
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
