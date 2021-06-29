import { isEmpty } from 'lodash';
import React from 'react';

import Pagination from '@/common/components/Pagination/components';
import PostCardComponent from '@/modules/postCard/components';

const ListPostComponent = ({ listPost }) => {
	return (
		<>
			{isEmpty(listPost.data) ? (
				<div className="col-12">
					<div className="text-center font-weight-bold">
						<span>No results match</span>
					</div>
				</div>
			) : (
				listPost.data?.map((post) => (
					<div className="col-12 mb-3" key={post.id}>
						<PostCardComponent post={post} />
					</div>
				))
			)}
			<Pagination total={listPost.meta.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
		</>
	);
};

export default ListPostComponent;
