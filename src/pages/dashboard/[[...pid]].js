import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import httpRequest from '@/common/utils/httpRequest';
import pageNumber from '@/common/utils/pageNumber';
import parseArray from '@/common/utils/parseArray';
import { getCookie } from '@/common/utils/session';
import DashboardUserComponent from '@/modules/dashboardUser/components';
import LayoutComponent from '@/modules/layout/components';

const DashboardUser = ({ dashboardUser, pid }) => {
	return (
		<>
			<MetaWebsite title="Dashboard" isNoneMeta />
			<LayoutComponent>
				<DashboardUserComponent dashboardUser={dashboardUser} pid={pid} />
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const pid = parseArray(query.pid);
		if (pid.length > 1) {
			return {
				notFound: true
			};
		}
		const resDashboardUser = await httpRequest.get({
			url: `/dashboard/${pid[0] || 'posts'}`,
			token: getCookie('token', req),
			params: {
				offset: (pageNumber(query.page) - 1) * process.env.LIMIT_PAGE.LIST_POST_HOME,
				limit: process.env.LIMIT_PAGE.LIST_POST_HOME
			}
		});
		if (resDashboardUser.data.success) {
			return {
				props: {
					dashboardUser: resDashboardUser.data,
					pid: pid
				}
			};
		}
	} catch (error) {
		if (error?.response?.status === 401) {
			return {
				redirect: {
					destination: '/login',
					permanent: false
				}
			};
		}
		return {
			notFound: true
		};
	}
}

export default DashboardUser;
