import React from 'react';

import MetaDefault from '@/common/meta/MetaDefault';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import SettingUserComponent from '@/modules/settingUser/components';

const SettingUser = ({ settingUser, pid }) => {
	return (
		<>
			<MetaDefault title="Settings" />
			<LayoutComponent>
				<SettingUserComponent settingUser={settingUser} pid={pid} />
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
		const resSettingUser = await httpRequest.get({
			url: `/settings/${pid[0] || 'profile'}/edit`,
			token: getCookie('token', req)
		});
		if (resSettingUser.data.success) {
			return {
				props: {
					settingUser: resSettingUser.data,
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

export default SettingUser;
