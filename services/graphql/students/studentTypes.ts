import { IUser } from "../user/userTypes";
import { IPaginationMeta } from "../shared/paginationTypes";

export interface IStudent {
  id: string;
  userId: string;
  username: string;
  slug: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  bio?: string | null;
  address?: string | null;
  gender?: string | null;
  profileImage?: string | null;
  backgroundImage?: string | null;
  contactNumber1?: string | null;
  contactNumber2?: string | null;
  educationLevel?: string | null;
  interests: string[];
  dateOfBirth?: string | null;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}



export interface IPaginatedStudents {
  getAllStudents: {
    students: IStudent[];
    meta: IPaginationMeta;
  };
}
