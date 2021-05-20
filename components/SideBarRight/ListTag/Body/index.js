import React from 'react';
import useSWR from 'swr';

import CustomLink from '@/components/Common/CustomLink';
import EmptySBRight from '@/components/Common/EmptySBRight';
import LoadingSBRight from '@/components/Common/LoadingSBRight';
import isEmpty from '@/lib/utils/isEmpty';

const BodyListTag = () => {
	const { data: listTag } = useSWR(`/tags?offset=0&limit=${process.env.LIMIT_PAGE.LIST_TAG}`, {
		revalidateOnFocus: false
	});

	return (
		<ul className="list-group">
			{!listTag ? (
				<LoadingSBRight />
			) : isEmpty(listTag?.data) ? (
				<EmptySBRight />
			) : (
				listTag?.data?.map((tag) => (
					<li className="list-group-item-custom d-flex align-items-center border-0 px-3 py-2" key={tag.id}>
						<CustomLink href={`/tags/[...pid]`} as={`/tags/${tag.slug}`} className="text-decoration-none">
							<span className="text-secondary">#</span>
							{tag.slug}
						</CustomLink>
					</li>
				))
			)}
		</ul>
	);
};

export default BodyListTag;
