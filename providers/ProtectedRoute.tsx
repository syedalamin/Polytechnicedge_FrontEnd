"use client";

import { useMeForAuth } from "@/services/graphql/user/userHook";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

enum UserRole {
  SUPER_ADMIN,
  STUDENT,
  INSTRUCTOR,
  ADMIN,
}
interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[]; 
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { data, loading, isAuthenticated } = useMeForAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!loading && data && !allowedRoles.includes(data.role as any)) {
      router.replace("/");
      return;
    }
  }, [data, loading, isAuthenticated, router, allowedRoles]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  if (isAuthenticated && data && allowedRoles.includes(data.role as any)) {
    return <>{children}</>;
  }
  return null;
};

export default ProtectedRoute;
