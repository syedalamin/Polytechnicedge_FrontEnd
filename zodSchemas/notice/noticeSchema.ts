import { z } from "zod";

export const noticeSchema = {
  createNoticeSchema: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    isGlobal: z.preprocess(
      (val) => (val === "true" ? true : val === "false" ? false : val),
      z.boolean().default(true),
    ),
    courseId: z.string().optional().default(""),
  }),
  updateNoticeSchema: z.object({
    title: z.string().min(3).optional(),
    content: z.string().min(10).optional(),
    isGlobal: z.preprocess(
      (val) => (val === "true" ? true : val === "false" ? false : val),
      z.boolean().optional(),
    ),
    courseId: z.string().optional(),
  }),
};
