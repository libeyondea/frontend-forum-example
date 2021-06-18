import React from 'react';

import MetaDefault from '@/common/meta/MetaDefault';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import DashboardUserComponent from '@/modules/dashboardUser/components';
import LayoutComponent from '@/modules/layout/components';

const DashboardUser = ({ dashboardUser, pid }) => {
	return (
		<>
			<MetaDefault title="Dashboard" />
			<LayoutComponent>
				<DashboardUserComponent dashboardUser={dashboardUser} pid={pid} />
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const initialPid = query.pid;
		const pid = Array.isArray(initialPid) ? initialPid : [];
		if (pid.length > 1) {
			return {
				notFound: true
			};
		}
		const resDashboardUser = await httpRequest.get({
			url: `/dashboard/${pid[0] || 'posts'}`,
			token: getCookie('token', req)
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
		if (error.response.status === 401) {
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
