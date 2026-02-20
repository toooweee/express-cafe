import type { NextFunction, Request, Response } from 'express';

import { errorResponse } from '@/infra/helpers';
import { logger } from '@/infra/utils';

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.error(err);
	errorResponse(res, 500, err);
};
