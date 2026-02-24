import { AggregateId, CreateEntityProps, Entity } from '@ddd';

type TokenProps = {
	token: string;
	userId: AggregateId;
	userAgent: string;
	expiresAt: Date;
};

export class Token extends Entity<TokenProps> {
	private constructor(props: CreateEntityProps<TokenProps>) {
		super(props);
	}

	static create(id: string, props: TokenProps) {
		return new Token({ id, props });
	}

	isExpired() {
		return new Date() > this.getProps().expiresAt;
	}
}
