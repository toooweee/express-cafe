import { AggregateId } from '@/libs/ddd';
import { User } from '@/modules/user/domain/user';
import { UserEmail } from '@/modules/user/domain/vo/user-email';

export interface UserRepositoryPort {
	save(user: User): Promise<User>;
	findAll(): Promise<User[] | []>;
	findById(id: AggregateId): Promise<User | null>;
	findByEmail(email: UserEmail): Promise<User | null>;
}
