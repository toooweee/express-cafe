import express, { NextFunction, Request, Response } from 'express';

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
			const result = await this.userService.create(req.body);
			return res.status(200).json(result);
		} catch (e) {
			next(e);
		}
	};
}
