import prisma from '@/infra/utils/prisma';
import { AuthService } from '@/modules/auth/application/auth.service';
import {
	Hasher,
	RefreshTokenPrismaRepository
} from '@/modules/auth/infra/adapters';
import { Jwt } from '@/modules/auth/infra/adapters/jwt';
import { PostService } from '@/modules/post/application/post.service';
import { PostPrismaRepository } from '@/modules/post/infra/post.prisma.repository';
import { UserService } from '@/modules/user/application/user.service';
import { UserPrismaRepository } from '@/modules/user/infra/user.prisma.repository';

const userRepository = new UserPrismaRepository(prisma);
const userService = new UserService(userRepository);

const postRepository = new PostPrismaRepository(prisma);
const postService = new PostService(postRepository);

const hasher = new Hasher();
const jwt = new Jwt();
const refreshTokenRepository = new RefreshTokenPrismaRepository(prisma);
const authService = new AuthService(
	hasher,
	jwt,
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
		repository: refreshTokenRepository,
		service: authService
	}
};
