import React from 'react';
import { useSelector } from 'react-redux';

import CustomLink from '@/components/Common/CustomLink';

const PostAction = ({ post }) => {
	const login = useSelector((state) => state.users.login);
	return (
		<>
			{login.is_authenticated && login.user?.user_name === post.user?.user_name && (
				<div className="mb-3">
					<CustomLink
						href="/post/[pid]/edit"
						as={`/post/${post.slug}/edit`}
						className="btn btn-outline-secondary btn-sm mr-2"
					>
						<i className="ion-edit" /> Edit Post
					</CustomLink>
					<button className="btn btn-outline-danger btn-sm">
						<i className="ion-trash-a" /> Delete Post
					</button>
				</div>
			)}
		</>
	);
};

export default PostAction;
