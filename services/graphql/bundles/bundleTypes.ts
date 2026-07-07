export interface ICourseBrief {
  id: string;
  title: string;
  slug: string;
  thumbnail?: string | null;
  price?: number;
  shortDescription?: string | null;
  durationHours?: number | null;
  level?: string;
}

export interface IBundleItem {
  id: string;
  bundleId?: string;
  courseId: string;
  priceAtBundleTime: number;
  course?: ICourseBrief | null;
  createdAt: string;
  updatedAt: string;
}

export interface ICourseBundle {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  isPublished: boolean;
  items?: IBundleItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ICourseBundleFilter {
  isPublished?: boolean;
  search?: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedCourseBundles {
  allBundles: {
    bundles: ICourseBundle[];
    meta: IPaginationMeta;
  };
}
