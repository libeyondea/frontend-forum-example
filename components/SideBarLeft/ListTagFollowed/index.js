import React, { memo } from 'react';
import useSWR from 'swr';

import CustomLink from '@/components/Common/CustomLink';
import LoadingSBRight from '@/components/Common/LoadingSBRight';
import useUser from '@/lib/hooks/useUser';
import isEmpty from '@/lib/utils/isEmpty';

const ListTagFollowed = () => {
	const { user } = useUser();
	const { data: listTagFollowed } = useSWR(
		user ? `/tags-followed?offset=0&limit=${process.env.LIMIT_PAGE.LIST_TAG_FOLLOWED}` : null,
		{
			revalidateOnFocus: false
		}
	);

	return (
		<>
			{user && (
				<div className="mb-4">
					<div className="px-2 py-2">
						<h5 className="mb-0">My Tags</h5>
					</div>
					<ul className="list-group height-list-group overflow-auto">
						{!listTagFollowed ? (
							<LoadingSBRight />
						) : isEmpty(listTagFollowed?.data) ? (
							<li className="list-group-item-custom-empty d-flex align-items-center border-0 px-2 py-2">Empty tags</li>
						) : (
							listTagFollowed?.data?.map((tag) => (
								<li className="list-group-item-custom d-flex align-items-center border-0 px-2 py-2" key={tag.id}>
									<CustomLink href={`/tags/${tag.slug}`} className="text-decoration-none">
										<span className="text-secondary">#</span>
										{tag.title}
									</CustomLink>
								</li>
							))
						)}
					</ul>
				</div>
			)}
		</>
	);
};

export default memo(ListTagFollowed);
