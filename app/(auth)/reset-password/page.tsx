import ResetPasswordForm from "@/ui/auth/ResetPasswordForm";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Reset Password - PolytechnicEdge",
}; 

export default function ResetPasswordPage() {
    return <ResetPasswordForm />;
}
