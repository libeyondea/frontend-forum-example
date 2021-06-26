import React from 'react';

import CustomLink from '@/common/components/CustomLink/components';
import Pagination from '@/common/components/Pagination/components';
import { isEmpty } from 'lodash';
import ListPostMetaComponent from '@/modules/dashboardUser/components/listPostMeta';

const ListPostComponent = ({ listPost }) => {
	return (
		<>
			<h4 className="mb-3">Posts ({listPost?.meta?.total})</h4>
			<div className="row">
				{isEmpty(listPost.data) ? (
					<div className="col-12">
						<div className="text-center font-weight-bold">
							<span>Empty posts</span>
						</div>
					</div>
				) : (
					<>
						{listPost.data.map((post) => (
							<div className="col-12 mb-3" key={post.id}>
								<div className="wapper__card d-flex bg-light rounded-lg shadow-sm p-3 flex-column flex-sm-row">
									<div className="d-flex align-items-center mr-auto mr-1 mb-1 mb-sm-0">
										<CustomLink
											href={`/u/${post.user.user_name}/${post.slug}`}
											className={`text-decoration-none text-dark card-title mb-0 d-block`}
										>
											<h6 className="font-weight-bold mb-0">{post.title}</h6>
										</CustomLink>
									</div>
									<div className="d-flex align-items-center ml-auto ml-sm-0">
										<ListPostMetaComponent postSlug={post.slug} userName={post.user.user_name} />
									</div>
								</div>
							</div>
						))}
					</>
				)}
				<Pagination total={listPost?.meta?.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
			</div>
		</>
	);
};

export default ListPostComponent;
