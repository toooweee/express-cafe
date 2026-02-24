import { PrismaClient } from '@prisma/generated/client';

import { RefreshTokenRepositoryPort } from '@/modules/auth/application/ports/token.repository.port';
import { Token } from '@/modules/auth/domain/token';
import { TokenInfraMapper } from '@/modules/auth/infra/token.mapper';

export class RefreshTokenRepository implements RefreshTokenRepositoryPort {
	constructor(private readonly prisma: PrismaClient) {}

	upsert = async (refreshToken: Token) => {
		const { id, userAgent, userId, token, expiresAt } =
			TokenInfraMapper.toPersistence(refreshToken);

		const response = await this.prisma.token.upsert({
			where: {
				userAgent_userId: {
					userAgent,
					userId
				}
			},
			update: {
				token,
				expiresAt
			},
			create: {
				id,
				token,
				expiresAt,
				userId,
				userAgent
			}
		});

		return TokenInfraMapper.toDomain(response);
	};

	findByToken = async (token: string) => {
		const response = await this.prisma.token.findUnique({
			where: {
				token
			}
		});

		if (!response) {
			return null;
		}

		return TokenInfraMapper.toDomain(response);
	};

	delete = async (token: string) => {
		await this.prisma.token.delete({
			where: {
				token
			}
		});
	};
}
