export class RegisterCommand {
	constructor(
		public readonly email: string,
		public readonly password: string
	) {}
}

export class LoginCommand extends RegisterCommand {}

export class RefreshCommand {
	constructor(
		public readonly refreshToken: string,
		public readonly userAgent: string
	) {}
}

export class LogoutCommand {
	constructor(
		public readonly refreshToken: string,
		public readonly userAgent: string
	) {}
}
