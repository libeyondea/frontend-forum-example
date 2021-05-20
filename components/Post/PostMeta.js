import React from 'react';

import CustomImage from '@/components/Common/CustomImage';
import CustomLink from '@/components/Common/CustomLink';
import PostAction from '@/components/Post/PostAction';

const PostMeta = ({ singlePost }) => {
	return (
		<>
			<div className="user-post clearfix mb-4">
				<div className="float-left mr-2">
					<CustomLink
						href="/users/[pid]"
						as={`/users/${encodeURIComponent(singlePost.data.user?.user_name)}`}
						className="text-decoration-none d-inline-block"
					>
						<CustomImage
							width="60"
							height="60"
							src={`${process.env.IMAGES_URL}/${singlePost.data.user?.avatar}`}
							className="img-fluid rounded-circle"
							alt={singlePost.data.user?.user_name}
						/>
					</CustomLink>
				</div>
				<div className="float-left">
					<div className="card-block">
						<CustomLink
							href="/users/[pid]"
							as={`/users/${encodeURIComponent(singlePost.data.user?.user_name)}`}
							className="text-decoration-none"
						>
							<h6 className="mb-0">{singlePost.data.user?.user_name}</h6>
						</CustomLink>
						<div className="user mb-0">
							<small>Position: Anonymous</small>
						</div>
						<div className="time text-muted">
							<small>Posted on {new Date(singlePost.data.created_at).toDateString()}</small>
						</div>
					</div>
				</div>
			</div>
			<PostAction userName={singlePost.data.user?.user_name} slug={singlePost.data.slug} />
		</>
	);
};

export default PostMeta;
