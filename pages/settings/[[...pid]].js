import React from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Layout from '@/components/Layout';
import EditCustomization from '@/components/User/EditCustomization';
import EditProfileForm from '@/components/User/EditProfileForm';
import TabUser from '@/components/User/TabUser';
import useUser from '@/lib/hooks/useUser';
import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';

const EditProfile = ({ editProfile, pid }) => {
	const { user } = useUser();
	return (
		<Layout>
			<div className="container my-4">
				<MayBeSpinner test={!editProfile || !user} spinner={<LoadingSpinner />}>
					<Breadcrumb
						items={[
							{
								title: 'Home',
								href: '/'
							},
							{
								title: user?.user_name,
								href: `/users/${user?.user_name}`
							},
							{
								title: 'Settings'
							}
						]}
					/>
					<div className="row">
						<div className="col-lg-3 mb-4">
							<TabUser url={`/settings`} pidTab={pid} />
						</div>
						<div className="col-lg-9">
							<div className="bg-light p-4 rounded-lg shadow-sm">
								{pid === 'profile' && <EditProfileForm editProfile={editProfile} />}
								{pid === 'customization' && <EditCustomization />}
							</div>
						</div>
					</div>
				</MayBeSpinner>
			</div>
		</Layout>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { pid: getPid = [] } = query;
		const pid = getPid[0] || 'profile';
		if (getPid.length > 1) {
			return {
				notFound: true
			};
		}

		const resEditProfile = await httpRequest.get({
			url: `/settings/${pid}/edit`,
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
		return {
			notFound: true
		};
	} catch (error) {
		console.log(error.response.data);
		return {
			notFound: true
		};
	}
}

export default EditProfile;
