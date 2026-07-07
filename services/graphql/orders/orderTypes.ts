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

export interface IBundleBrief {
  id: string;
  title: string;
  slug: string;
}

export interface IOrderItem {
  id: string;
  orderId?: string;
  courseId?: string | null;
  bundleId?: string | null;
  price: number;
  course?: ICourseBrief | null;
  bundle?: IBundleBrief | null;
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentBrief {
  id: string;
  amount: number;
  transactionId: string;
  paymentMethod: string;
  status: string;
  paidAt?: string | null;
}

export interface IOrder {
  id: string;
  userId: string;
  user?: IUserBrief | null;
  totalAmount: number;
  status: string;
  transactionId?: string | null;
  items?: IOrderItem[];
  payment?: IPaymentBrief | null;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderFilter {
  userId?: string;
  status?: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedOrders {
  allOrders: {
    orders: IOrder[];
    meta: IPaginationMeta;
  };
}
