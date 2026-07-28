import { z } from "zod";

export const bundleSchema = {
  createBundleSchema: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    
    items: z
      .array(z.object({ courseId: z.string() }))
      .min(1, "Select at least one course"),
  }),
  updateBundleSchema: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(1, "Description is required").optional(),
    isPublished: z.boolean().optional(),
    items: z
      .array(
        z.object({
          courseId: z.string().min(1),
        })
      )
      .optional(),
    removeItems: z.array(z.string().min(1)).optional(),
  }),
};
