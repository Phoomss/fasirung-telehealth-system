const { z } = require('zod');

const signupSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).trim().min(1, 'Title cannot be empty'),
    full_name: z.string({ required_error: 'Full name is required' }).trim().min(2, 'Full name must be at least 2 characters'),
    phone: z.string({ required_error: 'Phone number is required' })
      .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    age: z.union([z.number(), z.string()])
      .transform((val) => {
        const num = Number(val);
        if (isNaN(num)) throw new Error('Age must be a valid number');
        return num;
      })
      .refine((val) => val > 0 && val < 120, 'Age must be between 1 and 120'),
    username: z.string({ required_error: 'Username is required' })
      .trim()
      .min(3, 'Username must be at least 3 characters')
      .max(50, 'Username cannot exceed 50 characters'),
    password: z.string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters'),
    role: z.enum(['USER', 'OFFICER', 'COUNSELOR']).optional().default('USER'),
  }),
});

const loginSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'Username is required' }).trim().min(1, 'Username is required'),
    password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
  }),
});

const bookingCreateSchema = z.object({
  body: z.object({
    userId: z.number({ required_error: 'User ID is required' }),
    booking_type: z.enum(['bloodTest', 'consult'], {
      required_error: 'Booking type must be either bloodTest or consult',
    }),
    booking_detail: z.string().optional().default(''),
    appointment: z.string({ required_error: 'Appointment date is required' })
      .refine((val) => !isNaN(Date.parse(val)), 'Appointment must be a valid date'),
  }),
});

module.exports = {
  signupSchema,
  loginSchema,
  bookingCreateSchema,
};
