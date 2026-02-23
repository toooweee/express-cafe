import express, { NextFunction, Request, Response } from 'express';

import { successResponse } from '@/infra/helpers';
import { UserService } from '@/modules/user/application/user.service';

export class UserController {
	path = '/users';
	router = express.Router();

	constructor(private readonly userService: UserService) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(this.path, this.createUser);
	}

	createUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await this.userService.create(req.body);
			return successResponse(res, data);
		} catch (error: unknown) {
			next(error);
		}
	};
}
