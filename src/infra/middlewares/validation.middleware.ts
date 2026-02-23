import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

const validate = (key: 'body' | 'query' | 'params') => {
	return function <T>(schema: ZodType<T>) {
		return async function (req: Request, res: Response, next: NextFunction) {
			try {
				req[key] = await schema.parseAsync(req[key]);
				next();
			} catch (error) {
				next(error);
			}
		};
	};
};

export const validateBody = validate('body');
export const validateParams = validate('params');
export const validateQuery = validate('query');
