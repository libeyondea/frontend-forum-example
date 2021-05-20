import React from 'react';

import CustomLink from '@/components/Common/CustomLink';
import useUser from '@/lib/hooks/useUser';

const EditProfileButton = ({ user_name }) => {
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
export default EditProfileButton;
