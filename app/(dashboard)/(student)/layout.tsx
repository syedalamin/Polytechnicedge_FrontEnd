 
import StudentNavbar from "@/components/layout/StudentNavbar";
import ProtectedRoute, { UserRole } from "@/providers/ProtectedRoute";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["STUDENT"] as UserRole[]}>
      <StudentNavbar />
      {children}
    </ProtectedRoute>
  );
}
