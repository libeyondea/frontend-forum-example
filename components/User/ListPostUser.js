import React from 'react';
import { useSelector } from 'react-redux';

import Empty from '@/components/Common/Empty';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Pagination from '@/components/Common/Pagination';
import PostCard from '@/components/Post/PostCard';
import isEmpty from '@/lib/utils/isEmpty';

const ListPostUser = () => {
	const listPostUser = useSelector((state) => state.posts.list_post_user);
	const singleUser = useSelector((state) => state.users.single_user);
	return (
		<MayBeSpinner test={listPostUser.is_loading} spinner={<LoadingSpinner />}>
			<MayBeSpinner test={isEmpty(listPostUser.posts)} spinner={<Empty />}>
				<div className="row">
					{listPostUser.posts?.map((post) => (
						<div className="col-12 mb-4" key={post.id}>
							<PostCard post={post} />
						</div>
					))}
					<Pagination
						total={listPostUser.posts_count}
						limit={process.env.LIMIT_PAGE.LIST_POST_USER}
						asUrl={`/users/${singleUser.user.user_name}`}
					/>
				</div>
			</MayBeSpinner>
		</MayBeSpinner>
	);
};

export default ListPostUser;
