import React from 'react';

import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import SingleUserComponent from '@/modules/singleUser/components';

const SingleUser = ({ singleUser, listPostUser }) => {
	return (
		<LayoutComponent>
			<SingleUserComponent singleUser={singleUser} listPostUser={listPostUser} />
		</LayoutComponent>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const initialpage = query.page;
		const user_name = query.user_name;
		const page = Number.isInteger(parseInt(initialpage)) && initialpage >= 1 ? initialpage : 1;

		const [resSingleUser, resListPostUser] = await Promise.all([
			httpRequest.get({
				url: `/users/${user_name}`,
				token: getCookie('token', req)
			}),
			httpRequest.get({
				url: '/posts',
				token: getCookie('token', req),
				params: {
					user: user_name,
					offset: (page - 1) * process.env.LIMIT_PAGE.LIST_POST_USER,
					limit: process.env.LIMIT_PAGE.LIST_POST_USER
				}
			})
		]);
		if (resSingleUser.data.success && resListPostUser.data.success) {
			return {
				props: {
					singleUser: resSingleUser.data,
					listPostUser: resListPostUser.data
				}
			};
		}
	} catch (error) {
		return {
			notFound: true
		};
	}
}

export default SingleUser;
