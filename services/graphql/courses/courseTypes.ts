export interface ICategory {
  id: string;
  name: string;
  slug: string;
}

export interface IModuleBrief {
  id: string;
  title: string;
  slug: string;
  weekNumber: number;
  serial: number;
}

export interface ICourse {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string | null;
  longDescription?: string | null;
  thumbnail?: string | null;
  previewVideoUrl?: string | null;
  price: number;
  isPublished: boolean;
  isFeatured: boolean;
  level: string;
  categoryId: string;
  category?: ICategory | null;
  durationHours?: number | null;
  whatYouWillLearn: string[];
  requirements: string[];
  prerequisites: string[];
  tags: string[];
  accessExpiresInDays: number;
  modules?: IModuleBrief[];
  createdAt: string;
  updatedAt: string;
}

export interface ICourseFilter {
  categoryId?: string;
  level?: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  search?: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedCourses {
  allCourses: {
    courses: ICourse[];
    meta: IPaginationMeta;
  };
}
