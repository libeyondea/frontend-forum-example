import React from 'react';

import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import SettingUserComponent from '@/modules/settingUser/components';

const EditProfile = ({ editProfile, pid }) => {
	return (
		<LayoutComponent>
			<SettingUserComponent editProfile={editProfile} pid={pid} />
		</LayoutComponent>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const initialPid = query.pid;
		const pid = Array.isArray(initialPid) && initialPid.length <= 1 ? initialPid : [];

		const resEditProfile = await httpRequest.get({
			url: `/settings/${pid[0] || 'profile'}/edit`,
			token: getCookie('token', req)
		});
		if (resEditProfile.data.success) {
			return {
				props: {
					editProfile: resEditProfile.data,
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

export default EditProfile;
