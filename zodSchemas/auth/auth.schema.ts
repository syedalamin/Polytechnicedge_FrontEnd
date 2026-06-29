import z from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase, one lowercase, one number and one special character",
    }),
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(100, { message: "First name cannot exceed 100 characters" })
    .optional(),
  middleName: z
    .string()
    .max(100, { message: "Middle name cannot exceed 100 characters" })
    .optional(),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(100, { message: "Last name cannot exceed 100 characters" })
    .optional(),
  bio: z
    .string()
    .max(500, { message: "Bio cannot exceed 500 characters" })
    .optional(),
  address: z
    .string()
    .max(255, { message: "Address cannot exceed 255 characters" })
    .optional(),
  gender: z
    .string()
    .max(50, { message: "Gender cannot exceed 50 characters" })
    .optional(),
  profileImage: z.url().optional(),
  backgroundImage: z.url().optional(),
  contactNumber1: z
    .string()
    .max(20, { message: "Contact number cannot exceed 20 characters" })
    .optional(),
  contactNumber2: z
    .string()
    .max(20, { message: "Contact number cannot exceed 20 characters" })
    .optional(),
  dateOfBirth: z.string().optional(),
});

const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, { message: "Old password is required" }),
  newPassword: z
    .string()
    .min(6, { message: "New password must be at least 6 characters" }),
});

const forgetPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

const resetPasswordSchema = z.object({
  body: z.object({
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters" }),
  }),
});
const verifyEmailOtpAndLoginSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be at least 6 characters" }),
});
const resendOtpSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
});

export const authSchemas = {
  loginSchema,
  registerSchema,
  changePasswordSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  verifyEmailOtpAndLoginSchema,
  resendOtpSchema,
};
