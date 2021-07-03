import { isEmpty } from 'lodash';
import React from 'react';

import Pagination from '@/common/components/Pagination/components';
import UserCardComponent from '@/modules/userCard/components';

const ListUserComponent = ({ listUser }) => {
	return (
		<>
			{isEmpty(listUser.data) ? (
				<div className="col-12">
					<div className="text-center fw-bold">
						<span>No results match</span>
					</div>
				</div>
			) : (
				listUser.data?.map((user) => (
					<div className="col-lg-6 mb-3" key={user.id}>
						<UserCardComponent user={user} />
					</div>
				))
			)}
			<Pagination total={listUser.meta.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
		</>
	);
};

export default ListUserComponent;
