import { IPaginationMeta } from "../shared/paginationTypes";

export interface IModuleBrief {
  id: string;
  title: string;
  slug: string;
}

export interface IQuizQuestionBrief {
  id: string;
  question: string;
  options?: string;
  correctAnswer?: string;
  marks: number;
  explanation?: string | null;
}

export interface IQuiz {
  id: string;
  moduleId: string;
  module?: IModuleBrief | null;
  title: string;
  isAdaptive: boolean;
  isLocked: boolean;
  timeLimit: number;
  passingScore: number;
  questions?: IQuizQuestionBrief[];
  createdAt: string;
  updatedAt: string;
}

export interface IQuizFilter {
  moduleId?: string;
  search?: string;
}



export interface IPaginatedQuizzes {
  allQuizzes: {
    quizzes: IQuiz[];
    meta: IPaginationMeta;
  };
}
