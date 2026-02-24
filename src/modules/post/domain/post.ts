import { AggregateId, CreateEntityProps, Entity } from '@/libs/ddd';

type PostProps = {
	title: string;
	description: string;
	tags: string[];
	userId: AggregateId;
};

export class Post extends Entity<PostProps> {
	private constructor(props: CreateEntityProps<PostProps>) {
		super(props);
	}

	static create(props: CreateEntityProps<PostProps>) {
		return new Post(props);
	}
}
