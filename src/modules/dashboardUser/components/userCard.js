import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';

const UserCardComponent = ({ user }) => {
	return (
		<div className="wapper__card bg-light rounded-3 shadow-sm p-4 text-center h-100">
			<CustomLink
				href={`/u/${user.user_name}`}
				className="text-decoration-none d-inline-block d-flex align-items-center justify-content-center"
			>
				<CustomImage
					src={`${process.env.IMAGES_URL}/${user.avatar}`}
					className="rounded-circle h-100 w-100"
					width={66}
					height={66}
					alt={user.user_name}
				/>
			</CustomLink>
			<div className="mt-2">
				<h5 className="mb-2">
					<CustomLink href={`/u/${user.user_name}`} className="text-decoration-none">
						{user.first_name} {user.last_name}
					</CustomLink>
				</h5>
				<p className="m-0">
					<CustomLink href={`/u/${user.user_name}`} className="text-decoration-none text-secondary">
						{user.user_name}
					</CustomLink>
				</p>
			</div>
		</div>
	);
};

export default UserCardComponent;
