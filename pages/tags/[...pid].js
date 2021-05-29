import Head from 'next/head';
import React from 'react';

import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import SingleTagComponent from '@/modules/singleTag/components';

const SingleTag = ({ singleTag, listPostTag, pid }) => {
	return (
		<>
			<Head>
				<title>{singleTag.data.title} | De4th Zone</title>
				<meta name="description" content={singleTag.data.content} />
			</Head>
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
		const pid = Array.isArray(initialPid) && initialPid.length <= 2 ? initialPid : [];

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
		return {
			notFound: true
		};
	} catch (error) {
		console.log(error.response);
		return {
			notFound: true
		};
	}
}

export default SingleTag;
