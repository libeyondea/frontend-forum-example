import React from 'react';

import CustomLink from '@/common/components/CustomLink/components';
import useUser from '@/common/hooks/useUser';

const PostActionComponent = ({ userName, postSlug }) => {
	const { user } = useUser();

	return (
		<>
			{user && user.user_name === userName && (
				<div className="mb-3">
					<CustomLink href={`/u/${userName}/${postSlug}/edit`} className="btn btn-outline-secondary btn-sm">
						<i className="ion-edit" /> Edit Post
					</CustomLink>
				</div>
			)}
		</>
	);
};

export default PostActionComponent;
