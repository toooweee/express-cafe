import express, { NextFunction, Request, Response } from 'express';

import { PostService } from '@/modules/post/application/post.service';

export class PostController {
	path = '/posts';
	router = express.Router();

	constructor(private readonly postService: PostService) {
		this.initializeRoutes();
	}

	private initializeRoutes = () => {
		this.router.post(this.path, this.create);
	};

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
		} catch (error: unknown) {
			next(error);
		}
	};
}
