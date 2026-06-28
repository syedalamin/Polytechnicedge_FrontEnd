import { useLogoutMutation } from "@/services/redux/api/modules/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Button from "./Button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const router = useRouter();

  const logout = async () => {
    try {
      await logoutMutation(undefined).unwrap();

      toast.success("Logout successful!");
      
      router.refresh();
    } catch (err: any) {
      const errorMsg =
        err?.data?.message || err?.data || "Login failed. Please try again.";

      toast.error(errorMsg);
    }
  };
  return (
    <Button
      size="sm"
      leftIcon={<LogOut className="w-4 h-4" />}
      onClick={logout}
      disabled={isLoading}
    >
      Logout
    </Button>
  );
}
