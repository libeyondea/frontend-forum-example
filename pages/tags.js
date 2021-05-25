import React from 'react';

import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import ListTag from '@/modules/listTag/components';

const Tags = ({ listTag }) => {
	return (
		<LayoutComponent>
			<ListTag listTag={listTag} />
		</LayoutComponent>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { page } = query;
		const response = await httpRequest.get({
			url: `/tags`,
			token: getCookie('token', req),
			params: {
				offset: (page - 1) * process.env.LIMIT_PAGE.LIST_TAG,
				limit: process.env.LIMIT_PAGE.LIST_TAG
			}
		});
		return {
			props: {
				listTag: response.data
			}
		};
	} catch (error) {
		console.log(error.response.data);
		return {
			props: {
				listTag: {}
			}
		};
	}
}

export default Tags;
