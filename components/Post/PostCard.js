import React from 'react';

import CustomImage from '@/components/Common/CustomImage';
import CustomLink from '@/components/Common/CustomLink';
import timeAgo from '@/lib/utils/timeAgo';

const PostCard = ({ post }) => {
	if (!post) return null;
	return (
		<div className="card card-post">
			<div className="p-3">
				<div className="user-meta mb-2">
					<div className="d-flex align-items-center">
						<div className="mr-1">
							<CustomLink
								href="/users/[pid]"
								as={`/users/${post.user.user_name}`}
								className="text-decoration-none d-inline-block"
							>
								<CustomImage
									src={`${process.env.IMAGES_URL}/${post.user.avatar}`}
									className="rounded-circle h-100 w-100"
									width={35}
									height={35}
									alt={post.user.user_name}
								/>
							</CustomLink>
						</div>
						<div>
							<p className="mb-0">
								<CustomLink href="/users/[pid]" as={`/users/${post.user.user_name}`} className="text-decoration-none">
									{post.user.user_name}
								</CustomLink>
							</p>
							<small className="text-muted">{timeAgo(post.created_at)}</small>
						</div>
					</div>
				</div>
				<div className="body-card-post">
					<h5 className="card-title mb-2">
						<CustomLink href="/posts/[pid]" as={`/posts/${post.slug}`} className="text-decoration-none">
							{post.title}
						</CustomLink>
					</h5>
					<div className="mb-1">
						<p className="card-text mb-0">{post.excerpt}</p>
					</div>
					<div className="tags mb-2">
						{post.tags.map((tag) => (
							<CustomLink
								href={`/tags/[pid]`}
								as={`/tags/${tag.slug}`}
								key={tag.id}
								onClick={(e) => e.stopPropagation()}
								className="custom-tag p-1 text-decoration-none"
							>
								<span>#</span>
								{tag.slug}
							</CustomLink>
						))}
					</div>
					<div className="d-flex justify-content-end">
						<CustomLink
							href="/posts/[pid]#comment-post"
							as={`/posts/${post.slug}#comment-post`}
							className="text-decoration-none text-secondary mr-2"
						>
							<i className="fa fa-comment-o fa-sm" /> {post.total_comments} comments
						</CustomLink>
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
		</div>
	);
};

export default PostCard;
