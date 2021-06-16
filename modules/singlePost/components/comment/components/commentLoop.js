import React from 'react';

import CommentCard from '@/modules/singlePost/components/comment/components/commentCard';

const CommentLoopComponent = ({
	comments,
	listCommentClient,
	setListCommentClient,
	meta,
	setMeta,
	postUserName,
	postSlug
}) => {
	return comments.map((comment) => (
		<CommentCard
			comment={comment}
			listCommentClient={listCommentClient}
			setListCommentClient={setListCommentClient}
			meta={meta}
			setMeta={setMeta}
			postUserName={postUserName}
			postSlug={postSlug}
			key={comment.id}
		/>
	));
};

export default CommentLoopComponent;
