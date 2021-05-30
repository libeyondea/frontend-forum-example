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
		const resListTag = await httpRequest.get({
			url: `/tags`,
			token: getCookie('token', req),
			params: {
				offset: (page - 1) * process.env.LIMIT_PAGE.LIST_TAG,
				limit: process.env.LIMIT_PAGE.LIST_TAG
			}
		});
		if (resListTag.data.success) {
			return {
				props: {
					listTag: resListTag.data
				}
			};
		}
	} catch (error) {
		return {
			notFound: true
		};
	}
}

export default Tags;
