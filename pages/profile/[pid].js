import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumb from '@/components/Common/Breadcrumb';
import CustomImage from '@/components/Common/CustomImage';
import CustomLink from '@/components/Common/CustomLink';
import Layout from '@/components/Common/Layout';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import Maybe from '@/components/Common/Maybe';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import FollowUserButton from '@/components/User/FollowUserButton';
import ListPostUser from '@/components/User/ListPostUser';
import { listPostUserRequestedAction } from '@/redux/actions/postAction';
import {
	followUserRequestedAction,
	singleUserRequestedAction,
	unFollowUserRequestedAction
} from '@/redux/actions/userAction';

const Profile = () => {
	const dispatch = useDispatch();
	const login = useSelector((state) => state.users.login);
	const singleUser = useSelector((state) => state.users.single_user);
	const router = useRouter();
	const {
		query: { page, pid },
		isReady
	} = router;

	useEffect(() => {
		if (isReady) {
			dispatch(singleUserRequestedAction(pid));
		}
	}, [dispatch, pid, isReady]);

	useEffect(() => {
		if (isReady) {
			dispatch(listPostUserRequestedAction(pid, page));
		}
	}, [dispatch, pid, page, isReady]);

	const handleFollow = () => {
		dispatch(followUserRequestedAction(singleUser.user?.user_name));
	};

	const handleUnfollow = () => {
		dispatch(unFollowUserRequestedAction(singleUser.user?.user_name));
	};

	return (
		<Layout>
			<div className="container my-4">
				<MayBeSpinner test={singleUser.is_loading || !singleUser.user} spinner={<LoadingSpinner />}>
					<Breadcrumb
						items={[
							{
								title: 'Home',
								href: '/'
							},
							{
								title: 'User',
								href: '/'
							},
							{
								title: singleUser.user?.user_name
							}
						]}
					/>
					<div className="row">
						<div className="col-lg-3 mb-4">
							<div className="text-center bg-light rounded-lg shadow-sm mb-4 p-4">
								<h3 className="text-break">{singleUser.user?.user_name}</h3>
								<CustomImage
									src={singleUser.user?.avatar}
									alt={singleUser.user?.user_name}
									className="avatar rounded-circle img-thumbnail mb-2"
									width="192"
									height="192"
								/>
								<Maybe test={login.is_authenticated && singleUser.user?.user_name === login.user?.user_name}>
									<h6>Upload a different photo...</h6>
									<CustomLink className="btn btn-primary" href="/profile/settings">
										Edit profile
									</CustomLink>
								</Maybe>
								<div>
									<Maybe test={login.is_authenticated}>
										<FollowUserButton
											isUser={singleUser.user?.user_name === login.user?.user_name}
											user_name={singleUser.user?.user_name}
											following={singleUser.user?.following}
											follow={handleFollow}
											unfollow={handleUnfollow}
										/>
									</Maybe>
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
									{singleUser.user?.total_posts}
								</li>
								<li className="list-group-item text-right">
									<span className="pull-left">
										<strong>Comment written</strong>
									</span>
									66
								</li>
								<li className="list-group-item text-right">
									<span className="pull-left">
										<strong>Likes</strong>
									</span>
									66
								</li>
								<li className="list-group-item text-right">
									<span className="pull-left">
										<strong>Tags followed</strong>
									</span>
									66
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
						<div className="col-lg-9">
							<Tab.Container id="profile-tabs" defaultActiveKey="posts-published">
								<Nav as="nav" className="nav-tabs">
									<Nav.Item as="li">
										<Nav.Link eventKey="posts-published">Posts published</Nav.Link>
									</Nav.Item>
									<Nav.Item as="li">
										<Nav.Link eventKey="more">More</Nav.Link>
									</Nav.Item>
								</Nav>
								<Tab.Content className="bg-light p-4 rounded-lg shadow-sm">
									<Tab.Pane eventKey="posts-published">
										<ListPostUser />
									</Tab.Pane>
									<Tab.Pane eventKey="more">More</Tab.Pane>
								</Tab.Content>
							</Tab.Container>
						</div>
					</div>
				</MayBeSpinner>
			</div>
		</Layout>
	);
};

export default Profile;
