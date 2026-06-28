 
import { DashboardDrawer } from "@/components/layout/DashboardDrawer";
import ProtectedRoute, { UserRole } from "@/providers/ProtectedRoute";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["STUDENT"] as UserRole[]}>
      <DashboardDrawer />
      {children}
    </ProtectedRoute>
  );
}
