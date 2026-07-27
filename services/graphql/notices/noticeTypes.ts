import { IPaginationMeta } from "../shared/paginationTypes";

export interface IUserBrief {
  id: string;
  email: string;
  username: string;
}

export interface ICourseBrief {
  id: string;
  title: string;
  slug: string;
}

export interface INotice {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author?: IUserBrief | null;
  isGlobal: boolean;
  courseId?: string | null;
  course?: ICourseBrief | null;
  createdAt: string;
  updatedAt: string;
}

export interface INoticeFilter {
  authorId?: string;
  isGlobal?: boolean;
  courseId?: string;
  search?: string;
}



export interface IPaginatedNotices {
  allNotices: {
    notices: INotice[];
    meta: IPaginationMeta;
  };
}
