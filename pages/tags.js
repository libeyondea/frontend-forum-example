import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumb from '@/components/Common/Breadcrumb';
import Layout from '@/components/Common/Layout';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import Maybe from '@/components/Common/Maybe';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Pagination from '@/components/Common/Pagination';
import SideBarLeft from '@/components/Common/SideBarLeft';
import TagCard from '@/components/Tag/TagCard';
import useViewport from '@/lib/hooks/useViewport';
import { listTagRequestedAction } from '@/redux/actions/tagAction';

const Tags = () => {
	const dispatch = useDispatch();
	const listTag = useSelector((state) => state.tags.list_tag);
	const router = useRouter();
	const viewPort = useViewport();
	const {
		query: { page },
		isReady
	} = router;

	useEffect(() => {
		if (isReady) {
			dispatch(listTagRequestedAction(page));
		}
	}, [dispatch, page, isReady]);

	return (
		<Layout>
			<div className="container-xl my-4">
				<div className="row">
					<div className="col-xl-9 col-md-9 order-md-2">
						<Breadcrumb
							items={[
								{
									title: 'Home',
									href: '/'
								},
								{
									title: 'Tags'
								}
							]}
						/>
						<h1 className="mb-4">Tags</h1>
						<MayBeSpinner test={listTag.is_loading || listTag.tags.length === 0} spinner={<LoadingSpinner />}>
							<div className="row">
								{listTag.tags?.map((tag) => (
									<div className="col-lg-6 mb-4" key={tag.id}>
										<TagCard tag={tag} />
									</div>
								))}
								<Pagination total={listTag.tags_count} limit={process.env.LIMIT_PAGE.LIST_TAG} asUrl={`/tags`} />
							</div>
						</MayBeSpinner>
					</div>
					<Maybe test={viewPort.vw >= 768}>
						<div className="col-xl-2 col-md-3 order-md-1">
							<SideBarLeft />
						</div>
					</Maybe>
				</div>
			</div>
		</Layout>
	);
};

export default Tags;
