import prisma from '@/infra/prisma';
import { PostService } from '@/modules/post/application/post.service';
import { PostPrismaRepository } from '@/modules/post/infra/post.prisma.repository';
import { UserService } from '@/modules/user/application/user.service';
import { UserPrismaRepository } from '@/modules/user/infra/user.prisma.repository';

const userRepository = new UserPrismaRepository(prisma);
const userService = new UserService(userRepository);

const postRepository = new PostPrismaRepository(prisma);
const postService = new PostService(postRepository);

export const providers = {
	prisma,
	user: {
		repository: userRepository,
		service: userService
	},
	post: {
		repository: postRepository,
		service: postService
	}
};
