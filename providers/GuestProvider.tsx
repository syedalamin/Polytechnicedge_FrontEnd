"use client";

import { getCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode, useState } from "react";

interface GuestRouteProps {
  children: ReactNode;
}

const GuestProvider = ({ children }: GuestRouteProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loginData = getCookie("loginData");

     
    if (loginData) {
      router.replace("/");  
      return;
    }

    
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;  
  }

  return <>{children}</>;
};

export default GuestProvider;
