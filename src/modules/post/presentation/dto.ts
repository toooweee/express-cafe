import { z } from 'zod';

export const createPostSchema = z.object({
	title: z.string(),
	description: z.string(),
	tags: z.array(z.string()).min(1),
	userId: z.string()
});

export type CreatePostDto = z.infer<typeof createPostSchema>;
