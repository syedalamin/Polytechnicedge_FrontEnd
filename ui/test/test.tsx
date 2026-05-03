"use client";

import { useMeForAuth } from "@/services/graphql/user/userHook";


export const Test = () => {
   const {data} = useMeForAuth();
   console.log("User from useMeForAuth hook:", data);
  return <></>;
};
