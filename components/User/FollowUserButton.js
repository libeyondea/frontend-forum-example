import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

const FollowUserButton = ({ isUser, following, user_name, follow, unfollow }) => {
	const followUser = useSelector((state) => state.users.follow_user);
	const unFollowUser = useSelector((state) => state.users.unfollow_user);
	const currentUser = useSelector((state) => state.users.current_user);
	const router = useRouter();

	const handleClick = (e) => {
		e.preventDefault();
		if (currentUser.is_authenticated) {
			following ? unfollow(user_name) : follow(user_name);
		} else {
			router.push('/login');
		}
	};

	if (isUser) {
		return null;
	}

	return (
		<>
			{followUser.is_loading || unFollowUser.is_loading ? (
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

export default FollowUserButton;
