import { useRouter } from 'next/router';
import Error404 from 'pages/404';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumb from '@/components/Common/Breadcrumb';
import Empty from '@/components/Common/Empty';
import Layout from '@/components/Common/Layout';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Pagination from '@/components/Common/Pagination';
import SideBarRight from '@/components/Common/SideBarRight';
import PostCard from '@/components/Post/PostCard';
import SortByPost from '@/components/Post/SortByPost';
import FollowTagButton from '@/components/User/FollowTagButton';
import isEmpty from '@/lib/utils/isEmpty';
import { listPostTagRequestedAction } from '@/redux/actions/postAction';
import {
	followTagRequestedAction,
	singleTagRequestedAction,
	unFollowTagRequestedAction
} from '@/redux/actions/tagAction';

const SingleTag = () => {
	const dispatch = useDispatch();
	const singleTag = useSelector((state) => state.tags.single_tag);
	const listPostTag = useSelector((state) => state.posts.list_post_tag);
	const router = useRouter();
	const {
		query: { pid, tab, page },
		isReady
	} = router;

	useEffect(() => {
		if (isReady) {
			dispatch(singleTagRequestedAction(pid));
		}
	}, [dispatch, isReady, pid]);

	useEffect(() => {
		if (isReady) {
			dispatch(listPostTagRequestedAction(pid, tab, page));
		}
	}, [dispatch, pid, tab, page, isReady]);

	const handleFollow = () => {
		dispatch(followTagRequestedAction(singleTag.tag?.slug));
	};

	const handleUnfollow = () => {
		dispatch(unFollowTagRequestedAction(singleTag.tag?.slug));
	};

	if (isEmpty(singleTag.tag && !singleTag.is_loading)) {
		return <Error404 />;
	}

	return (
		<Layout>
			<div className="container-xl my-4">
				<div className="row">
					<div className="col-xl-9 col-md-8">
						<MayBeSpinner test={singleTag.is_loading} spinner={<LoadingSpinner />}>
							<MayBeSpinner test={isEmpty(singleTag.tag)} spinner={<Empty />}>
								<Breadcrumb
									items={[
										{
											title: 'Home',
											href: '/'
										},
										{
											title: 'Tags',
											href: '/tags'
										},
										{
											title: singleTag.tag?.title
										}
									]}
								/>
								<div className="card card-post mb-4">
									<div className="p-3">
										<div className="card-block">
											<h1 className="card-title mb-1">
												<span className="text-secondary">#</span>
												{singleTag.tag?.title}
											</h1>
											<p className="card-text">{singleTag.tag?.content}</p>
										</div>
										<small className="text-muted">{singleTag.tag?.total_posts} posts published</small>
										<div className="d-flex justify-content-end mt-2">
											<FollowTagButton
												slug={singleTag.tag?.slug}
												following={singleTag.tag?.following}
												follow={handleFollow}
												unfollow={handleUnfollow}
											/>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center mb-2">
									<h4 className="mr-auto mb-0">Posts</h4>
									<SortByPost asUrl={`/tags/${pid}`} />
								</div>
								<MayBeSpinner test={listPostTag.is_loading} spinner={<LoadingSpinner />}>
									<MayBeSpinner test={isEmpty(listPostTag.posts)} spinner={<Empty />}>
										<div className="row">
											{listPostTag.posts.map((post) => (
												<div className="col-12 mb-4" key={post.id}>
													<PostCard post={post} />
												</div>
											))}
											<Pagination
												total={listPostTag.posts_count}
												limit={process.env.LIMIT_PAGE.LIST_POST_TAG}
												asUrl={`/tags/${pid}`}
											/>
										</div>
									</MayBeSpinner>
								</MayBeSpinner>
							</MayBeSpinner>
						</MayBeSpinner>
					</div>
					<div className="d-none d-md-block col-xl-3 col-md-4">
						<SideBarRight />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SingleTag;
