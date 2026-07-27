import { IUser } from "../user/userTypes";
import { IPaginationMeta } from "../shared/paginationTypes";

export interface IInstructor {
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
  dateOfBirth?: string | null;
  expertise?: string[];
  qualification?: string | null;
  experienceYears?: number | null;
  linkedin?: string | null;
  website?: string | null;
  rating: number;
  contactNumber1?: string | null;
  contactNumber2?: string | null;
  profileImage?: string | null;
  backgroundImage?: string | null;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}



export interface IPaginatedInstructors {
  getAllInstructors: {
    instructors: IInstructor[];
    meta: IPaginationMeta;
  };
}
