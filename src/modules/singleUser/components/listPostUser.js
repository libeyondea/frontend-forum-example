import { isEmpty } from 'lodash';
import React from 'react';

import Pagination from '@/common/components/Pagination/components';
import PostCardComponent from '@/modules/postCard/components';

const ListPostUserComponent = ({ listPostUser }) => {
	return (
		<>
			<h4 className="mb-3">Posts published</h4>
			<div className="row">
				{isEmpty(listPostUser.data) ? (
					<div className="col-12">
						<div className="text-center font-weight-bold">
							<span>Empty posts</span>
						</div>
					</div>
				) : (
					listPostUser.data?.map((post) => (
						<div className="col-12 mb-3" key={post.id}>
							<PostCardComponent post={post} />
						</div>
					))
				)}
				<Pagination total={listPostUser.meta.total} limit={process.env.LIMIT_PAGE.LIST_POST_USER} />
			</div>
		</>
	);
};

export default ListPostUserComponent;
