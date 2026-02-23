import { CreateEntityProps, Entity } from '@/libs/ddd';

type UserProps = {
	email: string;
	password: string;
};

export class User extends Entity<UserProps> {
	private constructor(props: CreateEntityProps<UserProps>) {
		super(props);
	}

	static create(id: string, props: UserProps) {
		return new User({ id, props });
	}
}
