import { isEmpty } from 'lodash';
import React from 'react';

import EmptyBox from '@/common/components/EmptyBox/components';
import Pagination from '@/common/components/Pagination/components';
import TabHorizontal from '@/common/components/TabHorizontal/components';
import PostCardComponent from '@/modules/postCard/components';
import SideBarRightComponent from '@/modules/sidebarRight/components';

const SingleCategoryComponent = ({ singleCategory, listPostCategory, pid }) => {
	return (
		<div className="container-xl py-4">
			<div className="row">
				<div className="col-xl-9 col-md-8">
					<h1 className="mb-3">{singleCategory.data?.title}</h1>
					<div className="d-flex align-items-center mb-3">
						<h4 className="me-auto mb-0">Posts</h4>
						<TabHorizontal
							pidTab={pid[1]}
							items={[
								{
									title: 'Feed',
									slug: 'feed',
									href: `/c/${singleCategory.data?.slug}/feed`
								},
								{
									title: 'Latest',
									slug: 'latest',
									href: `/c/${singleCategory.data?.slug}/latest`
								},
								{
									title: 'Oldest',
									slug: 'oldest',
									href: `/c/${singleCategory.data?.slug}/oldest`
								}
							]}
						/>
					</div>
					{isEmpty(listPostCategory.data) ? (
						<EmptyBox text="Empty posts" />
					) : (
						<div className="row row-cols-1 g-3 mb-3">
							{listPostCategory.data.map((post) => (
								<div className="col" key={post.id}>
									<PostCardComponent post={post} />
								</div>
							))}
						</div>
					)}
					<Pagination total={listPostCategory.meta?.total} limit={process.env.LIMIT_PAGE.LIST_POST_CATEGORY} />
				</div>
				<div className="d-none d-md-block col-xl-3 col-md-4">
					<SideBarRightComponent />
				</div>
			</div>
		</div>
	);
};

export default SingleCategoryComponent;
