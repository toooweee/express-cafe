import { RefreshToken } from '@/modules/auth/domain/refresh-token';

export interface RefreshTokenRepositoryPort {
	upsert(token: RefreshToken): Promise<RefreshToken>;
	findByToken(token: string): Promise<RefreshToken | null>;
	delete(token: string): Promise<void>;
}
