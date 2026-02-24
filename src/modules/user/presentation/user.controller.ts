import express, { NextFunction, Request, Response } from 'express';

import { successResponse } from '@/infra/helpers';
import {
	validateBody,
	validateParams,
	validateQuery
} from '@/infra/middlewares';
import { CreateUserCommand } from '@/modules/user/application/user.dto';
import { UserService } from '@/modules/user/application/user.service';
import {
	CreateUserDto,
	createUserSchema,
	FindByIdParamDto,
	findByIdParamSchema,
	FindUserQueryDto,
	findUserQuerySchema
} from '@/modules/user/presentation/user.dto';

export class UserController {
	path = '/users';
	router = express.Router();

	constructor(private readonly userService: UserService) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(this.path, validateBody(createUserSchema), this.create);
		this.router.get(this.path, this.findAll);
		this.router.get(
			`${this.path}/:userId`,
			validateParams(findByIdParamSchema),
			this.findById
		);
		this.router.get(
			`${this.path}/query`,
			validateQuery(findUserQuerySchema),
			this.findByQuery
		);
	}

	create = async (req: Request, res: Response, next: NextFunction) => {
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

	findAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = await this.userService.findAll();
			return successResponse(res, data);
		} catch (error: unknown) {
			next(error);
		}
	};

	findById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = req.params as FindByIdParamDto;
			const data = await this.userService.findById(userId);
			return successResponse(res, data);
		} catch (error: unknown) {
			next(error);
		}
	};

	findByQuery = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userEmail, userId } = req.query as FindUserQueryDto;

			if (userEmail) {
				const data = await this.userService.findByEmail(userEmail);
				return successResponse(res, data);
			}

			if (userId) {
				const data = await this.userService.findById(userId);
				return successResponse(res, data);
			}
		} catch (error) {
			next(error);
		}
	};
}
