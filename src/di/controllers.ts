import { providers } from '@/di/providers';
import { IController } from '@/di/types';
import { AuthController } from '@/modules/auth/presentation/auth.controller';
import { PostController } from '@/modules/post/presentation/post.controller';
import { UserController } from '@/modules/user/presentation/user.controller';

export const controllers: IController[] = [
	new UserController(providers.user.service),
	new PostController(providers.post.service),
	new AuthController()
];
