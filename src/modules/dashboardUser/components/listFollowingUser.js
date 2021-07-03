import { isEmpty } from 'lodash';
import React from 'react';

import EmptyBox from '@/common/components/EmptyBox/components';
import Pagination from '@/common/components/Pagination/components';
import UserCardComponent from '@/modules/dashboardUser/components/userCard';

const ListFollowingUserComponent = ({ listUser }) => {
	return (
		<>
			<h4 className="mb-3">Following ({listUser?.meta?.total})</h4>
			{isEmpty(listUser.data) ? (
				<EmptyBox text="Empty following users" />
			) : (
				<div className="row row-cols-1 row-cols-sm-2 row-cols-sm-3 g-3 mb-3">
					{listUser.data.map((user) => (
						<div className="col" key={user.id}>
							<UserCardComponent user={user} />
						</div>
					))}
				</div>
			)}
			<Pagination total={listUser?.meta?.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
		</>
	);
};

export default ListFollowingUserComponent;
