"use client";
import { getCookie } from "@/utils/cookie";
import Link from "next/dist/client/link";
import Button from "../common/Button";

import { useMeForAuth } from "@/services/graphql/user/userHook";
import LogoutButton from "../common/LogoutButton";
import { useEffect, useState } from "react";

export const AuthStatus = () => {
  const [isMounted, setIsMounted] = useState(false);
  const loginData = getCookie("loginData");
  const { data } = useMeForAuth();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="flex items-center gap-3"></div>;
  }
  return (
    <div className="flex items-center gap-3">
      {loginData ? (
        <>
          <span className="text-gray-300"> {data?.role}</span>
          <LogoutButton />
        </>
      ) : (
        <>
          <Link href="/login">
            <Button size="sm">Login</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Register</Button>
          </Link>
        </>
      )}
    </div>
  );
};
