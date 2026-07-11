import z from "zod";

const updateStudentSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100).optional(),
  middleName: z.string().max(100).optional(),
  lastName: z.string().min(1, "Last name is required").max(100).optional(),
  bio: z.string().max(500).optional(),
  address: z.string().max(255).optional(),
  gender: z.string().max(50).optional(),
  profileImage: z.url().optional().or(z.literal("")),
  backgroundImage: z.url().optional().or(z.literal("")),
  contactNumber1: z.string().max(20).optional(),
  contactNumber2: z.string().max(20).optional(),
  educationLevel: z.string().max(100).optional(),
  interests: z.array(z.string()).optional(),
  dateOfBirth: z.string().optional(),
});

export const studentSchema = { updateStudentSchema };
