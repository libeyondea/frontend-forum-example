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
import { listPostTagRequestedAction } from 'redux/actions/postAction';
import { singleTagRequestedAction } from 'redux/actions/tagAction';

const SingleTag = () => {
	const dispatch = useDispatch();
	const singleTag = useSelector((state) => state.tags.single_tag);
	const listPostTag = useSelector((state) => state.posts.list_post_tag);
	const router = useRouter();
	const {
		query: { page, pid }
	} = router;
	let pageNum = parseInt(page || 1);

	useEffect(() => {
		dispatch(singleTagRequestedAction(pid));
	}, [pid]);

	useEffect(() => {
		dispatch(listPostTagRequestedAction(pid, pageNum));
	}, [pid, pageNum]);

	return (
		<Layout>
			<div className="container my-4">
				<div className="row">
					<div className="col-lg-9">
						<MayBeSpinner test={singleTag.is_loading || !singleTag.tag} spinner={<>Loading...</>}>
							<Breadcrumb
								items={[
									{
										title: 'Home',
										href: '/'
									},
									{
										title: 'Tag',
										href: '/'
									},
									{
										title: singleTag.tag?.title
									}
								]}
							/>
							<h1 className="mb-4">{singleTag.tag?.title}</h1>
							<MayBeSpinner test={listPostTag.is_loading || listPostTag.posts.length === 0} spinner={<>Loading...</>}>
								<div className="row">
									{listPostTag.posts.map((post) => (
										<div className="col-12 mb-4" key={post.id}>
											<PostCard post={post} />
										</div>
									))}
									<Pagination
										total={listPostTag.posts_count}
										limit={process.env.LIMIT_PAGE.LIST_POST_TAG}
										asUrl={`/tag/${pid}`}
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

export default withAuth(SingleTag);
