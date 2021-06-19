import { useRouter } from 'next/router';
import React, { useState } from 'react';

import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const FollowUserButtonComponent = ({ following, user_name }) => {
	const { user } = useUser();
	const router = useRouter();
	const [isFollow, setFollow] = useState(following);
	const [isLoading, setLoading] = useState(false);

	const onFollowUserClick = async (e) => {
		e.preventDefault();
		try {
			if (!user) {
				router.push('/login');
				return;
			}
			setLoading(true);
			const response = isFollow
				? await httpRequest.delete({
						url: `/follow_user`,
						token: getCookie('token'),
						params: {
							user_name: user_name
						}
				  })
				: await httpRequest.post({
						url: `/follow_user`,
						token: getCookie('token'),
						data: {
							user_name: user_name
						}
				  });
			if (response.data.success) {
				showToast.success(`${!isFollow ? 'Follow' : 'Unfollow'}`);
				setFollow(!isFollow);
			}
		} catch (error) {
			showToast.error();
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{isLoading ? (
				<button className={`btn btn-sm ${isFollow ? 'btn-secondary' : 'btn-outline-secondary'}`} disabled>
					<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
					{isFollow ? (
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
				<button
					className={`btn btn-sm ${isFollow ? 'btn-secondary' : 'btn-outline-secondary'}`}
					onClick={onFollowUserClick}
				>
					{isFollow ? (
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

export default FollowUserButtonComponent;
