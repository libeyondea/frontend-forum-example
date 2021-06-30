import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import useUser from '@/common/hooks/useUser';
import timeAgo from '@/common/utils/timeAgo';
import EditProfileButtonComponent from '@/modules/singleUser/components/editProfileButton';
import FollowUserButtonComponent from '@/modules/singleUser/components/followUserButton';
import style from '@/modules/userCard/styles/style.module.scss';

const UserCardComponent = ({ user }) => {
	const { user: userMe } = useUser();
	return (
		<div className={`card shadow-sm ${style.user_card}`}>
			<div className="p-3">
				<div className="mb-2">
					<div className="d-flex align-items-center">
						<div className="mr-1">
							<CustomLink
								href={`/u/${user.user_name}`}
								className="text-decoration-none d-inline-block d-flex align-items-center"
							>
								<CustomImage
									src={`${process.env.IMAGES_URL}/${user.avatar}`}
									className="rounded-circle h-100 w-100"
									width={33}
									height={33}
									alt={user.user_name}
									layout="fixed"
								/>
							</CustomLink>
						</div>
						<div className="lh-100">
							<div className="d-flex align-items-center">
								<CustomLink href={`/u/${user.user_name}`} className="text-decoration-none text-dark">
									{user.user_name}
								</CustomLink>
							</div>
						</div>
					</div>
				</div>
				<div className={`${style.body_user_card}`}>
					<CustomLink
						href={`/u/${user.user_name}`}
						className={`text-decoration-none text-dark card-title mb-2 d-block ${style.title_user_card}`}
					>
						<h5 className="font-weight-bold mb-0">
							{user.first_name} {user.last_name}
						</h5>
					</CustomLink>
					<div className="d-flex justify-content-end align-items-center">
						{user && user?.user_name === userMe?.user_name && (
							<div>
								<EditProfileButtonComponent />
							</div>
						)}
						{user?.user_name !== userMe?.user_name && (
							<div>
								<FollowUserButtonComponent user_name={user?.user_name} following={user?.following} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCardComponent;
