import { isEmpty } from 'lodash';
import React, { memo } from 'react';
import useSWR from 'swr';

import CustomLink from '@/common/components/CustomLink/components';
import style from '@/modules/layout/components/sidebarRight/components/listCategory/styles/style.module.scss';

const ListCategoryComponent = () => {
	const { data: listCategory } = useSWR(`/categories?offset=0&limit=${process.env.LIMIT_PAGE.LIST_CATEGORY}`, {
		revalidateOnFocus: false
	});

	return (
		<>
			{!listCategory ? (
				<div className="wapper__card bg-light rounded-3 shadow-sm border mb-4">
					<ul className="list-group">
						<li className="loading-animation py-3 d-flex"></li>
					</ul>
				</div>
			) : (
				!isEmpty(listCategory?.data) && (
					<div className="wapper__card bg-light rounded-3 shadow-sm border mb-4">
						<div className="px-3 py-2 border-bottom">
							<h5 className="mb-0">Categories</h5>
						</div>
						<ul className="list-group">
							{listCategory?.data?.map((category) => (
								<li className={`bg-light border-bottom px-3 py-2 ${style.list_group_item_custom}`} key={category.id}>
									<CustomLink href={`/c/${category.slug}`} className="text-decoration-none text-dark me-2">
										{category.title}
									</CustomLink>
									<span className="badge bg-secondary">{category.total_posts}</span>
								</li>
							))}
						</ul>
					</div>
				)
			)}
		</>
	);
};

export default memo(ListCategoryComponent);
