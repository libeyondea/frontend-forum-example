import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb/components';
import LoadingSpinner from '@/common/components/LoadingSpinner/components';
import TabSetting from '@/common/components/TabSetting/components';
import useUser from '@/common/hooks/useUser';
import EditCustomizationComponent from '@/modules/settingUser/components/editCustomization';
import EditProfileFormComponent from '@/modules/settingUser/components/editProfileForm';

const SettingUserComponent = ({ editProfile, pid }) => {
	const { user } = useUser();
	return (
		<div className="container-xl my-4">
			{!editProfile || !user ? (
				<LoadingSpinner />
			) : (
				<>
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
							<TabSetting
								url={`/settings`}
								pidTab={pid[0]}
								items={[
									{
										title: 'Edit porfile',
										slug: 'profile',
										href: '/settings/profile'
									},
									{
										title: 'Customization',
										slug: 'customization',
										href: '/settings/customization'
									}
								]}
							/>
						</div>
						<div className="col-lg-9">
							<div className="bg-light p-4 rounded-lg shadow-sm">
								{(!pid[0] || pid[0] === 'profile') && <EditProfileFormComponent editProfile={editProfile} />}
								{pid[0] === 'customization' && <EditCustomizationComponent />}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default SettingUserComponent;
