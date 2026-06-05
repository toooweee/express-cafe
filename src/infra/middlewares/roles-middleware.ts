import { NextFunction, Request, Response } from 'express';

import { RequestWithUser } from '@/modules/auth/types';

export const rolesMiddleware = (role: string) => {
	return function (req: Request, res: Response, next: NextFunction) {
		const userRole: RequestWithUser = req['user'];

		next();
	};
};
