import { Token as TokenModel } from '@prisma/generated/client';

import { Token } from '@/modules/auth/domain/token';

export const TokenInfraMapper = {
	toDomain: ({ id, ...props }: TokenModel) => {
		return Token.create(id, { ...props });
	},
	toPersistence: (token: Token) => {
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
