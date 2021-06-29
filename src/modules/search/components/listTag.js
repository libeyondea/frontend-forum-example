import { isEmpty } from 'lodash';
import React from 'react';

import Pagination from '@/common/components/Pagination/components';
import TagCardComponent from '@/modules/tagCard/components';

const ListTagComponent = ({ listTag }) => {
	return (
		<>
			{isEmpty(listTag.data) ? (
				<div className="col-12">
					<div className="text-center font-weight-bold">
						<span>No results match</span>
					</div>
				</div>
			) : (
				listTag.data?.map((tag) => (
					<div className="col-lg-6 mb-3" key={tag.id}>
						<TagCardComponent tag={tag} />
					</div>
				))
			)}
			<Pagination total={listTag.meta.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
		</>
	);
};

export default ListTagComponent;
