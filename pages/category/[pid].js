import Breadcrumb from 'components/Common/Breadcrumb';
import Layout from 'components/Common/Layout';
import MayBeSpinner from 'components/Common/MayBeSpinner';
import Pagination from 'components/Common/Pagination';
import SideBar from 'components/Common/SideBar';
import PostCard from 'components/Post/PostCard';
import withAuth from 'lib/hoc/withAuth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { singleCategoryRequestedAction } from 'redux/actions/categoryAction';
import { listPostCategoryRequestedAction } from 'redux/actions/postAction';

const SingleCategory = () => {
	const dispatch = useDispatch();
	const singleCategory = useSelector((state) => state.categories.single_category);
	const listPostCategory = useSelector((state) => state.posts.list_post_category);
	const router = useRouter();
	const {
		query: { page, pid }
	} = router;
	let pageNum = parseInt(page || 1);

	useEffect(() => {
		dispatch(singleCategoryRequestedAction(pid));
	}, [dispatch, pid]);

	useEffect(() => {
		dispatch(listPostCategoryRequestedAction(pid, pageNum));
	}, [pid, pageNum, dispatch]);

	return (
		<Layout>
			<div className="container my-4">
				<div className="row">
					<div className="col-lg-9">
						<MayBeSpinner test={singleCategory.is_loading || !singleCategory.category} spinner={<>Loading...</>}>
							<Breadcrumb
								items={[
									{
										title: 'Home',
										href: '/'
									},
									{
										title: 'Category',
										href: '/'
									},
									{
										title: singleCategory.category?.title
									}
								]}
							/>
							<h1 className="mb-4">{singleCategory.category?.title}</h1>
							<MayBeSpinner
								test={listPostCategory.is_loading || listPostCategory.posts.length === 0}
								spinner={<>Loading...</>}
							>
								<div className="row">
									{listPostCategory.posts.map((post) => (
										<div className="col-12 mb-4" key={post.id}>
											<PostCard post={post} />
										</div>
									))}
									<Pagination
										total={listPostCategory.posts_count}
										limit={process.env.LIMIT_PAGE.LIST_POST_CATEGORY}
										asUrl={`/category/${pid}`}
									/>
								</div>
							</MayBeSpinner>
						</MayBeSpinner>
					</div>
					<div className="col-lg-3">
						<SideBar />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default withAuth(SingleCategory);
