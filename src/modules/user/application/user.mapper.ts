import { User } from '@/modules/user/domain/user';

export const UserApplicationMapper = {
	toResponse: (user: User) => {
		const props = user.getProps();

		return {
			id: props.id,
			email: props.email,
			createdAt: props.createdAt,
			updatedAt: props.updatedAt
		};
	}
};
