import RegisterForm from "@/ui/auth/RegisterForm";
import type { Metadata } from "next";
 

export const metadata: Metadata = {
  title: "Register - PolytechnicEdge",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
