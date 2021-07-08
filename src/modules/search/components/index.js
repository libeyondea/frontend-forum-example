import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

import EmptyBoxComponent from '@/common/components/EmptyBox/components';
import LoadingPost from '@/common/components/LoadingPost/components';
import TabHorizontalComponent from '@/common/components/TabHorizontal/components';
import TabVertical from '@/common/components/TabVertical/components';
import useUser from '@/common/hooks/useUser';
import ListCommentComponent from '@/modules/search/components/listComment';
import ListPostComponent from '@/modules/search/components/listPost';
import ListTagComponent from '@/modules/search/components/listTag';
import ListUserComponent from '@/modules/search/components/listUser';

const SearchComponent = () => {
	const { user } = useUser();
	const { query } = useRouter();
	const q = query?.q || '';
	const type = query?.type || 'post';
	const sort = query?.sort === 'latest' ? 'desc' : query?.sort === 'oldest' ? 'asc' : 'desc';

	const { data: listSearch, error } = useSWR(
		`/search?offset=0&limit=${process.env.LIMIT_PAGE.LIST_POST_HOME}&search_fields=${q}&type=${type}&sort_direction=${sort}`,
		{
			revalidateOnFocus: false
		}
	);

	return (
		<div className="container-xl py-4">
			<h3 className="mb-4 fw-bold">Search results</h3>
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
								title: 'Tags',
								slug: 'tag',
								href: `/search?q=${q}&type=tag`
							},
							user
								? {
										title: 'My posts',
										slug: 'my_post',
										href: `/search?q=${q}&type=my_post`
								  }
								: {}
						]}
					/>
				</div>
				<div className="col-lg-9">
					<div className="d-flex align-items-center mb-3">
						<div className="ms-auto">
							<TabHorizontalComponent
								pidTab={query?.sort}
								items={[
									{
										title: 'Latest',
										slug: 'latest',
										href: `/search?q=${q}&type=${type}&sort=latest`
									},
									{
										title: 'Oldest',
										slug: 'oldest',
										href: `/search?q=${q}&type=${type}&sort=oldest`
									}
								]}
							/>
						</div>
					</div>
					{!error?.response?.data?.success && error?.response?.data?.error?.status === 422 ? (
						<EmptyBoxComponent text="Please enter a search keyword" />
					) : (
						<>
							{(type === 'post' || (type === 'my_post' && user)) && <ListPostComponent listPost={listSearch} />}
							{type === 'tag' && <ListTagComponent listTag={listSearch} />}
							{type === 'user' && <ListUserComponent listUser={listSearch} />}
							{type === 'comment' && <ListCommentComponent listComment={listSearch} />}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchComponent;
