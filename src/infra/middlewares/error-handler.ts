import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import {
	ApplicationError,
	BadRequestException,
	errorResponse
} from '@/infra/helpers';
import { logger } from '@/infra/utils';

export const errorHandler = (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof ZodError) {
		return res.status(400).json({
			message: err.issues[0]?.message,
			statusCode: 400
		});
	}

	if (err instanceof ApplicationError) {
		return errorResponse(res, err.statusCode, err.message);
	}

	logger.error(err);

	return errorResponse(res, 500, 'Internal Server Error');
};
