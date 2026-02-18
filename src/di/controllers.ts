import { IController } from '@/di/types';
import { UserController } from '@/modules/user/user.controller';
import { providers } from '@/di/providers';

export const controllers: IController[] = [new UserController(providers.user.service)];
