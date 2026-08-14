import z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;

const createInstructorSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase, one lowercase, one number and one special character",
    }),
  firstName: z.string().min(1, "First name is required").max(100),
  middleName: z.string().max(100).optional(),
  lastName: z.string().min(1, "Last name is required").max(100),
  bio: z.string().max(500).optional(),
  address: z.string().max(255).optional(),
  gender: z.string().max(50).optional(),
  profileImage: z.url().optional().or(z.literal("")),
  backgroundImage: z.url().optional().or(z.literal("")),
  contactNumber1: z.string().max(20).optional(),
  contactNumber2: z.string().max(20).optional(),
  dateOfBirth: z.string().optional(),
  expertise: z.array(z.string()).optional(),
  qualification: z.string().max(255).optional(),
  experienceYears: z.coerce.number().optional(),
  linkedin: z.url().optional().or(z.literal("")),
  website: z.url().optional().or(z.literal("")),
});

const updateInstructorSchema = z.object({
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
  dateOfBirth: z.string().optional(),
  expertise: z.array(z.string()).optional(),
  qualification: z.string().max(255).optional(),
  experienceYears: z.coerce.number().optional(),
  linkedin: z.url().optional().or(z.literal("")),
  website: z.url().optional().or(z.literal("")),
});

const updateMyProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  middleName: z.string().max(100).optional(),
  lastName: z.string().min(1, "Last name is required").max(100),
  bio: z.string().max(500).optional(),
  address: z.string().max(255).optional(),
  gender: z.string().max(50).optional(),
  profileImage: z.url().optional().or(z.literal("")),
  backgroundImage: z.url().optional().or(z.literal("")),
  contactNumber1: z.string().max(20).optional(),
  contactNumber2: z.string().max(20).optional(),
  dateOfBirth: z.string().optional(),
  expertise: z.array(z.string()).optional(),
  qualification: z.string().max(255).optional(),
  linkedin: z.url().optional().or(z.literal("")),
  website: z.url().optional().or(z.literal("")),
});

export const instructorSchema = {
  createInstructorSchema,
  updateInstructorSchema,
  updateMyProfileSchema,
};
