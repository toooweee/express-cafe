import { ValueObject } from '@/libs/ddd';

export class Email extends ValueObject<string> {
	static create(value: string) {
		return new Email({ value });
	}
}
