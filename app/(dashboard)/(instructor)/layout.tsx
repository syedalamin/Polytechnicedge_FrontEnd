import Navbar from "@/components/layout/Navbar";
import ProtectedRoute, { UserRole } from "@/providers/ProtectedRoute";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["INSTRUCTOR"] as UserRole[]}>
      <Navbar />
      {children}
    </ProtectedRoute>
  );
}
