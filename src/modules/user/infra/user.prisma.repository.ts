import { UserRepositoryPort } from '@/modules/user/application/user.repository.port';
import { PrismaClient, User as PrismaUser } from '@/generated/prisma/client';
import { User } from '@/modules/user/domain/user';
import { toDomain } from '@/modules/user/infra/user.mapper';

export class UserPrismaRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async save(user: User): Promise<User> {
    const { id, email, password } = user;

    const response = await this.prisma.user.create({
      data: {
        id,
        email,
        password,
      },
    });

    return toDomain(response);
  }
}
