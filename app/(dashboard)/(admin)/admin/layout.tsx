import { DashboardDrawer } from "@/components/layout/DashboardDrawer";
import ProtectedRoute, { UserRole } from "@/providers/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"] as UserRole[]}>
      <DashboardDrawer/>
      {children}
    </ProtectedRoute>
  );
}
