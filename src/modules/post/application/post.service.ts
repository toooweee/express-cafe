import { CreatePostCommand } from '@/modules/post/application/dto/create-post.dto';
import { PostApplicationMapper } from '@/modules/post/application/post.mapper';
import { PostRepositoryPort } from '@/modules/post/application/post.repository.port';
import { Post } from '@/modules/post/domain/post';

export class PostService {
	constructor(private readonly postRepository: PostRepositoryPort) {}

	async create(command: CreatePostCommand) {
		const id = crypto.randomUUID();
		const post = Post.create({ id, props: { ...command } });
		await this.postRepository.save(post);
		return PostApplicationMapper.toResponse(post);
	}
}
