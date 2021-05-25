import React, { memo } from 'react';
import useSWR from 'swr';

import CustomLink from '@/common/components/CustomLink/components';
import isEmpty from '@/common/utils/isEmpty';
import style from '@/modules/sidebarRight/components/listCategory/styles/style.module.scss';

const ListCategoryComponent = () => {
	const { data: listCategory } = useSWR(`/categories?offset=0&limit=${process.env.LIMIT_PAGE.LIST_CATEGORY}`, {
		revalidateOnFocus: false
	});

	return (
		<div className="bg-light rounded-lg shadow-sm border mb-4">
			<div className="px-3 py-2 border-bottom">
				<h5 className="mb-0">Categories</h5>
			</div>
			<ul className="list-group">
				{!listCategory ? (
					<li className="loading-animation py-3 d-flex"></li>
				) : isEmpty(listCategory?.data) ? (
					<li className={`bg-light d-flex align-items-center border-0 px-3 py-2 ${style.list_group_item_custom}`}>
						Empty Categories
					</li>
				) : (
					listCategory?.data?.map((category) => (
						<li
							className={`bg-light border-bottom d-flex align-items-center px-3 py-2 ${style.list_group_item_custom}`}
							key={category.id}
						>
							<CustomLink
								href={`/categories/[...pid]`}
								as={`/categories/${category.slug}`}
								className="text-decoration-none text-dark mr-2"
							>
								{category.title}
							</CustomLink>
							<span className="badge badge-pill badge-secondary">{category.total_posts}</span>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default memo(ListCategoryComponent);
