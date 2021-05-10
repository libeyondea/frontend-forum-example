import React from 'react';
import { useDispatch } from 'react-redux';

import CustomLink from '@/components/Common/CustomLink';
import FollowTagButton from '@/components/User/FollowTagButton';
import { followTagRequestedAction, unFollowTagRequestedAction } from '@/redux/actions/tagAction';

const TagCard = ({ tag }) => {
	const dispatch = useDispatch();
	if (!tag) return null;

	const handleFollow = () => {
		dispatch(followTagRequestedAction(tag.slug));
	};

	const handleUnfollow = () => {
		dispatch(unFollowTagRequestedAction(tag.slug));
	};
	return (
		<div className="card card-post">
			<div className="p-3">
				<div className="card-block">
					<h5 className="card-title mb-1">
						<CustomLink href="/tags/[pid]" as={`/tags/${tag.slug}`} className="text-decoration-none">
							<span className="text-secondary">#</span>
							{tag.title}
						</CustomLink>
					</h5>
					<p className="card-text">{tag.content}</p>
				</div>
				<small className="text-muted">{tag.total_posts} posts published</small>
				<div className="d-flex justify-content-end mt-2">
					<FollowTagButton
						slug={tag?.slug}
						following={tag?.following}
						follow={handleFollow}
						unfollow={handleUnfollow}
					/>
				</div>
			</div>
		</div>
	);
};

export default TagCard;
