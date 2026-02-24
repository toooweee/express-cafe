import { Token } from '@/modules/auth/domain/token';

export interface RefreshTokenRepositoryPort {
	upsert(token: Token): Promise<Token>;
	findByToken(token: string): Promise<Token | null>;
	delete(token: string): Promise<void>;
}
