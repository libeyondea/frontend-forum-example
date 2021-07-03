import { isEmpty } from 'lodash';
import React from 'react';

import EmptyBoxComponent from '@/common/components/EmptyBox/components';
import Pagination from '@/common/components/Pagination/components';
import SideBarLeftComponent from '@/modules/sidebarLeft/components';
import TagCardComponent from '@/modules/tagCard/components';

const ListTag = ({ listTag }) => {
	return (
		<div className="container-xl py-4">
			<div className="row">
				<div className="col-xl-10 col-md-9 order-md-2">
					<h1 className="mb-3">Tags</h1>
					{isEmpty(listTag.data) ? (
						<EmptyBoxComponent text="Empty tags" />
					) : (
						<div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-3 mb-3">
							{listTag.data?.map((tag) => (
								<div className="col" key={tag.id}>
									<TagCardComponent tag={tag} />
								</div>
							))}
						</div>
					)}
					<Pagination total={listTag.meta?.total} limit={process.env.LIMIT_PAGE.LIST_TAG} />
				</div>
				<div className="d-none d-md-block col-xl-2 col-md-3 order-md-1">
					<SideBarLeftComponent />
				</div>
			</div>
		</div>
	);
};

export default ListTag;
