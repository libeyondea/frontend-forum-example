import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb/components';
import Pagination from '@/common/components/Pagination/components';
import TabPost from '@/common/components/TabPost/components';
import isEmpty from '@/common/utils/isEmpty';
import PostCardComponent from '@/modules/postCard/components';
import SideBarRightComponent from '@/modules/sidebarRight/components';
import TagCardComponent from '@/modules/tagCard/components';

const SingleTagComponent = ({ singleTag, listPostTag, pid }) => {
	return (
		<div className="container-xl my-4">
			<div className="row">
				<div className="col-xl-9 col-md-8">
					<Breadcrumb
						items={[
							{
								title: 'Home',
								href: '/'
							},
							{
								title: 'Tags',
								href: '/tags'
							},
							{
								title: singleTag.data?.title
							}
						]}
					/>
					<TagCardComponent tag={singleTag.data} classNameContainer={`mb-4`} isSingle />

					<div className="d-flex align-items-center mb-2">
						<h4 className="mr-auto mb-0">Posts</h4>
						<TabPost
							pidTab={pid[1]}
							items={[
								{
									title: 'Feed',
									slug: 'feed',
									href: `/tags/${singleTag.data?.slug}/feed`
								},
								{
									title: 'Latest',
									slug: 'latest',
									href: `/tags/${singleTag.data?.slug}/latest`
								},
								{
									title: 'Oldest',
									slug: 'oldest',
									href: `/tags/${singleTag.data?.slug}/oldest`
								}
							]}
						/>
					</div>
					<div className="row">
						{isEmpty(listPostTag.data) ? (
							<div className="col-12">
								<div className="text-center font-weight-bold">
									<span>Empty posts</span>
								</div>
							</div>
						) : (
							<>
								{listPostTag.data.map((post) => (
									<div className="col-12 mb-4" key={post.id}>
										<PostCardComponent post={post} />
									</div>
								))}
							</>
						)}
						<Pagination total={listPostTag.meta?.posts_count} limit={process.env.LIMIT_PAGE.LIST_POST_TAG} />
					</div>
				</div>
				<div className="d-none d-md-block col-xl-3 col-md-4">
					<SideBarRightComponent />
				</div>
			</div>
		</div>
	);
};

export default SingleTagComponent;
