import { providers } from '@/di/providers';
import { IController } from '@/di/types';
import { UserController } from '@/modules/user/user.controller';

export const controllers: IController[] = [
	new UserController(providers.user.service)
];
