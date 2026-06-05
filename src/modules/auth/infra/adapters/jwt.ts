import jwt from 'jsonwebtoken';

import { config } from '@/infra/helpers';
import { JwtPort } from '@/modules/auth/application/ports';
import { JwtPayload } from '@/modules/auth/types';

export class Jwt implements JwtPort {
	async generateAccessToken(payload: JwtPayload) {
		return jwt.sign(payload, config.JWT_SECRET, {
			expiresIn: config.JWT_AT_EXPIRES as never
		});
	}

	async verifyAccessToken(token: string) {
		return jwt.verify(token, config.JWT_SECRET, {
			ignoreExpiration: false
		}) as JwtPayload;
	}
}
