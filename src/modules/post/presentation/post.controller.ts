import express, { NextFunction, Request, Response } from 'express';

import { successResponse } from '@/infra/helpers';
import { validateBody } from '@/infra/middlewares';
import { CreatePostCommand } from '@/modules/post/application/dto/create-post.dto';
import { PostService } from '@/modules/post/application/post.service';
import {
	CreatePostDto,
	createPostSchema
} from '@/modules/post/presentation/dto';

export class PostController {
	path = '/posts';
	router = express.Router();

	constructor(private readonly postService: PostService) {
		this.initializeRoutes();
	}

	private initializeRoutes = () => {
		this.router.post(this.path, validateBody(createPostSchema), this.create);
	};

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { title, description, tags, userId }: CreatePostDto = req.body;

			successResponse(
				res,
				await this.postService.create(
					new CreatePostCommand(title, description, tags, userId)
				)
			);
		} catch (error: unknown) {
			next(error);
		}
	};
}
