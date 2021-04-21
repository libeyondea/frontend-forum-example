import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from 'components/Post/PostCard';
import Pagination from 'components/Common/Pagination';
import SideBar from 'components/Common/SideBar';
import Breadcrumb from 'components/Common/Breadcrumb';
import MayBeSpinner from 'components/Common/MayBeSpinner';
import Layout from 'components/Common/Layout';
import { singleTagRequestedAction } from 'redux/actions/tagAction';
import { listPostTagRequestedAction } from 'redux/actions/postAction';

const Tag = () => {
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
		dispatch(listPostTagRequestedAction(pid, pageNum));
	}, [pid, pageNum]);

	return (
		<Layout>
			<div className="container">
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
					<div className="row">
						<div className="col-lg-9">
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
						</div>
						<div className="col-lg-3">
							<SideBar />
						</div>
					</div>
				</MayBeSpinner>
			</div>
		</Layout>
	);
};

export default Tag;
