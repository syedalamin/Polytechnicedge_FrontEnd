import { z } from "zod";

export const quizQuestionSchema = {
  createQuizQuestionSchema: z.object({
    quizId: z.string().min(1),
    question: z.string().min(5, "Question must be at least 5 characters"),
    options: z.array(z.string()).min(2, "At least 2 options required"),
    correctAnswer: z.array(z.string()).min(1, "At least one correct answer required"),
    marks: z.number().min(1, "Marks must be at least 1"),
    explanation: z.string().optional().default(""),
  }),
  updateQuizQuestionSchema: z.object({
    question: z.string().min(5).optional(),
    options: z.array(z.string()).min(2).optional(),
    correctAnswer: z.array(z.string()).min(1).optional(),
    marks: z.number().min(1).optional(),
    explanation: z.string().optional(),
  }),
};
