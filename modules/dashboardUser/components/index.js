import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb/components';
import LoadingSpinner from '@/common/components/LoadingSpinner/components';
import TabDashboard from '@/common/components/TabDashboard/components';
import useUser from '@/common/hooks/useUser';
import ListFavoritedPostComponent from '@/modules/dashboardUser/components/listFavoritedPost';
import ListFollowingTagComponent from '@/modules/dashboardUser/components/listFollowingTag';
import ListFollowingUserComponent from '@/modules/dashboardUser/components/listFollowingUser';
import ListPostComponent from '@/modules/dashboardUser/components/listPost';
import ListUserFollowerComponent from '@/modules/dashboardUser/components/listUserFollower';

const DashboardUserComponent = ({ dashboardUser, pid }) => {
	const { user } = useUser();
	return (
		<div className="container-xl my-4">
			{!dashboardUser || !user ? (
				<LoadingSpinner />
			) : (
				<>
					<Breadcrumb
						items={[
							{
								title: 'Dashboard',
								href: '/dashboard'
							},
							{
								title:
									!pid[0] || pid[0] === 'posts'
										? 'Posts'
										: pid[0] === 'favorited_posts'
										? 'Favorited posts'
										: pid[0] === 'user_followers'
										? 'Followers'
										: pid[0] === 'following_users'
										? 'Following users'
										: pid[0] === 'following_tags'
										? 'Following tags'
										: null
							}
						]}
					/>
					<div className="row">
						<div className="col-lg-3 mb-4">
							<TabDashboard
								url={`/dashboard`}
								pidTab={pid[0]}
								items={[
									{
										title: 'Posts',
										slug: 'posts',
										href: '/dashboard/posts'
									},
									{
										title: 'Favorited posts',
										slug: 'favorited_posts',
										href: '/dashboard/favorited_posts'
									},
									{
										title: 'Followers',
										slug: 'user_followers',
										href: '/dashboard/user_followers'
									},
									{
										title: 'Following users',
										slug: 'following_users',
										href: '/dashboard/following_users'
									},
									{
										title: 'Following tags',
										slug: 'following_tags',
										href: '/dashboard/following_tags'
									}
								]}
							/>
						</div>
						<div className="col-lg-9">
							{(!pid[0] || pid[0] === 'posts') && <ListPostComponent listPost={dashboardUser} />}
							{pid[0] === 'favorited_posts' && <ListFavoritedPostComponent listPost={dashboardUser} />}
							{pid[0] === 'user_followers' && <ListUserFollowerComponent listUser={dashboardUser} />}
							{pid[0] === 'following_users' && <ListFollowingUserComponent listUser={dashboardUser} />}
							{pid[0] === 'following_tags' && <ListFollowingTagComponent listTag={dashboardUser} />}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default DashboardUserComponent;
