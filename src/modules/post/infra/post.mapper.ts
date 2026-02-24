import { Post as PostModel } from '@prisma/generated/client';

import { Post } from '@/modules/post/domain/post';

export const PostInfraMapper = {
	toDomain: ({ id, ...props }: PostModel) => {
		return Post.create(id, { ...props });
	},
	toPersistence: (post: Post) => {
		return post.getProps();
	}
};
