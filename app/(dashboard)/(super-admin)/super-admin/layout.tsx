import { DashboardDrawer } from "@/components/layout/DashboardDrawer";
import ProtectedRoute, { UserRole } from "@/providers/ProtectedRoute";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["SUPER_ADMIN"] as UserRole[]}>
      <DashboardDrawer />
      {children}
    </ProtectedRoute>
  );
}
