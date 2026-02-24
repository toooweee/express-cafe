import { CreateEntityProps, Entity } from '@/libs/ddd';
import { UserEmail } from '@/modules/user/domain/vo/user-email';

type UserProps = {
	email: UserEmail;
	password: string;
};

export class User extends Entity<UserProps> {
	private constructor(props: CreateEntityProps<UserProps>) {
		super(props);
	}

	static create(props: CreateEntityProps<UserProps>) {
		return new User(props);
	}
}
