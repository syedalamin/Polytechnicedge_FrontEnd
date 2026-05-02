import type { Metadata } from "next";
import RegisterForm from "../../../ui/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register - PolytechnicEdge",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
