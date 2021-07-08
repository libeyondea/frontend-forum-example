import { isEmpty } from 'lodash';
import React from 'react';

import EmptyBoxComponent from '@/common/components/EmptyBox/components';
import LoadingUser from '@/common/components/LoadingUser/components';
import Pagination from '@/common/components/Pagination/components';
import UserCardComponent from '@/modules/userCard/components';

const ListUserComponent = ({ listUser }) => {
	return (
		<>
			{!listUser ? (
				<LoadingUser classNameContainer="row-cols-lg-2" />
			) : isEmpty(listUser.data) ? (
				<EmptyBoxComponent text="No results match" />
			) : (
				<>
					<div className="row row-cols-1 row-cols-lg-2 g-3 mb-3">
						{listUser.data?.map((user) => (
							<div className="col" key={user.id}>
								<UserCardComponent user={user} />
							</div>
						))}
					</div>
					<Pagination total={listUser.meta.total} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
				</>
			)}
		</>
	);
};

export default ListUserComponent;
