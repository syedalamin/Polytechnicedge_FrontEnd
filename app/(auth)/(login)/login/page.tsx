import LoginForm from "@/ui/auth/LoginForm";
import type { Metadata } from "next";
 

export const metadata: Metadata = {
  title: "Login - PolytechnicEdge",
};

export default function LoginPage() {
  return <LoginForm />;
}
