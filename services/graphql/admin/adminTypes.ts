import { IUser } from "../user/userTypes";

export interface IAdmin {
  id: string;
  userId: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  bio?: string | null;
  address?: string | null;
  gender: string;
  contactNumber1: string; 
  profileImage: string;
  updatedAt: string;
  createdAt: string;
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
