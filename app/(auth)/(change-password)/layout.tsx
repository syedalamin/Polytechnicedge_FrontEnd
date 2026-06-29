import ProtectedRoute, { UserRole } from "@/providers/ProtectedRoute";

 

export default function ChangePasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["STUDENT", "ADMIN", "SUPER_ADMIN", "INSTRUCTOR"] as UserRole[]}>
      {children}
    </ProtectedRoute>
  );
}
