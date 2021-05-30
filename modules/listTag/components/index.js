import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb/components';
import Pagination from '@/common/components/Pagination/components';
import isEmpty from '@/common/utils/isEmpty';
import SideBarLeftComponent from '@/modules/sidebarLeft/components';
import TagCardComponent from '@/modules/tagCard/components';

const ListTag = ({ listTag }) => {
	return (
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
					<div className="row">
						{isEmpty(listTag.data) ? (
							<div className="col-12">
								<div className="text-center font-weight-bold">
									<span>Empty tags.</span>
								</div>
							</div>
						) : (
							<>
								{listTag.data?.map((tag) => (
									<div className="col-lg-6 mb-4" key={tag.id}>
										<TagCardComponent tag={tag} />
									</div>
								))}
							</>
						)}
						<Pagination total={listTag.meta?.total} limit={process.env.LIMIT_PAGE.LIST_TAG} />
					</div>
				</div>
				<div className="d-none d-md-block col-xl-2 col-md-3 order-md-1">
					<SideBarLeftComponent />
				</div>
			</div>
		</div>
	);
};

export default ListTag;
