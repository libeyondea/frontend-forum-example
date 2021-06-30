import { isEmpty } from 'lodash';
import React from 'react';

import Pagination from '@/common/components/Pagination/components';
import CommentCardSearchComponent from '@/modules/commentCardSearch/components';

const ListCommentComponent = ({ listComment }) => {
	return (
		<>
			{isEmpty(listComment.data) ? (
				<div className="col-12">
					<div className="text-center font-weight-bold">
						<span>No results match</span>
					</div>
				</div>
			) : (
				listComment.data?.map((comment) => (
					<div className="col-12 mb-3" key={comment.id}>
						<CommentCardSearchComponent comment={comment} />
					</div>
				))
			)}
			<Pagination total={listComment.meta.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
		</>
	);
};

export default ListCommentComponent;
