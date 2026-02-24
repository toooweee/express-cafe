import { ConflictException, NotFoundException } from '@/infra/helpers';
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
		const emailVo = UserEmail.create(email);

		const existingUser = await this.userRepository.findByEmail(emailVo);

		if (existingUser) {
			throw new ConflictException(`User with email ${email} already exists`);
		}

		const user = User.create({ id, props: { email: emailVo, password } });

		await this.userRepository.save(user);

		return UserApplicationMapper.toResponse(user);
	}

	async findAll() {
		const users = await this.userRepository.findAll();

		return users.map((user) => UserApplicationMapper.toResponse(user));
	}

	async findById(id: string) {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new NotFoundException(`User with id ${id} not found`);
		}

		return UserApplicationMapper.toResponse(user);
	}

	async findByEmail(email: string) {
		const emailVo = UserEmail.create(email);

		const user = await this.userRepository.findByEmail(emailVo);

		if (!user) {
			throw new NotFoundException(`User with email ${email} not found`);
		}

		return UserApplicationMapper.toResponse(user);
	}

	async findUsersLastLogin() {}
}
