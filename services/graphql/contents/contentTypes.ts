import { IPaginationMeta } from "../shared/paginationTypes";

export interface IModuleBrief {
  id: string;
  title: string;
  slug: string;
  courseId?: string;
}

export interface IContent {
  id: string;
  moduleId: string;
  module?: IModuleBrief | null;
  title: string;
  slug: string;
  contentType: string;
  contentUrl?: string | null;
  textContent?: string | null;
  isLocked: boolean;
  duration?: number | null;
  serial: number;
  createdAt: string;
  updatedAt: string;
}

export interface IContentFilter {
  moduleId?: string;
  contentType?: string;
  search?: string;
}



export interface IPaginatedContents {
  allContents: {
    contents: IContent[];
    meta: IPaginationMeta;
  };
}
