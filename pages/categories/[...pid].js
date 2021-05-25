import React from 'react';

import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import SingleCategoryComponent from '@/modules/singleCategory/components';

const SingleCategory = ({ singleCategory, listPostCategory, pid }) => {
	return (
		<LayoutComponent>
			<SingleCategoryComponent singleCategory={singleCategory} listPostCategory={listPostCategory} pid={pid} />
		</LayoutComponent>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const initialpage = query.page;
		const initialPid = query.pid;
		const page = Number.isInteger(parseInt(initialpage)) && initialpage >= 1 ? initialpage : 1;
		const pid = Array.isArray(initialPid) && initialPid.length <= 2 ? initialPid : [];

		const [resSingleCategory, resListPostCtegory] = await Promise.all([
			httpRequest.get({
				url: `/categories/${pid[0]}`,
				token: getCookie('token', req)
			}),
			httpRequest.get({
				url: '/posts',
				token: getCookie('token', req),
				params: {
					category: pid[0],
					tab: pid[1] || 'feed',
					offset: (page - 1) * process.env.LIMIT_PAGE.LIST_POST_TAG,
					limit: process.env.LIMIT_PAGE.LIST_POST_TAG
				}
			})
		]);
		if (resSingleCategory.data.success && resListPostCtegory.data.success) {
			return {
				props: {
					singleCategory: resSingleCategory.data,
					listPostCategory: resListPostCtegory.data,
					pid: pid
				}
			};
		}
		return {
			notFound: true
		};
	} catch (error) {
		console.log(error);
		return {
			notFound: true
		};
	}
}
export default SingleCategory;
