import { add } from 'date-fns';

import { config } from '@/infra/helpers';
import { ConflictException, UnauthorizedException } from '@/libs/shared';
import {
	LoginCommand,
	LogoutCommand,
	RefreshCommand,
	RegisterCommand
} from '@/modules/auth/application/dto';
import {
	HasherPort,
	JwtPort,
	RefreshTokenRepositoryPort
} from '@/modules/auth/application/ports';
import { RefreshToken } from '@/modules/auth/domain/refresh-token';
import { UserRepositoryPort } from '@/modules/user/application/user.repository.port';
import { User } from '@/modules/user/domain/user';
import { UserEmail } from '@/modules/user/domain/vo/user-email';

export class AuthService {
	constructor(
		private readonly hasher: HasherPort,
		private readonly jwt: JwtPort,
		private readonly userRepository: UserRepositoryPort,
		private readonly refreshTokenRepository: RefreshTokenRepositoryPort
	) {}

	register = async (command: RegisterCommand) => {
		const { email, password, userAgent } = command;

		const emailVo = UserEmail.create(email);
		const existingUser = await this.userRepository.findByEmail(emailVo);

		if (existingUser) {
			throw new ConflictException(`User with email ${email} already exists`);
		}

		const user = User.create({
			id: crypto.randomUUID(),
			props: { email: emailVo, password: await this.hasher.hash(password) }
		});
		await this.userRepository.save(user);

		const token = crypto.randomUUID();
		const refreshToken = RefreshToken.create({
			id: crypto.randomUUID(),
			props: {
				token,
				userId: user.id,
				userAgent: userAgent || 'Unknown',
				expiresAt: this.getRefreshTokenExpires()
			}
		});
		await this.refreshTokenRepository.upsert(refreshToken);

		const accessToken = await this.jwt.generateAccessToken({
			sub: user.id,
			email
		});

		return {
			accessToken,
			refreshToken: refreshToken.getProps().token
		};
	};

	login = async (command: LoginCommand) => {
		const { email, password, userAgent } = command;

		const emailVo = UserEmail.create(email);
		const existingUser = await this.userRepository.findByEmail(emailVo);

		if (
			!existingUser ||
			!(await this.hasher.verify(existingUser.getProps().password, password))
		) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const refreshToken = RefreshToken.create({
			id: crypto.randomUUID(),
			props: {
				token: crypto.randomUUID(),
				userId: existingUser.id,
				userAgent: userAgent || 'Unknown',
				expiresAt: this.getRefreshTokenExpires()
			}
		});
		await this.refreshTokenRepository.upsert(refreshToken);

		const accessToken = await this.jwt.generateAccessToken({
			sub: existingUser.id,
			email
		});

		return {
			accessToken,
			refreshToken: refreshToken.getProps().token
		};
	};

	refresh = async (command: RefreshCommand) => {
		const { token, userAgent } = command;

		if (!token) {
			throw new UnauthorizedException('Unauthorized');
		}

		const existingToken = await this.refreshTokenRepository.findByToken(token);

		if (!existingToken || existingToken.isExpired()) {
			throw new UnauthorizedException('Unauthorized');
		}

		const user = await this.userRepository.findById(
			existingToken.getProps().userId
		);

		const refreshToken = RefreshToken.create({
			id: crypto.randomUUID(),
			props: {
				token: crypto.randomUUID(),
				userId: user!.id,
				userAgent: userAgent || 'Unknown',
				expiresAt: this.getRefreshTokenExpires()
			}
		});
		await this.refreshTokenRepository.upsert(refreshToken);

		const accessToken = await this.jwt.generateAccessToken({
			sub: user!.id,
			email: user!.getProps().email.getValue()
		});

		return {
			accessToken,
			refreshToken: refreshToken.getProps().token
		};
	};

	logout = async (command: LogoutCommand) => {
		const { token, userAgent } = command;

		const refreshToken = await this.refreshTokenRepository.findByToken(token!);

		if (!refreshToken) {
			throw new UnauthorizedException('Unauthorized');
		}

		await this.refreshTokenRepository.delete(refreshToken.getProps().token);
	};

	private getRefreshTokenExpires = () => {
		return new Date(
			add(new Date(), { days: Number.parseInt(config.JWT_RT_EXPIRES) })
		);
	};
}
