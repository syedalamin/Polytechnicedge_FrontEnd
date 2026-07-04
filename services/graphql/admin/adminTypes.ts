import { IUser } from "../user/userTypes";

export interface IAdmin {
  id: string;
  userId: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  bio?: string | null;
  address?: string | null;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
 
export interface IAdminResponse {
  getAllAdmins: {
    admins: IAdmin[];
    meta: IPaginationMeta;
  };
}
