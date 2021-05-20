import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import Comment from '@/components/Comment/Comment';
import CommentInput from '@/components/Comment/CommentInput';
import EmptyComment from '@/components/Common/EmptyComment';
import LoadingComment from '@/components/Common/LoadingComment';
import Pagination from '@/components/Pagination';
import isEmpty from '@/lib/utils/isEmpty';

const CommentList = () => {
	const router = useRouter();
	const {
		query: { pid, page = 1 }
	} = router;

	const { data: listComment, mutate: mutateListComment } = useSWR(
		`/comments?post_slug=${pid}&offset=${(page - 1) * process.env.LIMIT_PAGE.LIST_COMMENT}&limit=${
			process.env.LIMIT_PAGE.LIST_COMMENT
		}`
	);

	return (
		<>
			<CommentInput mutateListComment={mutateListComment} />
			{!listComment ? (
				<LoadingComment />
			) : isEmpty(listComment?.data) ? (
				<EmptyComment />
			) : (
				<>
					{listComment?.data?.map((comment) => (
						<Comment key={comment.id} comment={comment} />
					))}
					<Pagination total={listComment?.meta?.comments_count} limit={process.env.LIMIT_PAGE.LIST_COMMENT} />
				</>
			)}
		</>
	);
};

export default CommentList;
