"use client";
import { getCookie } from "@/utils/cookie";
import Link from "next/dist/client/link";
import Button from "../common/Button";

import { useMeForAuth } from "@/services/graphql/user/userHook";
import LogoutButton from "../common/LogoutButton";
 

export const AuthStatus = () => {
  const loginData = getCookie("loginData");
  const { data } = useMeForAuth();
 
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
