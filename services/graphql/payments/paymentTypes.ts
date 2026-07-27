import { IPaginationMeta } from "../shared/paginationTypes";

export interface IUserBrief {
  id: string;
  email: string;
  username: string;
}

export interface IOrderBrief {
  id: string;
  totalAmount: number;
  status: string;
}

export interface IPayment {
  id: string;
  userId: string;
  orderId: string;
  user?: IUserBrief | null;
  order?: IOrderBrief | null;
  amount: number;
  transactionId: string;
  paymentMethod: string;
  status: string;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentFilter {
  userId?: string;
  orderId?: string;
  status?: string;
}



export interface IPaginatedPayments {
  allPayments: {
    payments: IPayment[];
    meta: IPaginationMeta;
  };
}
