export class RegisterCommand {
	constructor(
		public readonly email: string,
		public readonly password: string,
		public readonly userAgent?: string
	) {}
}

export class LoginCommand extends RegisterCommand {}

export class RefreshCommand {
	constructor(
		public readonly token?: string,
		public readonly userAgent?: string
	) {}
}

export class LogoutCommand {
	constructor(
		public readonly token?: string,
		public readonly userAgent?: string
	) {}
}
