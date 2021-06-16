import React from 'react';

const CommentMetaComponent = ({ comment }) => {
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
		</div>
	);
};

export default CommentMetaComponent;
