import { CreateUserCommand } from '@/modules/user/application/user.dto';
import { UserApplicationMapper } from '@/modules/user/application/user.mapper';
import { UserRepositoryPort } from '@/modules/user/application/user.repository.port';
import { User } from '@/modules/user/domain/user';
import { UserEmail } from '@/modules/user/domain/vo/user-email';

export class UserService {
	constructor(private readonly userRepository: UserRepositoryPort) {}

	async create(command: CreateUserCommand) {
		const { email, password } = command;
		const id = crypto.randomUUID();
		const user = User.create(id, { email, password });

		await this.userRepository.save(user);

		return UserApplicationMapper.toResponse(user);
	}

	async findAll() {}

	async findById(id: string) {
		const user = await this.userRepository.findById(id.toString());

		return user ? UserApplicationMapper.toResponse(user) : null;
	}

	async findByEmail(email: string) {
		const emailVo = UserEmail.create(email);

		const user = await this.userRepository.findByEmail(emailVo);

		return user ? UserApplicationMapper.toResponse(user) : null;
	}

	async findUsersLastLogin() {}
}
