import { Post as PostModel } from '@prisma/generated/client';

import { Post } from '@/modules/post/domain/post';

export const PostInfraMapper = {
	toDomain: ({ id, createdAt, updatedAt, ...props }: PostModel) => {
		return Post.create({
			id,
			props,
			createdAt,
			updatedAt
		});
	},
	toPersistence: (post: Post) => {
		const props = post.getProps();

		return {
			id: props.id,
			title: props.title,
			description: props.description,
			tags: props.tags,
			userId: props.userId,
			createdAt: props.createdAt
		};
	}
};
