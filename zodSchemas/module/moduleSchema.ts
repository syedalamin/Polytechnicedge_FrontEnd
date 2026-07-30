import { z } from "zod";

export const moduleSchema = {
  createModuleSchema: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    weekNumber: z.number().default(1),
    textInstruction: z.string().optional().default(""),
    estimatedDuration: z.number().default(30),
  }),
  updateModuleSchema: z.object({
    title: z.string().min(3).optional(),
    weekNumber: z.number().optional(),
    serial: z.number().optional(),
    textInstruction: z.string().optional(),
    estimatedDuration: z.number().optional(),
  }),
};
