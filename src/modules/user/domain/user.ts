import { Entity } from '@/libs/ddd';

type UserProps = {
	email: string;
	password: string;
};

export class User extends Entity<UserProps> {
	private constructor(id: string, props: UserProps) {
		super({ id, props });
	}

	static create(id: string, props: UserProps) {
		const { email, password } = props;

		return new User(id, { email, password });
	}
}
