import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import HomeComponent from '@/modules/home/components';
import LayoutComponent from '@/modules/layout/components';

const Index = ({ listPostGhim, listPost, pid }) => {
	return (
		<>
			<MetaWebsite isHome />
			<LayoutComponent>
				<HomeComponent listPostGhim={listPostGhim} listPost={listPost} pid={pid} />
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
		if (pid.length > 1) {
			return {
				notFound: true
			};
		}
		const [resListPostGhim, resListPost] = await Promise.all([
			httpRequest.get({
				url: `/posts_ghim`,
				token: getCookie('token', req)
			}),
			httpRequest.get({
				url: '/posts',
				token: getCookie('token', req),
				params: {
					tab: pid[0] || 'feed',
					offset: (page - 1) * process.env.LIMIT_PAGE.LIST_POST_HOME,
					limit: process.env.LIMIT_PAGE.LIST_POST_HOME
				}
			})
		]);
		if (resListPostGhim.data.success && resListPost.data.success) {
			return {
				props: {
					listPostGhim: resListPostGhim.data,
					listPost: resListPost.data,
					pid: pid
				}
			};
		}
	} catch (error) {
		return {
			notFound: true
		};
	}
}

export default Index;
