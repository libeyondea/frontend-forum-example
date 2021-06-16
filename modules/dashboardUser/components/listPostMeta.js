import { useRouter } from 'next/router';
import React, { useState } from 'react';

import CustomLink from '@/common/components/CustomLink/components';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const ListPostMetaComponent = ({ postSlug, userName }) => {
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);

	const onDeletePostClick = async (e) => {
		e.preventDefault();
		try {
			if (window.confirm('Do you want to delete?')) {
				setLoading(true);
				const response = await httpRequest.delete({
					url: `posts/${postSlug}`,
					token: getCookie('token')
				});
				if (response.data.success) {
					showToast.success('Delete post success');
					router.replace('/dashboard');
				}
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
				<button type="submit" className="btn btn-outline-danger btn-sm mr-1" disabled>
					<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
					Delete
				</button>
			) : (
				<button type="submit" className="btn btn-outline-danger btn-sm mr-1" onClick={onDeletePostClick}>
					Delete
				</button>
			)}
			<CustomLink href={`/u/${userName}/${postSlug}/edit`} className="btn btn-outline-dark btn-sm">
				<i className="ion-edit" /> Edit
			</CustomLink>
		</>
	);
};

export default ListPostMetaComponent;
