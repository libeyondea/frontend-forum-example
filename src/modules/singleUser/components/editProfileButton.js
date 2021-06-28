import React from 'react';

import CustomLink from '@/common/components/CustomLink/components';

const EditProfileButtonComponent = () => {
	return (
		<CustomLink className="btn btn-primary btn-sm" href={`/settings`}>
			Edit profile
		</CustomLink>
	);
};
export default EditProfileButtonComponent;
