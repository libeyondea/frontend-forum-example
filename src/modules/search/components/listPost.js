import { isEmpty } from 'lodash';
import React from 'react';

import EmptyBoxComponent from '@/common/components/EmptyBox/components';
import LoadingPost from '@/common/components/LoadingPost/components';
import Pagination from '@/common/components/Pagination/components';
import PostCardComponent from '@/modules/postCard/components';

const ListPostComponent = ({ listPost }) => {
	return (
		<>
			{!listPost ? (
				<LoadingPost />
			) : isEmpty(listPost.data) ? (
				<EmptyBoxComponent text="No results match" />
			) : (
				<>
					<div className="row row-cols-1 g-3 mb-3">
						{listPost.data?.map((post) => (
							<div className="col" key={post.id}>
								<PostCardComponent post={post} />
							</div>
						))}
					</div>
					<Pagination total={listPost.meta.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
				</>
			)}
		</>
	);
};

export default ListPostComponent;
