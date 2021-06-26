import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import Pagination from '@/common/components/Pagination/components';
import TabPost from '@/common/components/TabPost/components';
import Language from '@/modules/home/languages';
import PostCardComponent from '@/modules/postCard/components';
import SideBarLeftComponent from '@/modules/sidebarLeft/components';
import SideBarRightComponent from '@/modules/sidebarRight/components';

const HomeComponent = ({ listPostGhim, listPost, pid }) => {
	const router = useRouter();
	return (
		<div className="container-xl my-4">
			<div className="row">
				<div className="col-xl-7 col-lg-7 col-md-9 order-xl-2 order-lg-2 order-md-2">
					{!isEmpty(listPostGhim?.data) && (
						<>
							<h4 className="mb-3">Ghim</h4>
							<div className="row">
								{listPostGhim?.data?.map((post) => (
									<div className="col-12 mb-3" key={post?.id}>
										<PostCardComponent post={post} />
									</div>
								))}
							</div>
						</>
					)}
					<div className="d-flex align-items-center mb-3">
						<h4 className="mr-auto mb-0">{Language.titleListPost(router.locale)}</h4>
						<TabPost
							pidTab={pid[0]}
							items={[
								{
									title: 'Feed',
									slug: 'feed',
									href: '/feed'
								},
								{
									title: 'Latest',
									slug: 'latest',
									href: '/latest'
								},
								{
									title: 'Oldest',
									slug: 'oldest',
									href: '/oldest'
								}
							]}
						/>
					</div>
					<div className="row">
						{isEmpty(listPost?.data) ? (
							<div className="col-12">
								<div className="text-center font-weight-bold">
									<span>Empty posts.</span>
								</div>
							</div>
						) : (
							<>
								{listPost?.data?.map((post) => (
									<div className="col-12 mb-3" key={post?.id}>
										<PostCardComponent post={post} />
									</div>
								))}
								<Pagination total={listPost?.meta?.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
							</>
						)}
					</div>
				</div>
				<div className="d-none d-md-block col-xl-2 col-lg-2 col-md-3 order-xl-1 order-lg-1 order-md-1">
					<SideBarLeftComponent />
				</div>
				<div className="d-none d-lg-block col-xl-3 col-lg-3 col-md-12 order-xl-3 order-lg-3 order-md-3">
					<SideBarRightComponent />
				</div>
			</div>
		</div>
	);
};

export default HomeComponent;
