import { z } from "zod";

export const quizSchema = {
  createQuizSchema: z.object({
    moduleId: z.string().min(1),
    title: z.string().min(3, "Title must be at least 3 characters"),
    isAdaptive: z.boolean().default(false),
    isLocked: z.boolean().default(true),
    timeLimit: z.number().default(2),
    passingScore: z.number().default(10),
  }),
  updateQuizSchema: z.object({
    title: z.string().min(3).optional(),
    isAdaptive: z.boolean().optional(),
    isLocked: z.boolean().optional(),
    timeLimit: z.number().optional(),
    passingScore: z.number().optional(),
  }),
};
