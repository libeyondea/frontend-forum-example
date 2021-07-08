import { isEmpty } from 'lodash';
import React from 'react';

import EmptyBoxComponent from '@/common/components/EmptyBox/components';
import LoadingPost from '@/common/components/LoadingPost/components';
import Pagination from '@/common/components/Pagination/components';
import CommentCardSearchComponent from '@/modules/commentCardSearch/components';

const ListCommentComponent = ({ listComment }) => {
	return (
		<>
			{!listComment ? (
				<LoadingPost />
			) : isEmpty(listComment.data) ? (
				<EmptyBoxComponent text="No results match" />
			) : (
				<>
					<div className="row row-cols-1 g-3 mb-3">
						{listComment.data?.map((comment) => (
							<div className="col" key={comment.id}>
								<CommentCardSearchComponent comment={comment} />
							</div>
						))}
					</div>
					<Pagination total={listComment.meta.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
				</>
			)}
		</>
	);
};

export default ListCommentComponent;
