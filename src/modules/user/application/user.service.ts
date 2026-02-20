import { CreateUserDto } from '@/modules/user/application/types';
import { UserRepositoryPort } from '@/modules/user/application/user.repository.port';
import { User } from '@/modules/user/domain/user';

export class UserService {
	constructor(private readonly userRepository: UserRepositoryPort) {}

	async create(dto: CreateUserDto) {
		const { email, password } = dto;

		const id = crypto.randomUUID();
		const user = User.create(id, { email, password });

		await this.userRepository.save(user);

		return user;
	}

	async findAll() {}

	async findUsersLastLogin() {}
}
