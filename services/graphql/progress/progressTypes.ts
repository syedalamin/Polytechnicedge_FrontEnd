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
}

export interface IUserProgress {
  id: string;
  userId: string;
  courseId: string;
  user?: IUserBrief | null;
  course?: ICourseBrief | null;
  progress: number;
  isCompleted: boolean;
  completedContents: string[];
  currentContentId?: string | null;
  lastAccessed?: string | null;
  completedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IUserProgressFilter {
  userId?: string;
  courseId?: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedUserProgress {
  allUserProgress: {
    progressList: IUserProgress[];
    meta: IPaginationMeta;
  };
}
