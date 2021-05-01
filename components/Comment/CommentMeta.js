import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteCommentRequestedAction } from '@/redux/actions/commentAction';

const CommentMeta = ({ comment }) => {
	const dispatch = useDispatch();
	const login = useSelector((state) => state.users.login);
	const deleteComment = useSelector((state) => state.comments.delete_comment);
	const router = useRouter();
	const {
		query: { pid }
	} = router;

	const deleteCommentHandle = (e) => {
		e.preventDefault();
		dispatch(deleteCommentRequestedAction(pid, comment.id));
	};
	return (
		<div className="mod-options d-flex justify-content-start">
			<a href="#!" className="text-decoration-none text-danger mr-3">
				<i className="fa fa-heart fa-sm"></i> 666 likes
			</a>
			<a href="#!" className="text-decoration-none text-secondary mr-3">
				<i className="fa fa-comment-o fa-sm"></i> 666 Reply
			</a>
			{login.is_authenticated && login.user?.user_name === comment.user?.user_name && (
				<>
					{deleteComment.is_loading ? (
						<a href="#!" className="text-decoration-none text-secondary disabled">
							<i className="fa fa-trash-o fa-sm" /> Delete
						</a>
					) : (
						<a href="#!" className="text-decoration-none text-secondary" onClick={deleteCommentHandle}>
							<i className="fa fa-trash-o fa-sm" /> Delete
						</a>
					)}
				</>
			)}
		</div>
	);
};

export default CommentMeta;
