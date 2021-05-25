import React from 'react';

import CustomLink from '@/common/components/CustomLink/components';
import useUser from '@/common/hooks/useUser';

const EditProfileButtonComponent = ({ user_name }) => {
	const { user } = useUser();

	if (!user || user_name !== user?.user_name) {
		return null;
	}

	return (
		<CustomLink className="btn btn-primary" href={`/settings`}>
			Edit profile
		</CustomLink>
	);
};
export default EditProfileButtonComponent;
