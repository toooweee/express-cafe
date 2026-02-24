import { z } from 'zod';

export const createUserSchema = z.object({
	email: z.email(),
	password: z.string()
});

export const findByIdParamSchema = z.object({
	userId: z.string()
});

export const findUserQuerySchema = z
	.object({
		userEmail: z.email().optional(),
		userId: z.string().optional()
	})
	.refine((data) => data.userEmail || data.userId);

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type FindByIdParamDto = z.infer<typeof findByIdParamSchema>;
export type FindUserQueryDto = z.infer<typeof findUserQuerySchema>;
