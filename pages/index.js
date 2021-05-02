import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '@/components/Common/Layout';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Pagination from '@/components/Common/Pagination';
import SideBar from '@/components/Common/SideBar';
import Banner from '@/components/Home/Banner';
import PostCard from '@/components/Post/PostCard';
import { listPostRequestedAction } from '@/redux/actions/postAction';

const Index = () => {
	const dispatch = useDispatch();
	const listPost = useSelector((state) => state.posts.list_post);
	const router = useRouter();

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
				<Banner />
				<div className="container my-5">
					<div className="row">
						<div className="col-lg-3 order-lg-2">
							<SideBar />
						</div>
						<div className="col-lg-9 order-lg-1">
							<h2 className="mb-4">New posts</h2>
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
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Index;
