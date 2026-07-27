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
  thumbnail?: string | null;
}

export interface ICertificate {
  id: string;
  userId: string;
  courseId: string;
  user?: IUserBrief | null;
  course?: ICourseBrief | null;
  certificateUrl: string;
  issuedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICertificateFilter {
  userId?: string;
  courseId?: string;
}



export interface IPaginatedCertificates {
  allCertificates: {
    certificates: ICertificate[];
    meta: IPaginationMeta;
  };
}
