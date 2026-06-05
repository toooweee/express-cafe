import express, { NextFunction, Request, Response } from 'express';

import { successResponse } from '@/infra/helpers';
import { validateBody } from '@/infra/middlewares';
import { AuthService } from '@/modules/auth/application/auth.service';
import {
	LoginCommand,
	LogoutCommand,
	RefreshCommand,
	RegisterCommand
} from '@/modules/auth/application/dto';
import {
	LoginDto,
	loginSchema,
	RegisterDto,
	registerSchema
} from '@/modules/auth/presentation/dto';

export class AuthController {
	path = '/auth';
	router = express.Router();

	constructor(private readonly authService: AuthService) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			`${this.path}/register`,
			validateBody(registerSchema),
			this.register
		);
		this.router.post(
			`${this.path}/login`,
			validateBody(loginSchema),
			this.login
		);
		this.router.get(`${this.path}/refresh`, this.refresh);
		this.router.get(`${this.path}/logout`, this.logout);
	}

	register = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password }: RegisterDto = req.body;
			const userAgent = req.headers['user-agent'];
			const data = await this.authService.register(
				new RegisterCommand(email, password, userAgent)
			);
			res.cookie('REFRESH_TOKEN', data.refreshToken, {
				httpOnly: true,
				secure: false,
				sameSite: 'strict',
				maxAge: 30 * 24 * 60 * 60 * 1000
			});
			successResponse(res, { accessToken: data.accessToken });
		} catch (error) {
			next(error);
		}
	};

	login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password }: LoginDto = req.body;
			const userAgent = req.headers['user-agent'];
			const data = await this.authService.login(
				new LoginCommand(email, password, userAgent)
			);
			res.cookie('REFRESH_TOKEN', data.refreshToken, {
				httpOnly: true,
				secure: false,
				sameSite: 'strict',
				maxAge: 30 * 24 * 60 * 60 * 1000
			});
			successResponse(res, { accessToken: data.accessToken });
		} catch (error: unknown) {
			next(error);
		}
	};

	refresh = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const refreshToken: string | undefined = req.cookies['REFRESH_TOKEN'];
			const userAgent = req.headers['user-agent'];
			const data = await this.authService.refresh(
				new RefreshCommand(refreshToken, userAgent)
			);
			res.cookie('REFRESH_TOKEN', data.refreshToken, {
				httpOnly: true,
				secure: false,
				sameSite: 'strict',
				maxAge: 30 * 24 * 60 * 60 * 1000
			});
			successResponse(res, { accessToken: data.accessToken });
		} catch (error: unknown) {
			next(error);
		}
	};

	logout = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const refreshToken: string | undefined = req.cookies['REFRESH_TOKEN'];

			if (!refreshToken) {
				successResponse(res, null);
			}

			const userAgent = req.headers['user-agent'];
			await this.authService.logout(new LogoutCommand(refreshToken, userAgent));

			successResponse(res, null);
		} catch (error: unknown) {
			next(error);
		}
	};
}
