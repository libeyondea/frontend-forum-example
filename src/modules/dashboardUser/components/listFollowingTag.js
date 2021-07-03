import { isEmpty } from 'lodash';
import React from 'react';

import CustomLink from '@/common/components/CustomLink/components';
import EmptyBox from '@/common/components/EmptyBox/components';
import Pagination from '@/common/components/Pagination/components';

const ListFollowingTagComponent = ({ listTag }) => {
	return (
		<>
			<h4 className="mb-3">Tags ({listTag?.meta?.total})</h4>
			{isEmpty(listTag.data) ? (
				<EmptyBox text="Empty following tags" />
			) : (
				<div className="row row-cols-1 row-cols-sm-2 row-cols-sm-3 g-3 mb-3">
					{listTag.data.map((tag) => (
						<div className="col" key={tag.id}>
							<div className={`card h-100`}>
								<div className="p-3">
									<CustomLink
										href={`/t/${tag.slug}`}
										className={`card-title text-decoration-none d-block mb-2 text-dark`}
									>
										<h5 className="fw-bold mb-0">
											<span className="text-secondary">#</span>
											{tag.title}
										</h5>
									</CustomLink>
									<div className="">
										<span className="text-muted small">{tag.total_posts} posts published</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			<Pagination total={listTag?.meta?.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
		</>
	);
};

export default ListFollowingTagComponent;
