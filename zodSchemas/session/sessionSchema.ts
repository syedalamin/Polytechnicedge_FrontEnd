import { z } from "zod";

const sessionTypes = ["LIVE_CLASS", "SUPPORT_SESSION"] as const;
const semesters = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "EIGHTH", "ALL_LEVELS"] as const;

export const sessionSchema = {
  createSessionSchema: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    shortDescription: z.string().min(10),
    type: z.enum(sessionTypes),
    semester: z.enum(semesters),
    instructorId: z.string().min(1),
    meetingUrl: z.string().url("Must be a valid URL"),
    startTime: z.string().min(1, "Start time is required"),
    duration: z.number().optional(),
  }),
  updateSessionSchema: z.object({
    title: z.string().min(3).optional(),
    shortDescription: z.string().optional(),
    type: z.enum(sessionTypes).optional(),
    semester: z.enum(semesters).optional(),
    meetingUrl: z.string().url().optional(),
    startTime: z.string().optional(),
    duration: z.number().optional(),
  }),
};
