import ForgetPasswordForm from "@/ui/auth/ForgetPasswordForm";

import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
  title: "Forget Password - PolytechnicEdge",
}; 

export default function ForgetPasswordPage() {
    return <ForgetPasswordForm />;
}
