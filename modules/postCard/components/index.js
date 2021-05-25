import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import timeAgo from '@/common/utils/timeAgo';
import style from '@/modules/postCard/styles/style.module.scss';

const PostCardComponent = ({ post }) => {
	if (!post) return null;
	return (
		<div className={`card ${style.post_card}`}>
			<div className="p-3">
				<div className="mb-2">
					<div className="d-flex align-items-center">
						<div className="mr-1">
							<CustomLink
								href="/users/[pid]"
								as={`/users/${post.user.user_name}`}
								className="text-decoration-none d-inline-block d-flex align-items-center"
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
						<div className="lh-100">
							<div className="d-flex align-items-center">
								<CustomLink
									href="/users/[pid]"
									as={`/users/${post.user.user_name}`}
									className="text-decoration-none text-dark"
								>
									{post.user.user_name}
								</CustomLink>
							</div>
							<span className="text-muted small">{timeAgo(post.created_at)}</span>
						</div>
					</div>
				</div>
				<div className={`${style.body_post_card}`}>
					<CustomLink
						href="/posts/[pid]"
						as={`/posts/${post.slug}`}
						className={`text-decoration-none text-dark card-title mb-2 d-block ${style.title_post_card}`}
					>
						<h5 className="font-weight-bold mb-0">{post.title}</h5>
					</CustomLink>
					<div className="mb-1">
						<p className="card-text mb-0">{post.excerpt}</p>
					</div>
					<div className={`mb-2 ${style.tags}`}>
						{post.tags.map((tag) => (
							<CustomLink
								href={`/tags/[pid]`}
								as={`/tags/${tag.slug}`}
								key={tag.id}
								onClick={(e) => e.stopPropagation()}
								className="p-1 text-decoration-none d-inline-block text-secondary"
							>
								<span className="text-muted">#</span>
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
						<a href="#!" className={`text-decoration-none ${false ? 'text-danger' : 'text-secondary'}`}>
							<i className={`fa ${false ? 'fa-heart' : 'fa-heart-o'} fa-sm`} /> 666 likes
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCardComponent;
