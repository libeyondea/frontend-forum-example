import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Empty from '@/components/Common/Empty';
import Layout from '@/components/Common/Layout';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Pagination from '@/components/Common/Pagination';
import SideBarLeft from '@/components/Common/SideBarLeft';
import SideBarRight from '@/components/Common/SideBarRight';
import PostCard from '@/components/Post/PostCard';
import SortByPost from '@/components/Post/SortByPost';
import isEmpty from '@/lib/utils/isEmpty';
import { listPostRequestedAction } from '@/redux/actions/postAction';

const Index = () => {
	const dispatch = useDispatch();
	const listPost = useSelector((state) => state.posts.list_post);
	const router = useRouter();
	const {
		query: { tab, page },
		isReady
	} = router;

	useEffect(() => {
		if (isReady) {
			dispatch(listPostRequestedAction(tab, page));
		}
	}, [dispatch, isReady, tab, page]);

	return (
		<>
			<Head>
				<title>Home | De4th Zone</title>
				<meta name="description" content="De4th Zone" />
			</Head>
			<Layout>
				<div className="container-xl my-4">
					<div className="row">
						<div className="col-xl-7 col-lg-7 col-md-9 order-xl-2 order-lg-2 order-md-2">
							<div className="d-flex align-items-center mb-2">
								<h4 className="mr-auto mb-0">New posts</h4>
								<SortByPost asUrl={`/`} />
							</div>
							<MayBeSpinner test={listPost.is_loading} spinner={<LoadingSpinner />}>
								<MayBeSpinner test={isEmpty(listPost.posts)} spinner={<Empty />}>
									<div className="row">
										{listPost.posts?.map((post) => (
											<div className="col-12 mb-4" key={post.id}>
												<PostCard post={post} />
											</div>
										))}
										<Pagination
											total={listPost.posts_count}
											limit={process.env.LIMIT_PAGE.LIST_POST_HOME}
											asUrl={`/`}
										/>
									</div>
								</MayBeSpinner>
							</MayBeSpinner>
						</div>
						<div className="d-none d-md-block col-xl-2 col-lg-2 col-md-3 order-xl-1 order-lg-1 order-md-1">
							<SideBarLeft />
						</div>
						<div className="d-none d-lg-block col-xl-3 col-lg-3 col-md-12 order-xl-3 order-lg-3 order-md-3">
							<SideBarRight />
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Index;
