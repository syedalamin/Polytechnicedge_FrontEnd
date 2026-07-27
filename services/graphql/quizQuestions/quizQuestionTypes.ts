import { IPaginationMeta } from "../shared/paginationTypes";

export interface IQuizBrief {
  id: string;
  title: string;
}

export interface IQuizQuestion {
  id: string;
  quizId: string;
  quiz?: IQuizBrief | null;
  question: string;
  options: string;
  correctAnswer: string;
  marks: number;
  explanation?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IQuizQuestionFilter {
  quizId?: string;
  search?: string;
}



export interface IPaginatedQuizQuestions {
  allQuizQuestions: {
    questions: IQuizQuestion[];
    meta: IPaginationMeta;
  };
}
