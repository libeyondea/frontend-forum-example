import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumb from '@/components/Common/Breadcrumb';
import Layout from '@/components/Common/Layout';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import Maybe from '@/components/Common/Maybe';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Pagination from '@/components/Common/Pagination';
import SideBarRight from '@/components/Common/SideBarRight';
import PostCard from '@/components/Post/PostCard';
import useViewport from '@/lib/hooks/useViewport';
import { listPostTagRequestedAction } from '@/redux/actions/postAction';
import { singleTagRequestedAction } from '@/redux/actions/tagAction';

const SingleTag = () => {
	const dispatch = useDispatch();
	const singleTag = useSelector((state) => state.tags.single_tag);
	const listPostTag = useSelector((state) => state.posts.list_post_tag);
	const router = useRouter();
	const viewPort = useViewport();
	const {
		query: { pid, page },
		isReady
	} = router;

	useEffect(() => {
		if (isReady) {
			dispatch(singleTagRequestedAction(pid));
		}
	}, [dispatch, isReady, pid]);

	useEffect(() => {
		if (isReady) {
			dispatch(listPostTagRequestedAction(pid, page));
		}
	}, [dispatch, pid, page, isReady]);

	return (
		<Layout>
			<div className="container-xl my-4">
				<div className="row">
					<div className="col-xl-9 col-md-8">
						<MayBeSpinner test={singleTag.is_loading || !singleTag.tag} spinner={<LoadingSpinner />}>
							<Breadcrumb
								items={[
									{
										title: 'Home',
										href: '/'
									},
									{
										title: 'Tag',
										href: '/tags'
									},
									{
										title: singleTag.tag?.title
									}
								]}
							/>
							<h1 className="mb-4">{singleTag.tag?.title}</h1>
							<MayBeSpinner
								test={listPostTag.is_loading || listPostTag.posts.length === 0}
								spinner={<LoadingSpinner />}
							>
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
					<Maybe test={viewPort.vw >= 768}>
						<div className="col-xl-3 col-md-4">
							<SideBarRight />
						</div>
					</Maybe>
				</div>
			</div>
		</Layout>
	);
};

export default SingleTag;
