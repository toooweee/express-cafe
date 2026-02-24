export class CreatePostCommand {
	constructor(
		public readonly title: string,
		public readonly description: string,
		public readonly tags: string[],
		public readonly userId: string
	) {}
}
