import { Post } from '@/modules/post/domain/post';

export const PostApplicationMapper = {
	toResponse: (post: Post) => {
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
