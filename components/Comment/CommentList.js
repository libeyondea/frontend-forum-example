import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Comment from '@/components/Comment/Comment';
import CommentInput from '@/components/Comment/CommentInput';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Pagination from '@/components/Common/Pagination';
import { listCommentRequestedAction } from '@/redux/actions/commentAction';
import Maybe from '@/components/Common/Maybe';
import isEmpty from '@/lib/utils/isEmpty';
import Empty from '@/components/Common/Empty';

const CommentList = ({ postSlug }) => {
	const dispatch = useDispatch();
	const listComment = useSelector((state) => state.comments.list_comment);
	const router = useRouter();

	const {
		query: { page }
	} = router;

	useEffect(() => {
		dispatch(listCommentRequestedAction(postSlug, page));
	}, [dispatch, page, postSlug]);

	return (
		<>
			<CommentInput />
			<MayBeSpinner test={listComment.is_loading} spinner={<LoadingSpinner />}>
				<MayBeSpinner test={isEmpty(listComment.comments)} spinner={<Empty />}>
					{listComment.comments?.map((comment) => (
						<Comment key={comment.id} comment={comment} />
					))}
					<Pagination
						total={listComment.comments_count}
						limit={process.env.LIMIT_PAGE.LIST_COMMENT}
						asUrl={`/posts/${postSlug}`}
					/>
				</MayBeSpinner>
			</MayBeSpinner>
		</>
	);
};

export default CommentList;
