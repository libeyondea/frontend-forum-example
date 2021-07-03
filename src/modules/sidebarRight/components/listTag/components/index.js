import React from 'react';
import useSWR from 'swr';

import CustomLink from '@/common/components/CustomLink/components';
import { isEmpty } from 'lodash';
import style from '@/modules/sidebarRight/components/listTag/styles/style.module.scss';

const ListTagComponent = () => {
	const { data: listTag } = useSWR(`/tags_with_posts?offset=0&limit=5`, {
		revalidateOnFocus: false
	});

	return (
		<>
			{!listTag ? (
				<div className="wapper__card bg-light rounded-3 shadow-sm border">
					<ul className="list-group">
						<li className="loading-animation py-3 d-flex"></li>
					</ul>
				</div>
			) : (
				!isEmpty(listTag?.data) &&
				listTag?.data?.map((tag) => (
					<div className="wapper__card bg-light rounded-3 shadow-sm border mb-4" key={tag.id}>
						<div className="px-3 py-2 border-bottom">
							<h5 className="mb-0">
								<CustomLink href={`/t/${tag.slug}`} className="text-decoration-none d-inline-block fw-bold text-dark">
									#{tag.slug}
								</CustomLink>
							</h5>
						</div>
						<ul className="list-group">
							{tag?.posts?.map((post) => (
								<li className={`bg-light border-bottom px-3 py-2 ${style.list_group_item_custom}`} key={post.id}>
									<CustomLink
										href={`/u/${post.user.user_name}/${post.slug}`}
										className="text-decoration-none text-dark"
									>
										{post.title}
									</CustomLink>
									{post.total_comments > 0 && (
										<div className={`small ${style.tags}`}>
											<CustomLink
												href={`/u/${post.user.user_name}/${post.slug}#comment-post`}
												className="p-1 text-decoration-none d-inline-block text-secondary"
											>
												{post.total_comments} comments
											</CustomLink>
										</div>
									)}
								</li>
							))}
						</ul>
					</div>
				))
			)}
		</>
	);
};

export default ListTagComponent;
