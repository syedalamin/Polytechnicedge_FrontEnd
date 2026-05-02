import type { Metadata } from "next";
import LoginForm from "../../../ui/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login - PolytechnicEdge",
};

export default function LoginPage() {
  return <LoginForm />;
}
