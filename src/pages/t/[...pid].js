import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import SingleTagComponent from '@/modules/singleTag/components';

const SingleTag = ({ singleTag, listPostTag, pid }) => {
	return (
		<>
			<MetaWebsite title={singleTag.data.title} description={singleTag.data.content} />
			<LayoutComponent>
				<SingleTagComponent singleTag={singleTag} listPostTag={listPostTag} pid={pid} />
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const initialpage = query.page;
		const initialPid = query.pid;
		const page = Number.isInteger(parseInt(initialpage)) && initialpage >= 1 ? initialpage : 1;
		const pid = Array.isArray(initialPid) ? initialPid : [];
		if (pid.length > 2) {
			return {
				notFound: true
			};
		}
		const [resSingleTag, resListPostTag] = await Promise.all([
			httpRequest.get({
				url: `/tags/${pid[0]}`,
				token: getCookie('token', req)
			}),
			httpRequest.get({
				url: '/posts',
				token: getCookie('token', req),
				params: {
					tag: pid[0],
					tab: pid[1] || 'feed',
					offset: (page - 1) * process.env.LIMIT_PAGE.LIST_POST_TAG,
					limit: process.env.LIMIT_PAGE.LIST_POST_TAG
				}
			})
		]);
		if (resSingleTag.data.success && resListPostTag.data.success) {
			return {
				props: {
					singleTag: resSingleTag.data,
					listPostTag: resListPostTag.data,
					pid: pid
				}
			};
		}
	} catch (error) {
		console.log(error.response.data);
		return {
			notFound: true
		};
	}
}

export default SingleTag;
