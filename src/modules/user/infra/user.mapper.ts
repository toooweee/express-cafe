import { User as UserPrismaModel } from '@prisma/generated/client';

import { User } from '@/modules/user/domain/user';

export const UserInfraMapper = {
	toDomain: ({ id, email, password }: UserPrismaModel) => {
		return User.create(id, { email, password });
	},
	toPersistence: (user: User) => {
		const props = user.getProps();

		return {
			id: props.id,
			email: props.email,
			password: props.password,
			createdAt: props.createdAt,
			updatedAt: props.updatedAt
		};
	}
};
