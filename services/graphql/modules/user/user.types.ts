export interface UpdateMeInput {
  username?: string;
  adminData?: AdminDataInput;
  instructorData?: InstructorDataInput;
  studentData?: StudentDataInput;
}

export interface AdminDataInput {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  bio?: string;
  gender?: string;
  contactNumber1?: string;
  contactNumber2?: string;
  dateOfBirth?: string;
  address?: string;
  profileImage?: string;
  backgroundImage?: string;
}

export interface InstructorDataInput extends AdminDataInput {
  qualification?: string;
  expertise?: string[];
  linkedin?: string;
  website?: string;
}
type UserRole = "SUPER_ADMIN" | "STUDENT" | "INSTRUCTOR" | "ADMIN"
export interface StudentDataInput extends AdminDataInput {
  educationLevel?: string;
  interests?: string[];
}
export interface User {
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
