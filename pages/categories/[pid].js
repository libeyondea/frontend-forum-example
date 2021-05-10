import { useRouter } from 'next/router';
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
import isEmpty from '@/lib/utils/isEmpty';
import { singleCategoryRequestedAction } from '@/redux/actions/categoryAction';
import { listPostCategoryRequestedAction } from '@/redux/actions/postAction';

const SingleCategory = () => {
	const dispatch = useDispatch();
	const singleCategory = useSelector((state) => state.categories.single_category);
	const listPostCategory = useSelector((state) => state.posts.list_post_category);
	const router = useRouter();
	const {
		query: { pid, tab, page },
		isReady
	} = router;

	useEffect(() => {
		if (isReady) {
			dispatch(singleCategoryRequestedAction(pid));
		}
	}, [dispatch, isReady, pid]);

	useEffect(() => {
		if (isReady) {
			dispatch(listPostCategoryRequestedAction(pid, tab, page));
		}
	}, [dispatch, pid, tab, page, isReady]);

	return (
		<Layout>
			<div className="container-xl my-4">
				<div className="row">
					<div className="col-xl-9 col-md-8">
						<MayBeSpinner test={singleCategory.is_loading} spinner={<LoadingSpinner />}>
							<MayBeSpinner test={isEmpty(singleCategory.category)} spinner={<Empty />}>
								<Breadcrumb
									items={[
										{
											title: 'Home',
											href: '/'
										},
										{
											title: 'Categories',
											href: '/categories'
										},
										{
											title: singleCategory.category?.title
										}
									]}
								/>
								<h1 className="mb-4">{singleCategory.category?.title}</h1>
								<div className="d-flex align-items-center mb-2">
									<h4 className="mr-auto mb-0">Posts</h4>
									<SortByPost asUrl={`/categories/${pid}`} />
								</div>
								<MayBeSpinner test={listPostCategory.is_loading} spinner={<LoadingSpinner />}>
									<MayBeSpinner test={isEmpty(listPostCategory.posts)} spinner={<Empty />}>
										<div className="row">
											{listPostCategory.posts.map((post) => (
												<div className="col-12 mb-4" key={post.id}>
													<PostCard post={post} />
												</div>
											))}
											<Pagination
												total={listPostCategory.posts_count}
												limit={process.env.LIMIT_PAGE.LIST_POST_CATEGORY}
												asUrl={`/categories/${pid}`}
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

export default SingleCategory;
