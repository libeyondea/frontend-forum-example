import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import httpRequest from '@/common/utils/httpRequest';
import pageNumber from '@/common/utils/pageNumber';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import ListTag from '@/modules/listTag/components';

const Tags = ({ listTag }) => {
	return (
		<>
			<MetaWebsite title="Tags" />
			<LayoutComponent>
				<ListTag listTag={listTag} />
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const resListTag = await httpRequest.get({
			url: `/tags`,
			token: getCookie('token', req),
			params: {
				offset: (pageNumber(query.page) - 1) * process.env.LIMIT_PAGE.LIST_TAG,
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
