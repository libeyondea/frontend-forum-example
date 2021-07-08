import { isEmpty } from 'lodash';
import React from 'react';

import EmptyBoxComponent from '@/common/components/EmptyBox/components';
import LoadingTag from '@/common/components/LoadingTag/components';
import Pagination from '@/common/components/Pagination/components';
import TagCardComponent from '@/modules/tagCard/components';

const ListTagComponent = ({ listTag }) => {
	return (
		<>
			{!listTag ? (
				<LoadingTag classNameContainer="row-cols-lg-2" />
			) : isEmpty(listTag.data) ? (
				<EmptyBoxComponent text="No results match" />
			) : (
				<>
					<div className="row row-cols-1 row-cols-lg-2 g-3 mb-3">
						{listTag.data?.map((tag) => (
							<div className="col" key={tag.id}>
								<TagCardComponent tag={tag} />
							</div>
						))}
					</div>
					<Pagination total={listTag.meta.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
				</>
			)}
		</>
	);
};

export default ListTagComponent;
