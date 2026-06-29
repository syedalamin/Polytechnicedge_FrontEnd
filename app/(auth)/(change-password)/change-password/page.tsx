import ChangePasswordForm from "@/ui/auth/ChangePasswordForm";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Change Password - PolytechnicEdge",
};


export default function ChangePasswordPage() {
    return <ChangePasswordForm />;
}