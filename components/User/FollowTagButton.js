import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

const FollowTagButton = ({ following, slug, follow, unfollow }) => {
	const followTag = useSelector((state) => state.tags.follow_tag);
	const unFollowTag = useSelector((state) => state.tags.unfollow_tag);
	const currentUser = useSelector((state) => state.users.current_user);
	const router = useRouter();

	const handleClick = (e) => {
		e.preventDefault();
		if (currentUser.is_authenticated) {
			following ? unfollow(slug) : follow(slug);
		} else {
			router.push('/login');
		}
	};

	return (
		<>
			{followTag.is_loading || unFollowTag.is_loading ? (
				<button className={`btn btn-sm ${following ? 'btn-secondary' : 'btn-outline-secondary'}`} disabled>
					<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
					{following ? (
						<>
							<i className="fa fa-minus" /> UnFollow
						</>
					) : (
						<>
							<i className="fa fa-plus" /> Follow
						</>
					)}
				</button>
			) : (
				<button className={`btn btn-sm ${following ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={handleClick}>
					{following ? (
						<>
							<i className="fa fa-minus" /> UnFollow
						</>
					) : (
						<>
							<i className="fa fa-plus" /> Follow
						</>
					)}
				</button>
			)}
		</>
	);
};

export default FollowTagButton;
