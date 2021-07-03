import { isEmpty } from 'lodash';
import React from 'react';

import EmptyBox from '@/common/components/EmptyBox/components';
import Pagination from '@/common/components/Pagination/components';
import TabHorizontal from '@/common/components/TabHorizontal/components';
import PostCardComponent from '@/modules/postCard/components';
import SideBarRightComponent from '@/modules/sidebarRight/components';
import TagCardComponent from '@/modules/tagCard/components';

const SingleTagComponent = ({ singleTag, listPostTag, pid }) => {
	return (
		<div className="container-xl py-4">
			<div className="row">
				<div className="col-xl-9 col-md-8">
					<TagCardComponent tag={singleTag.data} classNameContainer={`mb-3`} isSingle />
					<div className="d-flex align-items-center mb-3">
						<h4 className="me-auto mb-0">Posts</h4>
						<TabHorizontal
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
					{isEmpty(listPostTag.data) ? (
						<EmptyBox text="Empty posts" />
					) : (
						<div className="row row-cols-1 g-3 mb-3">
							{listPostTag.data.map((post) => (
								<div className="col" key={post.id}>
									<PostCardComponent post={post} />
								</div>
							))}
						</div>
					)}
					<Pagination total={listPostTag.meta?.total} limit={process.env.LIMIT_PAGE.LIST_POST_TAG} />
				</div>
				<div className="d-none d-md-block col-xl-3 col-md-4">
					<SideBarRightComponent />
				</div>
			</div>
		</div>
	);
};

export default SingleTagComponent;
