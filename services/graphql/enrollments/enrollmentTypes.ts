export interface IUserBrief {
  id: string;
  email: string;
  username: string;
}

export interface ICourseBrief {
  id: string;
  title: string;
  slug: string;
  thumbnail?: string | null;
  price?: number;
}

export interface IEnrollment {
  id: string;
  userId: string;
  courseId: string;
  user?: IUserBrief | null;
  course?: ICourseBrief | null;
  status: string;
  enrolledAt: string;
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IEnrollmentFilter {
  userId?: string;
  courseId?: string;
  status?: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedEnrollments {
  allEnrollments: {
    enrollments: IEnrollment[];
    meta: IPaginationMeta;
  };
}
