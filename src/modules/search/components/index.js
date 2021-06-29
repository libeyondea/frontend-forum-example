import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import LoadingPost from '@/common/components/LoadingPost/components';
import LoadingSpinner from '@/common/components/LoadingSpinner/components';
import LoadingTag from '@/common/components/LoadingTag/components';
import TabVertical from '@/common/components/TabVertical/components';
import ListPostComponent from '@/modules/search/components/listPost';
import ListTagComponent from '@/modules/search/components/listTag';

const SearchComponent = () => {
	const { query } = useRouter();
	const q = query?.q || '';
	const type = query?.type || 'post';

	const { data: listSearch } = useSWR(
		`/search?offset=0&limit=${process.env.LIMIT_PAGE.LIST_POST_HOME}&search_fields=${q}&type=${type}&sort=latest`,
		{
			revalidateOnFocus: false
		}
	);

	return (
		<div className="container-xl my-4">
			<h3 className="mb-4 font-weight-bold">Search results</h3>
			<div className="row">
				<div className="col-lg-3 mb-4">
					<TabVertical
						pidTab={type}
						items={[
							{
								title: 'Posts',
								slug: 'post',
								href: `/search?q=${q}&type=post`
							},
							{
								title: 'Users',
								slug: 'user',
								href: `/search?q=${q}&type=user`
							},
							{
								title: 'Comments',
								slug: 'comment',
								href: `/search?q=${q}&type=comment`
							},
							{
								title: 'My posts',
								slug: 'my_post',
								href: `/search?q=${q}&type=my_post`
							},
							{
								title: 'Tags',
								slug: 'tag',
								href: `/search?q=${q}&type=tag`
							}
						]}
					/>
				</div>
				<div className="col-lg-9">
					<div className="row">
						{type === 'post' && <>{!listSearch ? <LoadingPost /> : <ListPostComponent listPost={listSearch} />}</>}
						{type === 'tag' && <>{!listSearch ? <LoadingTag /> : <ListTagComponent listTag={listSearch} />}</>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchComponent;
