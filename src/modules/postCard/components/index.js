import React from 'react';
import { FaRegComment } from 'react-icons/fa';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import timeAgo from '@/common/utils/timeAgo';
import FavoritePostButtonComponent from '@/modules/postCard/components/favoritePostButton';
import style from '@/modules/postCard/styles/style.module.scss';

const PostCardComponent = ({ post }) => {
	return (
		<div className={`card shadow-sm ${style.post_card}`}>
			<div className="p-3">
				<div className="mb-2">
					<div className="d-flex align-items-center">
						<div className="me-1">
							<CustomLink
								href={`/u/${post.user.user_name}`}
								className="text-decoration-none d-inline-block d-flex align-items-center"
							>
								<CustomImage
									src={`${process.env.IMAGES_URL}/${post.user.avatar}`}
									className="rounded-circle h-100 w-100"
									width={33}
									height={33}
									alt={post.user.user_name}
									layout="fixed"
								/>
							</CustomLink>
						</div>
						<div className="lh-1">
							<div className="d-flex align-items-center">
								<CustomLink href={`/u/${post.user.user_name}`} className="text-decoration-none text-dark">
									{post.user.user_name}
								</CustomLink>
							</div>
							<span className="text-muted small">{timeAgo(post.created_at)}</span>
						</div>
					</div>
				</div>
				<div className={`${style.body_post_card}`}>
					<CustomLink
						href={`/u/${post.user.user_name}/${post.slug}`}
						className={`text-decoration-none text-dark card-title mb-2 d-block ${style.title_post_card}`}
					>
						<h5 className="fw-bold mb-0">{post.title}</h5>
					</CustomLink>
					<div className="mb-1">
						<p className="card-text mb-0 text-secondary">{post.excerpt}</p>
					</div>
					<div className={`mb-2 ${style.tags}`}>
						{post.tags.map((tag) => (
							<CustomLink
								href={`/t/${tag.slug}`}
								key={tag.id}
								onClick={(e) => e.stopPropagation()}
								className="p-1 text-decoration-none d-inline-block text-secondary"
							>
								<span className="text-muted">#</span>
								{tag.slug}
							</CustomLink>
						))}
					</div>
					<div className="d-flex justify-content-end align-items-center">
						<CustomLink
							href={`/u/${post.user.user_name}/${post.slug}#comment-post`}
							className="d-flex align-items-center text-decoration-none text-secondary me-2"
						>
							<FaRegComment className="me-1" />
							<span className="me-1">{post.total_comments}</span>
							<span className="d-none d-sm-block">comments</span>
						</CustomLink>
						<FavoritePostButtonComponent
							favorited={post.favorited}
							totalFavorited={post.total_favorited}
							slug={post.slug}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCardComponent;
