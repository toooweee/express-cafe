import { Token as TokenModel } from '@prisma/generated/client';

import { RefreshToken } from '@/modules/auth/domain/refresh-token';

export const TokenInfraMapper = {
	toDomain: ({ id, ...props }: TokenModel) => {
		return RefreshToken.create({ id, props });
	},
	toPersistence: (token: RefreshToken) => {
		const props = token.getProps();

		return {
			id: props.id,
			token: props.token,
			userId: props.userId.toString(),
			userAgent: props.userAgent,
			expiresAt: props.expiresAt
		};
	}
};
