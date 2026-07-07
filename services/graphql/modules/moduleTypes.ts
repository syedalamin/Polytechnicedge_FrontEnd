export interface IContentBrief {
  id: string;
  title: string;
  slug: string;
  contentType: string;
  contentUrl?: string | null;
  textContent?: string | null;
  isLocked?: boolean;
  duration?: number | null;
  serial: number;
}

export interface IQuizBrief {
  id: string;
  title: string;
  timeLimit?: number;
  passingScore?: number;
}

export interface ICourseBrief {
  id: string;
  title: string;
  slug: string;
}

export interface IModule {
  id: string;
  courseId: string;
  course?: ICourseBrief | null;
  weekNumber: number;
  title: string;
  slug: string;
  textInstruction?: string | null;
  estimatedDuration: number;
  serial: number;
  contents?: IContentBrief[];
  quizzes?: IQuizBrief[];
  createdAt: string;
  updatedAt: string;
}

export interface IModuleFilter {
  courseId?: string;
  search?: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedModules {
  allModules: {
    modules: IModule[];
    meta: IPaginationMeta;
  };
}
