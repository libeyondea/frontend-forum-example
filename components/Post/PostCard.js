import React from 'react';
import CustomLink from 'components/Common/CustomLink';
import CustomImage from 'components/Common/CustomImage';

const PostCard = ({ post }) => {
	if (!post) return null;
	return (
		<div className="card pr-3">
			<div className="row no-gutters">
				<div className="col-3 col-sm-2">
					<CustomLink href="/post/[pid]" as={`/post/${post.slug}`} className="text-decoration-none">
						<CustomImage src={post.image} className="img-fluid rounded" alt={post.title} />
					</CustomLink>
				</div>
				<div className="col-9 col-sm-10">
					<div className="card-block pl-2 mt-2">
						<h5 className="card-title mb-1 mt-1">
							<CustomLink href="/post/[pid]" as={`/post/${post.slug}`} className="text-decoration-none">
								{post.title}
							</CustomLink>
						</h5>
						<p className="card-text mb-2">{post.excerpt}</p>
					</div>
					<div className="clearfix">
						<div className="float-left pl-2">
							{post.tags.map((tag) => (
								<CustomLink
									href={`/tag/[pid]`}
									as={`/tag/${tag.slug}`}
									key={tag.id}
									onClick={(e) => e.stopPropagation()}
									className="badge badge-light p-2 mb-2 mr-2"
								>
									<span>{tag.slug}</span>
								</CustomLink>
							))}
						</div>
						<div className="float-right pl-2">
							<small className="text-muted">{new Date(post.created_at).toDateString()}</small>
							<CustomLink
								href="/profile/[pid]"
								as={`/profile/${post.user.user_name}`}
								className="text-decoration-none ml-1"
							>
								<span>{post.user.user_name}</span>
							</CustomLink>
						</div>
					</div>
					<div className="d-flex justify-content-end mb-3">
						<a
							href="#!"
							className={`text-decoration-none ${post.favorited ? 'text-danger' : 'text-secondary'}`}
							onClick={() => handleClickFavorite(post.slug)}
						>
							<i className={`fa ${post.favorited ? 'fa-heart' : 'fa-heart-o'} fa-lg`} /> {post.favoritesCount}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
