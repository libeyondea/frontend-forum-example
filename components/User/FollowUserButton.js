import React from 'react';

const FollowUserButton = ({ isUser, following, user_name, follow, unfollow }) => {
	if (isUser) {
		return null;
	}
	const handleClick = (e) => {
		e.preventDefault();
		following ? unfollow(user_name) : follow(user_name);
	};
	return (
		<button className={`btn btn-sm ${following ? 'btn-secondary' : 'btn-outline-secondary'}`} onClick={handleClick}>
			<i className="ion-plus-round" />
			&nbsp;
			{following ? 'Unfollow' : 'Follow'} {user_name}
		</button>
	);
};

export default FollowUserButton;
