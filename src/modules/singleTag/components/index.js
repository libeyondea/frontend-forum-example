import React from 'react';

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
					<TagCardComponent tag={singleTag.data} classNameContainer={`mb-3`} isSingle />
					<div className="d-flex align-items-center mb-3">
						<h4 className="mr-auto mb-0">Posts</h4>
						<TabPost
							pidTab={pid[1]}
							items={[
								{
									title: 'Feed',
									slug: 'feed',
									href: `/t/${singleTag.data?.slug}/feed`
								},
								{
									title: 'Latest',
									slug: 'latest',
									href: `/t/${singleTag.data?.slug}/latest`
								},
								{
									title: 'Oldest',
									slug: 'oldest',
									href: `/t/${singleTag.data?.slug}/oldest`
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
									<div className="col-12 mb-3" key={post.id}>
										<PostCardComponent post={post} />
									</div>
								))}
							</>
						)}
						<Pagination total={listPostTag.meta?.total} limit={process.env.LIMIT_PAGE.LIST_POST_TAG} />
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
