import { isEmpty } from 'lodash';
import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import Pagination from '@/common/components/Pagination/components';

const ListFollowingUserComponent = ({ listUser }) => {
	return (
		<>
			<h4 className="mb-3">Following ({listUser?.meta?.total})</h4>
			{isEmpty(listUser.data) ? (
				<div className="row">
					<div className="col-12">
						<div className="text-center font-weight-bold">
							<span>Empty following users</span>
						</div>
					</div>
				</div>
			) : (
				<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
					{listUser.data.map((user) => (
						<div className="col mb-3" key={user.id}>
							<div className="wapper__card bg-light rounded-lg shadow-sm p-4 text-center h-100">
								<CustomLink
									href={`/u/${user.user_name}`}
									className="text-decoration-none d-inline-block d-flex align-items-center justify-content-center"
								>
									<CustomImage
										src={`${process.env.IMAGES_URL}/${user.avatar}`}
										className="rounded-circle h-100 w-100"
										width={66}
										height={66}
										alt={user.user_name}
									/>
								</CustomLink>
								<div className="mt-2">
									<h6 className="mb-0">
										<CustomLink href={`/u/${user.user_name}`} className="text-decoration-none">
											{user.user_name}
										</CustomLink>
									</h6>
								</div>
							</div>
						</div>
					))}
					<Pagination total={listUser?.meta?.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
				</div>
			)}
		</>
	);
};

export default ListFollowingUserComponent;
