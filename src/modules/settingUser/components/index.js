import React from 'react';

import CustomLink from '@/common/components/CustomLink/components';
import LoadingSpinner from '@/common/components/LoadingSpinner/components';
import TabVertical from '@/common/components/TabVertical/components';
import useUser from '@/common/hooks/useUser';
import EditCustomizationComponent from '@/modules/settingUser/components/editCustomization/components';
import EditProfileFormComponent from '@/modules/settingUser/components/editProfile/components';

const SettingUserComponent = ({ settingUser, pid }) => {
	const { user } = useUser();
	return (
		<div className="container-xl py-4">
			{!settingUser || !user ? (
				<LoadingSpinner />
			) : (
				<>
					<h3 className="mb-4 fw-bold">
						Settings for{' '}
						<CustomLink href={`/u/${user.user_name}`} className="text-decoration-none">
							@{user.user_name}
						</CustomLink>
					</h3>
					<div className="row">
						<div className="col-lg-3 mb-4">
							<TabVertical
								pidTab={pid[0]}
								items={[
									{
										title: 'Profile',
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
							<div className="bg-light p-4 rounded-3 shadow-sm">
								{(!pid[0] || pid[0] === 'profile') && <EditProfileFormComponent editProfile={settingUser} />}
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
