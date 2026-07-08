import { z } from "zod";

const courseLevels = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "ALL_LEVELS"] as const;

export const courseSchema = {
  createCourseSchema: z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(200),
    shortDescription: z.string().max(500).optional().default(""),
    longDescription: z.string().optional().default(""),
    thumbnail: z.string().optional().default(""),
    previewVideoUrl: z.string().optional().default(""),
    price: z.number().min(0, "Price must be positive"),
    categoryId: z.string().min(1, "Category is required"),
    level: z.enum(courseLevels).default("ALL_LEVELS"),
    durationHours: z.number().optional(),
    whatYouWillLearn: z.array(z.string()).optional().default([]),
    requirements: z.array(z.string()).optional().default([]),
    prerequisites: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    accessExpiresInDays: z.number().default(365),
  }),
  updateCourseSchema: z.object({
    title: z.string().min(3).max(200).optional(),
    shortDescription: z.string().max(500).optional(),
    longDescription: z.string().optional(),
    thumbnail: z.string().optional(),
    previewVideoUrl: z.string().optional(),
    price: z.number().min(0).optional(),
    categoryId: z.string().optional(),
    level: z.enum(courseLevels).optional(),
    durationHours: z.number().optional(),
    whatYouWillLearn: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    accessExpiresInDays: z.number().optional(),
  }),
};
