import { JwtPayload } from '@/modules/auth/types';

export interface JwtPort {
	generateAccessToken(payload: JwtPayload): Promise<string>;
	verifyAccessToken(token: string): Promise<JwtPayload>;
}
