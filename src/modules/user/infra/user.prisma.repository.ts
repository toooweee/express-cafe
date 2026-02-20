import { PrismaClient, User as PrismaUser } from '@/generated/prisma/client';
import { UserRepositoryPort } from '@/modules/user/application/user.repository.port';
import { User } from '@/modules/user/domain/user';
import { toDomain, toPersistence } from '@/modules/user/infra/user.mapper';

export class UserPrismaRepository implements UserRepositoryPort {
	constructor(private readonly prisma: PrismaClient) {}

	async save(user: User): Promise<User> {
		const data = toPersistence(user);

		const response = await this.prisma.user.create({
			data
		});

		return toDomain(response);
	}
}
