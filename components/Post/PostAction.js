import React from 'react';

import CustomLink from '@/components/Common/CustomLink';
import useUser from '@/lib/hooks/useUser';

const PostAction = ({ userName, slug }) => {
	const { user } = useUser();

	return (
		<>
			{user && user.user_name === userName && (
				<div className="mb-3">
					<CustomLink href={`/posts/${slug}/edit`} className="btn btn-outline-secondary btn-sm mr-2">
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
