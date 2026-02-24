import express, { NextFunction, Request, Response } from 'express';

import { successResponse } from '@/infra/helpers';
import { validateBody } from '@/infra/middlewares';
import { AuthService } from '@/modules/auth/application/auth.service';
import {
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
			const dto: RegisterDto = req.body;
			successResponse(res, dto);
		} catch (error) {
			next(error);
		}
	};
	login = (req: Request, res: Response, next: NextFunction) => {};
	refresh = (req: Request, res: Response, next: NextFunction) => {};
	logout = (req: Request, res: Response, next: NextFunction) => {};
}
