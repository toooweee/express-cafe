import express, { NextFunction, Request, Response } from 'express';

import { successResponse } from '@/infra/helpers';
import { validateBody } from '@/infra/middlewares';
import { CreateUserCommand } from '@/modules/user/application/user.dto';
import { UserService } from '@/modules/user/application/user.service';
import {
	CreateUserDto,
	createUserSchema
} from '@/modules/user/presentation/user.dto';

export class UserController {
	path = '/users';
	router = express.Router();

	constructor(private readonly userService: UserService) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			this.path,
			validateBody(createUserSchema),
			this.createUser
		);
	}

	createUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body as CreateUserDto;
			const data = await this.userService.create(
				new CreateUserCommand(email, password)
			);
			return successResponse(res, data);
		} catch (error: unknown) {
			next(error);
		}
	};
}
