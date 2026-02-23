import { CreateEntityProps, Entity } from '@/libs/ddd';

type PostProps = {
	title: string;
	description: string;
	tags: string[];
	userId: string;
};

export class Post extends Entity<PostProps> {
	private constructor(props: CreateEntityProps<PostProps>) {
		super(props);
	}

	static create(id: string, props: PostProps) {
		return new Post({ id, props });
	}
}
