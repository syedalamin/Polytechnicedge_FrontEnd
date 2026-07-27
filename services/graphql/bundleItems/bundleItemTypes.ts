import { IPaginationMeta } from "../shared/paginationTypes";

export interface ICourseBrief {
  id: string;
  title: string;
  slug: string;
  thumbnail?: string | null;
  price?: number;
}

export interface IBundleBrief {
  id: string;
  title: string;
  slug: string;
}

export interface ICourseBundleItem {
  id: string;
  bundleId: string;
  courseId: string;
  priceAtBundleTime: number;
  course?: ICourseBrief | null;
  bundle?: IBundleBrief | null;
  createdAt: string;
  updatedAt: string;
}

export interface IBundleItemFilter {
  bundleId?: string;
}



export interface IPaginatedBundleItems {
  getBundleItemsByBundleId: {
    bundlesItems: ICourseBundleItem[];
    meta: IPaginationMeta;
  };
}
