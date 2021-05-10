import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumb from '@/components/Common/Breadcrumb';
import Empty from '@/components/Common/Empty';
import Layout from '@/components/Common/Layout';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Pagination from '@/components/Common/Pagination';
import SideBarLeft from '@/components/Common/SideBarLeft';
import TagCard from '@/components/Tag/TagCard';
import isEmpty from '@/lib/utils/isEmpty';
import { listTagRequestedAction } from '@/redux/actions/tagAction';

const Tags = () => {
	const dispatch = useDispatch();
	const listTag = useSelector((state) => state.tags.list_tag);
	const router = useRouter();
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
						<MayBeSpinner test={listTag.is_loading} spinner={<LoadingSpinner />}>
							<MayBeSpinner test={isEmpty(listTag.tags)} spinner={<Empty />}>
								<div className="row">
									{listTag.tags?.map((tag) => (
										<div className="col-lg-6 mb-4" key={tag.id}>
											<TagCard tag={tag} />
										</div>
									))}
									<Pagination total={listTag.tags_count} limit={process.env.LIMIT_PAGE.LIST_TAG} asUrl={`/tags`} />
								</div>
							</MayBeSpinner>
						</MayBeSpinner>
					</div>
					<div className="d-none d-md-block col-xl-2 col-md-3 order-md-1">
						<SideBarLeft />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Tags;
