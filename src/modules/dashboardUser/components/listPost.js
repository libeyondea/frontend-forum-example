import { isEmpty } from 'lodash';
import React from 'react';

import CustomLink from '@/common/components/CustomLink/components';
import EmptyBox from '@/common/components/EmptyBox/components';
import Pagination from '@/common/components/Pagination/components';
import ListPostMetaComponent from '@/modules/dashboardUser/components/listPostMeta';

const ListPostComponent = ({ listPost }) => {
	return (
		<>
			<h4 className="mb-3">Posts ({listPost?.meta?.total})</h4>
			{isEmpty(listPost.data) ? (
				<EmptyBox text="Empty posts" />
			) : (
				<div className="row row-cols-1 g-3 mb-3">
					{listPost.data.map((post) => (
						<div className="col" key={post.id}>
							<div className="wapper__card d-flex bg-light rounded-3 shadow-sm p-3 flex-column flex-sm-row">
								<div className="d-flex align-items-center me-auto me-1 mb-1 mb-sm-0">
									<CustomLink
										href={`/u/${post.user.user_name}/${post.slug}`}
										className={`text-decoration-none text-dark card-title mb-0 d-block`}
									>
										<h6 className="fw-bold mb-0">{post.title}</h6>
									</CustomLink>
								</div>
								<div className="d-flex align-items-center ms-auto ms-sm-0">
									<ListPostMetaComponent postSlug={post.slug} userName={post.user.user_name} />
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			<Pagination total={listPost?.meta?.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
		</>
	);
};

export default ListPostComponent;
