import type { Request } from 'express';

export type TokenPair = {
	accessToken: string;
	refreshToken: string;
};

export type JwtPayload = {
	sub: string;
	email: string;
};

export type RequestWithUser = Request & {
	id: string;
	email: string;
};
