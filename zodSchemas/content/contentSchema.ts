import { z } from "zod";

const contentTypes = ["VIDEO", "TEXT", "PDF", "AUDIO", "EXTERNAL_LINK", "INTERACTIVE"] as const;

export const contentSchema = {
  createContentSchema: z.object({
  
    title: z.string().min(3, "Title must be at least 3 characters"),
    contentType: z.enum(contentTypes),
    contentUrl: z.string().optional().default(""),
    textContent: z.string().optional().default(""),
    duration: z.number().optional(),
    isLocked: z.preprocess(
      (val) => val === "true" || val === true,
      z.boolean().default(true)
    ),
   
  }),
  updateContentSchema: z.object({
    title: z.string().min(3).optional(),
    contentType: z.enum(contentTypes).optional(),
    contentUrl: z.string().optional(),
    textContent: z.string().optional(),
    duration: z.number().optional(),
    isLocked: z.boolean().optional(),

  }),
};
