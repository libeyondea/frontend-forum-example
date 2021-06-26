import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { mutate } from 'swr';

import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const FollowTagButtonComponent = ({ following, slug }) => {
	const { user } = useUser();
	const router = useRouter();
	const [isFollow, setFollow] = useState(following);
	const [isLoading, setLoading] = useState(false);

	const onFollowTagClick = async (e) => {
		e.preventDefault();
		try {
			if (!user) {
				router.push('/login');
			} else {
				setLoading(true);
				const response = isFollow
					? await httpRequest.delete({
							url: `/follow_tag`,
							params: {
								slug: slug
							},
							token: getCookie('token')
					  })
					: await httpRequest.post({
							url: `/follow_tag`,
							data: {
								slug: slug
							},
							token: getCookie('token')
					  });
				if (response.data.success) {
					showToast.success(`${!isFollow ? 'Follow' : 'Unfollow'}`);
					setFollow(!isFollow);
					mutate(`/tags_followed?offset=0&limit=${process.env.LIMIT_PAGE.LIST_TAG_FOLLOWED}`);
				}
			}
		} catch (error) {
			console.log(error);
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
					onClick={onFollowTagClick}
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

export default FollowTagButtonComponent;
