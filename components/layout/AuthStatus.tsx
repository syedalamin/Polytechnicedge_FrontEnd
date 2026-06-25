import { getCookie } from "@/utils/cookie";
import Link from "next/dist/client/link";
import Button from "../common/Button";

import { useMeForAuth } from "@/services/graphql/user/userHook";

export const AuthStatus = () => {
  const user = getCookie("user");
  const { data } = useMeForAuth();

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <span className="text-gray-300"> {data?.role}</span>
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
