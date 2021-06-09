import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import Pagination from '@/common/components/Pagination/components';
import isEmpty from '@/common/utils/isEmpty';
import timeAgo from '@/common/utils/timeAgo';

const ListFavoritedPostComponent = ({ listPost }) => {
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
											href="/posts/[pid]"
											as={`/posts/${post.slug}`}
											className={`text-decoration-none text-dark card-title mb-0 d-block`}
										>
											<h6 className="font-weight-bold mb-0">{post.title}</h6>
										</CustomLink>
									</div>
									<div className="d-flex align-items-center ml-auto ml-sm-0">
										<div className="mr-1">
											<CustomLink
												href="/users/[pid]"
												as={`/users/${post.user.user_name}`}
												className="text-decoration-none d-inline-block d-flex align-items-center"
											>
												<CustomImage
													src={`${process.env.IMAGES_URL}/${post.user.avatar}`}
													className="rounded-circle h-100 w-100"
													width={35}
													height={35}
													alt={post.user.user_name}
												/>
											</CustomLink>
										</div>
										<div className="lh-100">
											<div className="d-flex align-items-center">
												<CustomLink
													href="/users/[pid]"
													as={`/users/${post.user.user_name}`}
													className="text-decoration-none text-dark"
												>
													{post.user.user_name}
												</CustomLink>
											</div>
											<span className="text-muted small">{timeAgo(post.created_at)}</span>
										</div>
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

export default ListFavoritedPostComponent;
