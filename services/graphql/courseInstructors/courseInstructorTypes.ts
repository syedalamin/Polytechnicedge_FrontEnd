export interface ICourseBrief {
  id: string;
  title: string;
  slug: string;
}

export interface IInstructorBrief {
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string | null;
  expertise?: string[];
  rating?: number;
  user?: {
    id: string;
    email: string;
  };
}

export interface ICourseInstructor {
  id: string;
  courseId: string;
  instructorId: string;
  course?: ICourseBrief | null;
  instructor?: IInstructorBrief | null;
  createdAt: string;
}

export interface ICourseInstructorFilter {
  courseId?: string;
  instructorId?: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedCourseInstructors {
  allCourseInstructors: {
    courseInstructors: ICourseInstructor[];
    meta: IPaginationMeta;
  };
}
