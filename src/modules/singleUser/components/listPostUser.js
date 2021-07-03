import { isEmpty } from 'lodash';
import React from 'react';

import EmptyBoxComponent from '@/common/components/EmptyBox/components';
import Pagination from '@/common/components/Pagination/components';
import PostCardComponent from '@/modules/postCard/components';

const ListPostUserComponent = ({ listPostUser }) => {
	return (
		<>
			<h4 className="mb-3">Posts published</h4>
			{isEmpty(listPostUser.data) ? (
				<EmptyBoxComponent text="Empty posts published" />
			) : (
				<div className="row row-cols-1 g-3 mb-3">
					{listPostUser.data?.map((post) => (
						<div className="col" key={post.id}>
							<PostCardComponent post={post} />
						</div>
					))}
				</div>
			)}
			<Pagination total={listPostUser.meta.total} limit={process.env.LIMIT_PAGE.LIST_POST_USER} />
		</>
	);
};

export default ListPostUserComponent;
