import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

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
				<button
					className={`d-flex align-items-center btn btn-sm ${isFollow ? 'btn-secondary' : 'btn-outline-secondary'}`}
					disabled
				>
					<span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
					{isFollow ? (
						<>
							<FaMinus className="me-1" /> UnFollow
						</>
					) : (
						<>
							<FaPlus className="me-1" /> Follow
						</>
					)}
				</button>
			) : (
				<button
					className={`d-flex align-items-center btn btn-sm ${isFollow ? 'btn-secondary' : 'btn-outline-secondary'}`}
					onClick={onFollowUserClick}
				>
					{isFollow ? (
						<>
							<FaMinus className="me-1" /> UnFollow
						</>
					) : (
						<>
							<FaPlus className="me-1" /> Follow
						</>
					)}
				</button>
			)}
		</>
	);
};

export default FollowUserButtonComponent;
