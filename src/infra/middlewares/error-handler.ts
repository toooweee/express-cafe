import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { errorResponse } from '@/infra/helpers';
import { logger } from '@/infra/utils';

export const errorHandler = (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof ZodError) {
		return res.status(400).json({
			message: 'Bad Request',
			error: err.issues[0]?.message
		});
	}

	logger.error(err);

	errorResponse(res, 500, 'Internal Server Error');
};
