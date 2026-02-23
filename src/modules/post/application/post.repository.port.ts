import { AggregateId } from '@/libs/ddd';
import { Post } from '@/modules/post/domain/post';

export interface PostRepositoryPort {
	save(post: Post): Promise<Post>;
	findOne(id: AggregateId): Promise<Post | null>;
	findAll(): Promise<Post[]>;
}
