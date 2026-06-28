import { DashboardDrawer } from "@/components/layout/DashboardDrawer";
import ProtectedRoute, { UserRole } from "@/providers/ProtectedRoute";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["INSTRUCTOR"] as UserRole[]}>
     <DashboardDrawer/>
      {children}
    </ProtectedRoute>
  );
}
