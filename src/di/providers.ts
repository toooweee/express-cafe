import prisma from '@/infra/prisma';
import { UserService } from '@/modules/user/application/user.service';
import { UserPrismaRepository } from '@/modules/user/infra/user.prisma.repository';

const userRepository = new UserPrismaRepository(prisma);
const userService = new UserService(userRepository);

export const providers = {
	prisma,
	user: {
		repository: userRepository,
		service: userService
	}
};
