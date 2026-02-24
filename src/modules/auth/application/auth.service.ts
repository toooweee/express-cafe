import { PrismaClient } from '@prisma/generated/client';
import * as argon from 'argon2';

import { RegisterCommand } from '@/modules/auth/application/dto';
import { HasherPort } from '@/modules/auth/application/ports/hasher.port';
import { RefreshTokenRepositoryPort } from '@/modules/auth/application/ports/token.repository.port';
import { UserRepositoryPort } from '@/modules/user/application/user.repository.port';

export class AuthService {
	constructor(
		private readonly prisma: PrismaClient,
		private readonly hasher: HasherPort,
		private readonly userRepository: UserRepositoryPort,
		private readonly refreshTokenRepository: RefreshTokenRepositoryPort
	) {}

	register = async (command: RegisterCommand) => {
		console.log(argon);
	};
}
