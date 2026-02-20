import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
	PORT: z.coerce.number(),
	POSTGRES_USER: z.string(),
	POSTGRES_PASSWORD: z.string(),
	POSTGRES_DATABASE: z.string(),
	DATABASE_URL: z.string(),
	REDIS_HOST: z.string(),
	REDIS_PORT: z.string()
});

export const config = configSchema.parse(process.env);
