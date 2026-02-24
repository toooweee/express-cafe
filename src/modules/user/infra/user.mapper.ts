import { User as UserPrismaModel } from '@prisma/generated/client';

import { User } from '@/modules/user/domain/user';
import { UserEmail } from '@/modules/user/domain/vo/user-email';

export const UserInfraMapper = {
	toDomain: ({ id, email, password }: UserPrismaModel) => {
		const emailVo = UserEmail.create(email);
		return User.create(id, { email: emailVo, password });
	},
	toPersistence: (user: User) => {
		const props = user.getProps();

		return {
			id: props.id,
			email: props.email.getValue(),
			password: props.password,
			createdAt: props.createdAt,
			updatedAt: props.updatedAt
		};
	}
};
