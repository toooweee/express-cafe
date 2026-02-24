import { PrismaClient } from '@prisma/generated/client';

import { AggregateId } from '@/libs/ddd';
import { UserRepositoryPort } from '@/modules/user/application/user.repository.port';
import { User } from '@/modules/user/domain/user';
import { UserEmail } from '@/modules/user/domain/vo/user-email';
import { UserInfraMapper } from '@/modules/user/infra/user.mapper';

export class UserPrismaRepository implements UserRepositoryPort {
	constructor(private readonly prisma: PrismaClient) {}

	async save(user: User): Promise<User> {
		const data = UserInfraMapper.toPersistence(user);

		const response = await this.prisma.user.create({
			data
		});

		return UserInfraMapper.toDomain(response);
	}

	async findById(id: AggregateId) {
		const response = await this.prisma.user.findUnique({
			where: { id }
		});

		if (!response) return null;

		return UserInfraMapper.toDomain(response);
	}

	async findByEmail(email: UserEmail) {
		const response = await this.prisma.user.findUnique({
			where: { email: email.getValue() }
		});

		if (!response) return null;

		return UserInfraMapper.toDomain(response);
	}
}
