import { AggregateId, CreateEntityProps, Entity } from '@ddd';

type TokenProps = {
	token: string;
	userId: AggregateId;
	userAgent: string;
	expiresAt: Date;
};

export class RefreshToken extends Entity<TokenProps> {
	private constructor(props: CreateEntityProps<TokenProps>) {
		super(props);
	}

	static create(props: CreateEntityProps<TokenProps>) {
		return new RefreshToken(props);
	}

	isExpired() {
		return new Date() > this.getProps().expiresAt;
	}
}
