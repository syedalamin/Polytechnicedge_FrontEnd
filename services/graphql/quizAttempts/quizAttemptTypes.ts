export interface IUserBrief {
  id: string;
  email: string;
  username: string;
}

export interface IQuizBrief {
  id: string;
  title: string;
  passingScore?: number;
  timeLimit?: number;
}

export interface IQuizAttemptSubmission {
  id: string;
  quizAttemptId?: string;
  textAnswer?: string | null;
  marks?: number | null;
  feedback?: string | null;
  totalMarks?: number | null;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IQuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  user?: IUserBrief | null;
  quiz?: IQuizBrief | null;
  score: number;
  isPassed: boolean;
  answers: string;
  attemptCount: number;
  attemptedAt: string;
  submissions?: IQuizAttemptSubmission[];
  createdAt: string;
  updatedAt: string;
}

export interface IQuizAttemptFilter {
  userId?: string;
  quizId?: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedQuizAttempts {
  allQuizAttempts: {
    attempts: IQuizAttempt[];
    meta: IPaginationMeta;
  };
}
