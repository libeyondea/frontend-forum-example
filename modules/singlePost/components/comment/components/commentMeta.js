import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { mutate } from 'swr';

import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const CommentMetaComponent = ({ comment }) => {
	const { user } = useUser();
	const [isLoading, setLoading] = useState(false);
	const router = useRouter();
	const {
		query: { pid, page = 1 }
	} = router;

	const onDeleteCommentClicked = async (e) => {
		e.preventDefault();
		try {
			if (window.confirm('Do you want to delete?')) {
				setLoading(true);
				const response = await httpRequest.delete({
					url: `/comments/${comment.id}`,
					token: getCookie('token'),
					params: {
						post_slug: pid
					}
				});
				if (response.data.success) {
					mutate(
						`/comments?post_slug=${pid}&offset=${(page - 1) * process.env.LIMIT_PAGE.LIST_COMMENT}&limit=${
							process.env.LIMIT_PAGE.LIST_COMMENT
						}`
					);
					showToast.success(`Delete comment successfully`);
				}
			}
		} catch (error) {
			console.log(error.response);
			showToast.error();
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="d-flex justify-content-start align-items-center p-2">
			<a href="#!" className="text-decoration-none text-secondary mr-3 d-flex align-items-center">
				<i className="fa fa-heart-o fa-sm mr-1"></i>
				<span className="mr-1">666</span>
				<span className="d-none d-sm-block">likes</span>
			</a>
			<a href="#!" className="text-decoration-none text-secondary mr-3 d-flex align-items-center">
				<i className="fa fa-comment-o fa-sm mr-1"></i>
				<span className="mr-1">666</span>
				<span className="d-none d-sm-block">reply</span>
			</a>
			{user && user?.user_name === comment.user?.user_name && (
				<>
					{isLoading ? (
						<button
							type="button"
							className="p-0 text-secondary border-0 bg-transparent d-flex align-items-center"
							disabled
						>
							<i className="fa fa-trash-o fa-sm text-danger mr-1" />
							<span className="d-none d-sm-block">Delete</span>
							<div className="spinner-border spinner-border-sm text-info ml-1" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</button>
					) : (
						<button
							type="button"
							className="p-0 text-secondary border-0 bg-transparent d-flex align-items-center"
							onClick={onDeleteCommentClicked}
						>
							<i className="fa fa-trash-o fa-sm text-danger mr-1" />
							<span className="d-none d-sm-block">Delete</span>
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default CommentMetaComponent;
