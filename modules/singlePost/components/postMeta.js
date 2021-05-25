import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';

const PostMetaComponent = ({ singlePost }) => {
	return (
		<div className="mb-3">
			<div className="d-flex justify-content-start align-items-center flex-wrap">
				<CustomLink
					href={`/users/${singlePost.data.user?.user_name}`}
					className="text-decoration-none d-inline-block d-flex align-items-center text-dark font-weight-bold"
				>
					<CustomImage
						width="40"
						height="40"
						src={`${process.env.IMAGES_URL}/${singlePost.data.user?.avatar}`}
						className="img-fluid rounded-circle"
						alt={singlePost.data.user?.user_name}
					/>
					<span className="ml-2">{singlePost.data.user?.user_name}</span>
				</CustomLink>
				<span className="text-muted ml-1 small">・{new Date(singlePost.data.created_at).toDateString()}</span>
			</div>
		</div>
	);
};

export default PostMetaComponent;
