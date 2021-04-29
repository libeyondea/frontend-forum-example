import CustomImage from 'components/Common/CustomImage';
import CustomLink from 'components/Common/CustomLink';
import PostAction from 'components/Post/PostAction';
import React from 'react';

const PostMeta = ({ post }) => {
	if (!post) return null;
	return (
		<>
			<div className="user-post clearfix mb-4">
				<div className="float-left mr-2">
					<CustomLink
						href="/profile/[pid]"
						as={`/profile/${encodeURIComponent(post.user?.user_name)}`}
						className="text-decoration-none"
					>
						<CustomImage
							width="66"
							height="66"
							src={post.user?.avatar}
							className="img-fluid rounded-circle"
							alt={post.user?.user_name}
						/>
					</CustomLink>
				</div>
				<div className="float-left">
					<div className="card-block">
						<CustomLink
							href="/profile/[pid]"
							as={`/profile/${encodeURIComponent(post.user?.user_name)}`}
							className="text-decoration-none"
						>
							<h6 className="mb-0">{post.user?.user_name}</h6>
						</CustomLink>
						<div className="user mb-0">
							<small>Position: Anonymous</small>
						</div>
						<div className="time text-muted">
							<small>Posted on {new Date(post.created_at).toDateString()}</small>
						</div>
					</div>
				</div>
			</div>
			<PostAction post={post} />
		</>
	);
};

export default PostMeta;
