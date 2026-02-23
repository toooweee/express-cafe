import { CreatePostDto } from '@/modules/post/application/dto/create-post.dto';
import { PostApplicationMapper } from '@/modules/post/application/post.mapper';
import { PostRepositoryPort } from '@/modules/post/application/post.repository.port';
import { Post } from '@/modules/post/domain/post';

export class PostService {
	constructor(private readonly postRepository: PostRepositoryPort) {}

	async create(dto: CreatePostDto) {
		const id = crypto.randomUUID();
		const post = Post.create(id, { ...dto });
		await this.postRepository.save(post);
		return PostApplicationMapper.toResponse(post);
	}
}
