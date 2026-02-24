import prisma from '@/infra/utils/prisma';
import { AuthService } from '@/modules/auth/application/auth.service';
import { Hasher } from '@/modules/auth/infra/hasher';
import { RefreshTokenRepository } from '@/modules/auth/infra/refreshTokenRepository';
import { PostService } from '@/modules/post/application/post.service';
import { PostPrismaRepository } from '@/modules/post/infra/post.prisma.repository';
import { UserService } from '@/modules/user/application/user.service';
import { UserPrismaRepository } from '@/modules/user/infra/user.prisma.repository';

const userRepository = new UserPrismaRepository(prisma);
const userService = new UserService(userRepository);

const postRepository = new PostPrismaRepository(prisma);
const postService = new PostService(postRepository);

const hasher = new Hasher();
const refreshTokenRepository = new RefreshTokenRepository(prisma);
const authService = new AuthService(
	prisma,
	hasher,
	userRepository,
	refreshTokenRepository
);

export const providers = {
	prisma,
	user: {
		repository: userRepository,
		service: userService
	},
	post: {
		repository: postRepository,
		service: postService
	},
	auth: {
		service: authService
	}
};
