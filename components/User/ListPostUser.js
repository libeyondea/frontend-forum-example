import React from 'react';
import { useSelector } from 'react-redux';

import LoadingSpinner from '@/components/Common/LoadingSpinner';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Pagination from '@/components/Common/Pagination';
import PostCard from '@/components/Post/PostCard';

const ListPostUser = () => {
	const listPostUser = useSelector((state) => state.posts.list_post_user);
	const singleUser = useSelector((state) => state.users.single_user);
	return (
		<MayBeSpinner test={listPostUser.is_loading} spinner={<LoadingSpinner />}>
			<div className="row">
				{listPostUser.posts?.map((post) => (
					<div className="col-12 mb-4" key={post.id}>
						<PostCard post={post} />
					</div>
				))}
				<Pagination
					total={listPostUser.posts_count}
					limit={process.env.LIMIT_PAGE.LIST_POST_USER}
					asUrl={`/profile/${singleUser.user.user_name}`}
				/>
			</div>
		</MayBeSpinner>
	);
};

export default ListPostUser;
