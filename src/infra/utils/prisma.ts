import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/generated/client';

import { config } from '@/infra/helpers';

const adapter = new PrismaPg({
	connectionString: config.DATABASE_URL
});

const prisma = new PrismaClient({
	adapter
});

export default prisma;
