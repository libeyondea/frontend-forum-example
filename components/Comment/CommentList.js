import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Comment from '@/components/Comment/Comment';
import CommentInput from '@/components/Comment/CommentInput';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import { listCommentRequestedAction } from '@/redux/actions/commentAction';

const CommentList = ({ postSlug }) => {
	const dispatch = useDispatch();
	const listComment = useSelector((state) => state.comments.list_comment);

	useEffect(() => {
		dispatch(listCommentRequestedAction(postSlug, 1));
	}, [dispatch, postSlug]);

	return (
		<>
			<CommentInput />
			<MayBeSpinner test={listComment.is_loading} spinner={<>Loding...</>}>
				{listComment.comments?.map((comment) => (
					<Comment key={comment.id} comment={comment} />
				))}
			</MayBeSpinner>
		</>
	);
};

export default CommentList;
