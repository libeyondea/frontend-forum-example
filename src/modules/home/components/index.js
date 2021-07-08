import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import EmptyBox from '@/common/components/EmptyBox/components';
import Pagination from '@/common/components/Pagination/components';
import TabHorizontal from '@/common/components/TabHorizontal/components';
import Language from '@/modules/home/languages';
import SideBarLeftComponent from '@/modules/layout/components/sidebarLeft/components';
import SideBarRightComponent from '@/modules/layout/components/sidebarRight/components';
import PostCardComponent from '@/modules/postCard/components';

const HomeComponent = ({ listPostPinned, listPost, pid }) => {
	const router = useRouter();
	return (
		<div className="container-xl py-4">
			<div className="row">
				<div className="col-xl-2 col-lg-2 col-md-3 d-none d-md-block">
					<SideBarLeftComponent />
				</div>
				<div className="col-xl-7 col-lg-7 col-md-9">
					{!isEmpty(listPostPinned?.data) && (
						<>
							<h4 className="mb-3">{Language.titleListPostPinned(router.locale)}</h4>
							<div className="row row-cols-1 g-3 mb-3">
								{listPostPinned?.data?.map((post) => (
									<div className="col" key={post?.id}>
										<PostCardComponent post={post} />
									</div>
								))}
							</div>
						</>
					)}
					<div className="d-flex align-items-center mb-3">
						<h4 className="me-auto mb-0">{Language.titleListPost(router.locale)}</h4>
						<TabHorizontal
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
					{isEmpty(listPost?.data) ? (
						<EmptyBox text="Empty posts" />
					) : (
						<div className="row row-cols-1 g-3 mb-3">
							{listPost?.data?.map((post) => (
								<div className="col" key={post?.id}>
									<PostCardComponent post={post} />
								</div>
							))}
						</div>
					)}
					<Pagination total={listPost?.meta?.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
				</div>
				<div className="col-xl-3 col-lg-3 col-md-12 d-none d-lg-block">
					<SideBarRightComponent />
				</div>
			</div>
		</div>
	);
};

export default HomeComponent;
