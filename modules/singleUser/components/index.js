import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb/components';
import CustomImage from '@/common/components/CustomImage/components';
import EditProfileButtonComponent from '@/modules/singleUser/components/editProfileButton';
import FollowUserButtonComponent from '@/modules/singleUser/components/followUserButton';
import ListPostUserComponent from '@/modules/singleUser/components/listPostUser';

const SingleUserComponent = ({ singleUser, listPostUser }) => {
	return (
		<div className="container-xl my-4">
			<Breadcrumb
				items={[
					{
						title: 'Home',
						href: '/'
					},
					{
						title: 'Users',
						href: '/users'
					},
					{
						title: singleUser.data?.user_name
					}
				]}
			/>
			<div className="row">
				<div className="col-lg-3 col-md-4 mb-4">
					<div className="text-center bg-light rounded-lg shadow-sm mb-4 p-4">
						<div className="mb-1">
							<CustomImage
								src={`${process.env.IMAGES_URL}/${singleUser.data?.avatar}`}
								alt={singleUser.data?.user_name}
								className="avatar rounded-circle img-thumbnail"
								width="192"
								height="192"
							/>
						</div>
						<h4 className="text-break mb-0">
							{singleUser.data?.first_name} {singleUser.data?.last_name}
						</h4>
						<p className="text-break text-secondary mb-1">{singleUser.data?.user_name}</p>
						<div>
							<EditProfileButtonComponent user_name={singleUser.data?.user_name} />
						</div>
						<div>
							<FollowUserButtonComponent
								user_name={singleUser.data?.user_name}
								following={singleUser.data?.following}
							/>
						</div>
						<div className="mt-1">
							{singleUser.data?.total_user_followers} <span className="text-secondary">followers</span> ·{' '}
							{singleUser.data?.total_following_users} <span className="text-secondary">following</span>
						</div>
					</div>
					<div className="card mb-4">
						<div className="card-header">
							Website <i className="fa fa-link fa-1x" />
						</div>
						<div className="card-body">
							<a href="https://de4thzone.com">de4thzone.com</a>
						</div>
					</div>
					<ul className="list-group mb-4 rounded-lg shadow-sm">
						<li className="list-group-item text-muted">
							Activity <i className="fa fa-dashboard fa-1x" />
						</li>
						<li className="list-group-item text-right">
							<span className="pull-left">
								<strong>Posts published</strong>
							</span>
							{singleUser.data?.total_posts}
						</li>
						<li className="list-group-item text-right">
							<span className="pull-left">
								<strong>Comment written</strong>
							</span>
							{singleUser.data?.total_comments}
						</li>
						<li className="list-group-item text-right">
							<span className="pull-left">
								<strong>Likes</strong>
							</span>
							{singleUser.data?.total_favorited}
						</li>
						<li className="list-group-item text-right">
							<span className="pull-left">
								<strong>Tags followed</strong>
							</span>
							{singleUser.data?.total_tags_followed}
						</li>
					</ul>
					<div className="card">
						<div className="card-header">Social Media</div>
						<div className="card-body">
							<i className="fa fa-facebook fa-2x mr-1" />
							<i className="fa fa-github fa-2x mr-1" />
							<i className="fa fa-twitter fa-2x mr-1" />
							<i className="fa fa-pinterest fa-2x mr-1" />
							<i className="fa fa-google-plus fa-2x" />
						</div>
					</div>
				</div>
				<div className="col-lg-9 col-md-8">
					<ListPostUserComponent listPostUser={listPostUser} />
				</div>
			</div>
		</div>
	);
};

export default SingleUserComponent;
