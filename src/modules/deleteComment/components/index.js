import { useRouter } from 'next/router';
import React, { useState } from 'react';

import CustomLink from '@/common/components/CustomLink/components';
import LoadingSpinnerComponent from '@/common/components/LoadingSpinner/components';
import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const DeleteCommentComponent = ({ deleteComment }) => {
	const router = useRouter();
	const { user } = useUser();
	const [isLoading, setLoading] = useState(false);

	const onDeleteCommentClicked = async (e) => {
		e.preventDefault();
		try {
			if (window.confirm('Do you want to delete?')) {
				setLoading(true);
				const response = await httpRequest.delete({
					url: `/comments/${deleteComment.data.slug}`,
					token: getCookie('token'),
					params: {
						post_slug: deleteComment.data.post.slug
					}
				});
				if (response.data.success) {
					showToast.success(`Delete comment success`);
					router.push(`/u/${deleteComment.data.post.user.user_name}/${deleteComment.data.post.slug}`);
				}
			}
		} catch (error) {
			showToast.warn('Delete comment error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container-xl my-4">
			{!user ? (
				<LoadingSpinnerComponent />
			) : (
				<div className="row">
					<div className="col-md-8 mx-auto">
						<div className="wapper__card bg-light rounded-lg shadow-sm p-3 p-sm-5">{deleteComment.data.content}</div>
					</div>
					<div className="col-md-10 mx-auto">
						<div className="wapper__card bg-light rounded-lg shadow-sm p-3 p-sm-5">
							<h4 className="mb-4">Are you sure you want to delete this comment?</h4>
							<div>
								{isLoading ? (
									<button type="submit" className="btn btn-danger mr-2" disabled>
										<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
										Delete
									</button>
								) : (
									<button type="submit" className="btn btn-danger mr-2" onClick={onDeleteCommentClicked}>
										Delete
									</button>
								)}
								<CustomLink
									className={`btn btn-secondary mr-2 ${isLoading ? 'disabled' : ''}`}
									href={`/u/${deleteComment.data.post.user.user_name}/${deleteComment.data.post.slug}/comment/${deleteComment.data.slug}/edit`}
								>
									Edit
								</CustomLink>
								<CustomLink
									className={`btn btn-light ${isLoading ? 'disabled' : ''}`}
									href={`/u/${deleteComment.data.post.user.user_name}/${deleteComment.data.post.slug}/comment/${deleteComment.data.slug}`}
								>
									Cancel
								</CustomLink>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DeleteCommentComponent;
