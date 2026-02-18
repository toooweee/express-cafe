import { User as UserPrismaModel } from '@/generated/prisma/client';
import { User } from '@/modules/user/domain/user';

export const toDomain = ({ id, email, password }: UserPrismaModel) => {
  return User.create({ id, email, password });
};
