import { useRouter } from 'next/router';
import React, { useState } from 'react';

import CustomLink from '@/common/components/CustomLink/components';
import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const PostActionComponent = ({ userName, postSlug }) => {
	const router = useRouter();
	const { user } = useUser();
	const [isLoading, setLoading] = useState(false);

	const onDeletePostClick = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await httpRequest.delete({
				url: `posts/${postSlug}`,
				token: getCookie('token')
			});
			if (response.data.success) {
				showToast.success('Delete post success');
				router.push('/');
			}
		} catch (error) {
			console.log(error.response);
			showToast.error();
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			{user && user.user_name === userName && (
				<div className="mb-3">
					<CustomLink href={`/posts/${postSlug}/edit`} className="btn btn-outline-secondary btn-sm mr-2">
						<i className="ion-edit" /> Edit Post
					</CustomLink>
					{isLoading ? (
						<button type="submit" className="btn btn-outline-danger btn-sm" disabled>
							<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
							Delete Post
						</button>
					) : (
						<button type="submit" className="btn btn-outline-danger btn-sm" onClick={onDeletePostClick}>
							Delete Post
						</button>
					)}
				</div>
			)}
		</>
	);
};

export default PostActionComponent;
