export abstract class ApplicationError extends Error {
	abstract statusCode: number;

	constructor(public readonly message: string) {
		super();
	}
}

export class BadRequestException extends ApplicationError {
	statusCode = 400;
}

export class NotFoundException extends ApplicationError {
	statusCode = 404;
}

export class ConflictException extends ApplicationError {
	statusCode = 409;
}

export class UnauthorizedException extends ApplicationError {
	statusCode = 401;
}

export class ForbiddenException extends ApplicationError {
	statusCode = 403;
}
