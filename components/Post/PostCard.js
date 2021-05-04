import React from 'react';

import CustomImage from '@/components/Common/CustomImage';
import CustomLink from '@/components/Common/CustomLink';
import timeAgo from '@/lib/utils/timeAgo';

const PostCard = ({ post }) => {
	if (!post) return null;
	return (
		<div className="card card-post">
			<div className="p-3">
				<div className="card-block">
					<h5 className="card-title mb-1">
						<CustomLink href="/post/[pid]" as={`/post/${post.slug}`} className="text-decoration-none">
							{post.title}
						</CustomLink>
					</h5>
					<p className="card-text mb-2">{post.excerpt}</p>
				</div>
				<div className="clearfix">
					<div className="float-left">
						{post.tags.map((tag) => (
							<CustomLink
								href={`/tag/[pid]`}
								as={`/tag/${tag.slug}`}
								key={tag.id}
								onClick={(e) => e.stopPropagation()}
								className="badge badge-light p-2 mb-2 mr-2"
							>
								<span className="text-secondary">#</span>
								{tag.slug}
							</CustomLink>
						))}
					</div>
					<div className="float-right d-flex align-items-center">
						<small className="text-muted">{timeAgo(post.created_at)}</small>
						<div className=" ml-1">
							<CustomLink href="/profile/[pid]" as={`/profile/${post.user.user_name}`} className="text-decoration-none">
								<CustomImage height="35" src={post.user.avatar} className="rounded-circle" alt={post.user.user_name} />
							</CustomLink>
						</div>
						<CustomLink
							href="/profile/[pid]"
							as={`/profile/${post.user.user_name}`}
							className="text-decoration-none ml-1"
						>
							<span>{post.user.user_name}</span>
						</CustomLink>
					</div>
				</div>
				<div className="d-flex justify-content-end mt-2">
					<a href="#!" className="text-decoration-none text-secondary mr-2">
						<i className="fa fa-comment-o fa-sm" /> 666 comments
					</a>
					<a
						href="#!"
						className={`text-decoration-none ${false ? 'text-danger' : 'text-secondary'}`}
						onClick={() => handleClickFavorite(post.slug)}
					>
						<i className={`fa ${false ? 'fa-heart' : 'fa-heart-o'} fa-sm`} /> 666 likes
					</a>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
