import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '@/components/Common/Layout';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import Maybe from '@/components/Common/Maybe';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Pagination from '@/components/Common/Pagination';
import SideBarLeft from '@/components/Common/SideBarLeft';
import SideBarRight from '@/components/Common/SideBarRight';
import PostCard from '@/components/Post/PostCard';
import useViewport from '@/lib/hooks/useViewport';
import { listPostRequestedAction } from '@/redux/actions/postAction';

const Index = () => {
	const dispatch = useDispatch();
	const listPost = useSelector((state) => state.posts.list_post);
	const router = useRouter();
	const viewPort = useViewport();
	const {
		query: { page },
		isReady
	} = router;

	useEffect(() => {
		if (isReady) {
			dispatch(listPostRequestedAction(page));
		}
	}, [dispatch, isReady, page]);

	return (
		<>
			<Head>
				<title>Home | De4th Zone</title>
				<meta name="description" content="De4th Zone" />
			</Head>
			<Layout>
				<div className="container-xl my-5">
					<div className="row">
						<div className="col-xl-7 col-lg-7 col-md-9 order-xl-2 order-lg-2 order-md-2">
							<h4 className="mb-4">New posts</h4>
							<MayBeSpinner test={listPost.is_loading} spinner={<LoadingSpinner />}>
								<div className="row">
									{listPost.posts?.map((post) => (
										<div className="col-12 mb-4" key={post.id}>
											<PostCard post={post} />
										</div>
									))}
									<Pagination total={listPost.posts_count} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} asUrl={`/`} />
								</div>
							</MayBeSpinner>
						</div>
						<Maybe test={viewPort.vw >= 768}>
							<div className="col-xl-2 col-lg-2 col-md-3 order-xl-1 order-lg-1 order-md-1">
								<SideBarLeft />
							</div>
							<Maybe test={viewPort.vw >= 992}>
								<div className="col-xl-3 col-lg-3 col-md-12 order-xl-3 order-lg-3 order-md-3">
									<SideBarRight />
								</div>
							</Maybe>
						</Maybe>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Index;
