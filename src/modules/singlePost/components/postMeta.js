import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import timeFormat from '@/common/utils/timeFormat';

const PostMetaComponent = ({ singlePost }) => {
	return (
		<div className="mb-3">
			<div className="d-flex justify-content-start align-items-center flex-wrap">
				<CustomLink
					href={`/u/${singlePost.data.user?.user_name}`}
					className="text-decoration-none d-inline-block d-flex align-items-center text-dark fw-bold me-3"
				>
					<CustomImage
						width="40"
						height="40"
						src={`${process.env.IMAGES_URL}/${singlePost.data.user?.avatar}`}
						className="rounded-circle"
						alt={singlePost.data.user?.user_name}
						layout="fixed"
					/>
					<span className="ms-2">{singlePost.data.user?.user_name}</span>
				</CustomLink>
				<span className="text-secondary">
					<time dateTime={singlePost.data.created_at}>{timeFormat(singlePost.data.created_at)}</time>
					{singlePost.data.updated_at > singlePost.data.created_at && (
						<em>
							{` `}• Updated on{' '}
							<time dateTime={singlePost.data.updated_at}>{timeFormat(singlePost.data.updated_at)}</time>
						</em>
					)}
				</span>
			</div>
		</div>
	);
};

export default PostMetaComponent;
