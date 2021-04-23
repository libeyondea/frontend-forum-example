import Head from 'next/head';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { listPostRequestedAction } from '../redux/actions/postAction';
import Banner from 'components/Home/Banner';
import SideBar from 'components/Common/SideBar';
import Pagination from 'components/Common/Pagination';
import MayBeSpinner from '../components/Common/MayBeSpinner';
import PostCard from 'components/Post/PostCard';
import Layout from 'components/Common/Layout';

const Index = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const listPost = useSelector((state) => state.posts.list_post);
	const {
		query: { page }
	} = router;
	let pageNum = parseInt(page || 1);

	useEffect(() => {
		dispatch(listPostRequestedAction(pageNum));
	}, [pageNum]);

	return (
		<>
			<Head>
				<title>Home | De4th Zone</title>
				<meta name="description" content="De4th Zone" />
			</Head>
			<Layout>
				<Banner />
				<div className="container my-5">
					<h2 className="mb-4">Trending posts</h2>
					<div className="row">
						<div className="col-12 col-md-6 mb-4">
							<PostCard post={listPost.posts[0]} />
						</div>
						<div className="col-12 col-md-6 mb-4">
							<PostCard post={listPost.posts[1]} />
						</div>
						<div className="col-12 col-md-6 mb-4">
							<PostCard post={listPost.posts[2]} />
						</div>
						<div className="col-12 col-md-6 mb-4">
							<PostCard post={listPost.posts[4]} />
						</div>
					</div>
					<div className="row">
						<div className="col-lg-3 order-lg-2">
							<SideBar />
						</div>
						<div className="col-lg-9 order-lg-1">
							<h2 className="mb-4">New posts</h2>
							<MayBeSpinner test={listPost.is_loading} spinner={<>Loading...</>}>
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
