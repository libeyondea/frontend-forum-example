import React from 'react';

import Pagination from '@/common/components/Pagination/components';
import TabPost from '@/common/components/TabPost/components';
import isEmpty from '@/common/utils/isEmpty';
import PostCardComponent from '@/modules/postCard/components';
import SideBarRightComponent from '@/modules/sidebarRight/components';

const SingleCategoryComponent = ({ singleCategory, listPostCategory, pid }) => {
	return (
		<div className="container-xl my-4">
			<div className="row">
				<div className="col-xl-9 col-md-8">
					<h1 className="mb-3">{singleCategory.data?.title}</h1>
					<div className="d-flex align-items-center mb-3">
						<h4 className="mr-auto mb-0">Posts</h4>
						<TabPost
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
					<div className="row">
						{isEmpty(listPostCategory.data) ? (
							<div className="col-12">
								<div className="text-center font-weight-bold">
									<span>Empty posts</span>
								</div>
							</div>
						) : (
							<>
								{listPostCategory.data.map((post) => (
									<div className="col-12 mb-3" key={post.id}>
										<PostCardComponent post={post} />
									</div>
								))}
							</>
						)}
						<Pagination total={listPostCategory.meta?.total} limit={process.env.LIMIT_PAGE.LIST_POST_CATEGORY} />
					</div>
				</div>
				<div className="d-none d-md-block col-xl-3 col-md-4">
					<SideBarRightComponent />
				</div>
			</div>
		</div>
	);
};

export default SingleCategoryComponent;
