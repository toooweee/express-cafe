import { PrismaClient } from '@/generated/prisma/client';
import { AggregateId } from '@/libs/ddd';
import { PostRepositoryPort } from '@/modules/post/application/post.repository.port';
import { Post } from '@/modules/post/domain/post';
import { PostInfraMapper } from '@/modules/post/infra/post.mapper';

export class PostPrismaRepository implements PostRepositoryPort {
	constructor(private readonly prisma: PrismaClient) {}

	async save(post: Post) {
		const persistence = PostInfraMapper.toPersistence(post);

		const saved = await this.prisma.post.create({
			data: {
				...persistence
			}
		});

		return PostInfraMapper.toDomain(saved);
	}

	async findOne(id: AggregateId) {
		const post = await this.prisma.post.findUnique({
			where: {
				id
			}
		});

		return post ? PostInfraMapper.toDomain(post) : null;
	}

	async findAll() {
		const posts = await this.prisma.post.findMany();

		return posts.map((post) => {
			return PostInfraMapper.toDomain(post);
		});
	}
}
