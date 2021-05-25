import React from 'react';
import useSWR from 'swr';

import CustomLink from '@/common/components/CustomLink/components';
import isEmpty from '@/common/utils/isEmpty';

const ListTagComponent = () => {
	const { data: listTag } = useSWR(`/tags?offset=0&limit=${process.env.LIMIT_PAGE.LIST_TAG}`, {
		revalidateOnFocus: false
	});

	return (
		<div className="bg-light rounded-lg shadow-sm border mb-4">
			<div className="px-3 py-2 border-bottom">
				<h5 className="mb-0">Popular tags</h5>
			</div>
			<ul className="list-group">
				{!listTag ? (
					<li className="loading-animation py-3 d-flex"></li>
				) : isEmpty(listTag?.data) ? (
					<li className="list-group-item bg-light d-flex align-items-center border-0 px-3 py-2">Empty tags</li>
				) : (
					listTag?.data?.map((tag) => (
						<li className="list-group-item bg-light d-flex align-items-center border-0 px-3 py-2" key={tag.id}>
							<CustomLink href={`/tags/[...pid]`} as={`/tags/${tag.slug}`} className="text-decoration-none text-dark">
								<span className="text-secondary">#</span>
								{tag.slug}
							</CustomLink>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default ListTagComponent;
