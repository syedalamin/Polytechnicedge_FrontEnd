export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

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

export interface IModuleBrief {
  id: string;
  title: string;
  slug: string;
  weekNumber?: number | null;
}

export interface IQuizBrief {
  id: string;
  title: string;
}

export interface ICategoryBrief {
  id: string;
  name: string;
  slug: string;
}

export interface IBundleBrief {
  id: string;
  title: string;
  slug: string;
}
