import React from 'react';
import { useSelector } from 'react-redux';

const CommentMeta = ({ comment }) => {
	const login = useSelector((state) => state.users.login);
	return (
		<div className="mod-options d-flex justify-content-start">
			<a href="#!" className="text-decoration-none text-danger mr-3">
				<i className="fa fa-heart fa-sm"></i> 666 likes
			</a>
			<a href="#!" className="text-decoration-none text-secondary mr-3">
				<i className="fa fa-comment-o fa-sm"></i> 666 Reply
			</a>
			{login.is_authenticated && login.user?.user_name === comment.user?.user_name && (
				<a href="#!" className="text-decoration-none text-secondary">
					<i className="fa fa-trash-o fa-sm" /> Delete
				</a>
			)}
		</div>
	);
};

export default CommentMeta;
