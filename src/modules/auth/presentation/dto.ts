import { z } from 'zod';

export const registerSchema = z.object({
	email: z.email(),
	password: z.string().min(5)
});

export const loginSchema = registerSchema;

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
