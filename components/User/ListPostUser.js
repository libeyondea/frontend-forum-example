import React from 'react';

import EmptyPost from '@/components/Common/EmptyPost';
import Pagination from '@/components/Pagination';
import PostCard from '@/components/Post/PostCard';
import isEmpty from '@/lib/utils/isEmpty';

const ListPostUser = ({ listPostUser }) => {
	return (
		<div className="row">
			{isEmpty(listPostUser.data) ? (
				<EmptyPost />
			) : (
				listPostUser.data?.map((post) => (
					<div className="col-12 mb-4" key={post.id}>
						<PostCard post={post} />
					</div>
				))
			)}
			<Pagination total={listPostUser.meta.posts_count} limit={process.env.LIMIT_PAGE.LIST_POST_USER} />
		</div>
	);
};

export default ListPostUser;
