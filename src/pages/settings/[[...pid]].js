import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import httpRequest from '@/common/utils/httpRequest';
import parseArray from '@/common/utils/parseArray';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import SettingUserComponent from '@/modules/settingUser/components';

const SettingUser = ({ settingUser, pid }) => {
	return (
		<>
			<MetaWebsite title="Settings" isNoneMeta />
			<LayoutComponent>
				<SettingUserComponent settingUser={settingUser} pid={pid} />
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

export default SettingUser;
