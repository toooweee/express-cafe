import * as argon from 'argon2';

import { HasherPort } from '@/modules/auth/application/ports/hasher.port';

export class Hasher implements HasherPort {
	async hash(password: string) {
		return argon.hash(password);
	}

	async verify(hash: string, password: string) {
		return argon.verify(hash, password);
	}
}
