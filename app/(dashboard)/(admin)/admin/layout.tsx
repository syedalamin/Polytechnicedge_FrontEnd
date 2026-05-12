import Navbar from "@/components/layout/Navbar";
import ProtectedRoute, { UserRole } from "@/providers/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"] as UserRole[]}>
      <Navbar />
      {children}
    </ProtectedRoute>
  );
}
