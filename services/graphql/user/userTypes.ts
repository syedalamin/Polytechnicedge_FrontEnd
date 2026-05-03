type UserRole = "SUPER_ADMIN" | "STUDENT" | "INSTRUCTOR" | "ADMIN";
export interface IUser {
  id: string;
  email: string;
  username: string;
  slug: string;
  role: UserRole;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  status: string | null;
  createdAt: Date;
  updatedAt: Date;
  adminProfile?: any;
  instructorProfile?: any;
  studentProfile?: any;
  orders?: any[];
  payments?: any[];
  enrollments?: any[];
  userProgress?: any[];
  certificates?: any[];
  notices?: any[];
  quizAttempts?: any[];
  courses?: any[];
}

export interface IMeResponse {
  me: IUser;
}
