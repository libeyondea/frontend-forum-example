import React, { memo } from 'react';
import useSWR from 'swr';

import CustomLink from '@/components/Common/CustomLink';
import EmptySBRight from '@/components/Common/EmptySBRight';
import LoadingSBRight from '@/components/Common/LoadingSBRight';
import isEmpty from '@/lib/utils/isEmpty';

const BodyListCategory = () => {
	const { data: listCategory } = useSWR(`/categories?offset=0&limit=${process.env.LIMIT_PAGE.LIST_CATEGORY}`, {
		revalidateOnFocus: false
	});

	return (
		<ul className="list-group">
			{!listCategory ? (
				<LoadingSBRight />
			) : isEmpty(listCategory?.data) ? (
				<EmptySBRight />
			) : (
				listCategory?.data?.map((category) => (
					<li className="list-group-item-custom d-flex align-items-center px-3 py-2" key={category.id}>
						<CustomLink
							href={`/categories/[...pid]`}
							as={`/categories/${category.slug}`}
							className="text-decoration-none"
						>
							{category.title}
						</CustomLink>
						<span className="badge badge-default badge-pill">{category.total_posts}</span>
					</li>
				))
			)}
		</ul>
	);
};

export default memo(BodyListCategory);
