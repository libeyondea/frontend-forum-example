import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from 'components/Post/PostCard';
import Pagination from 'components/Common/Pagination';
import SideBar from 'components/Common/SideBar';
import Breadcrumb from 'components/Common/Breadcrumb';
import MayBeSpinner from 'components/Common/MayBeSpinner';
import Layout from 'components/Common/Layout';
import { singleCategoryRequestedAction } from 'redux/actions/categoryAction';
import { listPostCategoryRequestedAction } from 'redux/actions/postAction';
import withAuth from 'lib/hoc/withAuth';

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
	}, [pid]);

	useEffect(() => {
		dispatch(listPostCategoryRequestedAction(pid, pageNum));
	}, [pid, pageNum]);

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
