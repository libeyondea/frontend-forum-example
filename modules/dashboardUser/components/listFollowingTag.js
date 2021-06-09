import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import Pagination from '@/common/components/Pagination/components';
import isEmpty from '@/common/utils/isEmpty';

const ListFollowingTagComponent = ({ listTag }) => {
	return (
		<>
			<h4 className="mb-3">Tags ({listTag?.meta?.total})</h4>
			<div className="row">
				{isEmpty(listTag.data) ? (
					<div className="col-12">
						<div className="text-center font-weight-bold">
							<span>Empty following tags</span>
						</div>
					</div>
				) : (
					<>
						{listTag.data.map((tag) => (
							<div className="col-md-4 col-sm-6 mb-3" key={tag.id}>
								<div className={`card h-100`}>
									<div className="p-3">
										<CustomLink
											href={`/tags/${tag.slug}`}
											className={`card-title text-decoration-none d-block mb-2 text-dark`}
										>
											<h5 className="font-weight-bold mb-0">
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
					</>
				)}
				<Pagination total={listTag?.meta?.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
			</div>
		</>
	);
};

export default ListFollowingTagComponent;
