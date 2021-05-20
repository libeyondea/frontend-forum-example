import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { mutate } from 'swr';

import useUser from '@/lib/hooks/useUser';
import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';
import showToast from '@/lib/utils/showToast';

const CommentMeta = ({ comment }) => {
	const { user } = useUser();
	const [isLoading, setLoading] = useState(false);
	const router = useRouter();
	const {
		query: { pid, page = 1 }
	} = router;

	const onDeleteCommentClicked = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await httpRequest.delete({
				url: `/comments/${comment.id}`,
				token: getCookie('token'),
				params: {
					post_slug: pid
				}
			});
			if (response.data.success) {
				await mutate(
					`/comments?post_slug=${pid}&offset=${(page - 1) * process.env.LIMIT_PAGE.LIST_COMMENT}&limit=${
						process.env.LIMIT_PAGE.LIST_COMMENT
					}`
				);
				showToast.success(`Delete comment successfully`);
			}
		} catch (error) {
			console.log(error.response);
			showToast.error();
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mod-options d-flex justify-content-start">
			<a href="#!" className="text-decoration-none text-secondary mr-3">
				<i className="fa fa-heart-o fa-sm"></i> 666 likes
			</a>
			<a href="#!" className="text-decoration-none text-secondary mr-3">
				<i className="fa fa-comment-o fa-sm"></i> 666 Reply
			</a>
			{user && user?.user_name === comment.user?.user_name && (
				<>
					{isLoading ? (
						<a href="#!" className="text-decoration-none text-secondary disabled">
							<i className="fa fa-trash-o fa-sm" /> Delete
						</a>
					) : (
						<a href="#!" className="text-decoration-none text-secondary" onClick={onDeleteCommentClicked}>
							<i className="fa fa-trash-o fa-sm" /> Delete
						</a>
					)}
				</>
			)}
		</div>
	);
};

export default CommentMeta;
