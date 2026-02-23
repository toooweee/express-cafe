export interface TokenRepositoryPort {
	upsert(): Promise<void>;
	findByToken(token: string): Promise<void>;
	delete(token: string): Promise<void>;
}
