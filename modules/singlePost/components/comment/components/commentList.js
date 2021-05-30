import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import Pagination from '@/common/components/Pagination/components';
import isEmpty from '@/common/utils/isEmpty';
import CommentLoadingComponent from '@/modules/singlePost/components/comment/components/commentLoading';
import CommentMetaComponent from '@/modules/singlePost/components/comment/components/commentMeta';

const CommentList = () => {
	const router = useRouter();
	const {
		query: { pid, page = 1 }
	} = router;

	const { data: listComment } = useSWR(
		`/comments?post_slug=${pid}&offset=${(page - 1) * process.env.LIMIT_PAGE.LIST_COMMENT}&limit=${
			process.env.LIMIT_PAGE.LIST_COMMENT
		}`
	);

	return (
		<>
			{!listComment ? (
				<CommentLoadingComponent />
			) : isEmpty(listComment?.data) ? (
				<div className="text-center font-weight-bold">
					<span>Empty comments</span>
				</div>
			) : (
				<>
					{listComment?.data?.map((comment) => (
						<div className="mb-4 d-flex align-items-start flex-column flex-sm-row" key={comment.id}>
							<CustomLink
								href="/users/[pid]"
								as={`/users/${comment.user?.user_name}`}
								className="mr-3 mb-3 text-decoration-none d-inline-flex"
							>
								<CustomImage
									width="50"
									height="50"
									src={`${process.env.IMAGES_URL}/${comment.user?.avatar}`}
									alt={comment.user?.user_name}
									className="rounded-circle h-100 w-100"
								/>
							</CustomLink>
							<div className="flex-fill w-100">
								<div className="border p-3 bg-white text-break">
									<div className="mb-2">
										<CustomLink
											href="/users/[pid]"
											as={`/users/${comment.user?.user_name}`}
											className="text-decoration-none text-dark d-inline-block"
										>
											<h5 className="my-0">{comment.user?.user_name}</h5>
										</CustomLink>
										<span className="mx-0 my-0 small text-muted ">
											{' '}
											・{new Date(comment.created_at).toDateString()}
										</span>
									</div>
									{comment.content}
								</div>
								<CommentMetaComponent comment={comment} />
							</div>
						</div>
					))}
					<Pagination total={listComment?.meta?.total} limit={process.env.LIMIT_PAGE.LIST_COMMENT} />
				</>
			)}
		</>
	);
};

export default CommentList;
