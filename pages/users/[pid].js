import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import Breadcrumb from '@/components/Breadcrumb';
import CustomImage from '@/components/Common/CustomImage';
import Layout from '@/components/Layout';
import EditProfileButton from '@/components/User/EditProfileButton';
import FollowUserButton from '@/components/User/FollowUserButton';
import ListPostUser from '@/components/User/ListPostUser';
import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';

const SingleUser = ({ singleUser, listPostUser }) => {
	return (
		<Layout>
			<div className="container my-4">
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
					<div className="col-lg-3 mb-4">
						<div className="text-center bg-light rounded-lg shadow-sm mb-4 p-4">
							<h3 className="text-break">{singleUser.data?.user_name}</h3>
							<CustomImage
								src={`${process.env.IMAGES_URL}/${singleUser.data?.avatar}`}
								alt={singleUser.data?.user_name}
								className="avatar rounded-circle img-thumbnail"
								width="192"
								height="192"
							/>
							<div>
								<EditProfileButton user_name={singleUser.data?.user_name} />
							</div>
							<div>
								<FollowUserButton user_name={singleUser.data?.user_name} following={singleUser.data?.following} />
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
									<ListPostUser listPostUser={listPostUser} />
								</Tab.Pane>
								<Tab.Pane eventKey="more">More</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { page, pid } = query;
		const [resSingleUser, resListPostUser] = await Promise.all([
			httpRequest.get({
				url: `/users/${pid}`,
				token: getCookie('token', req)
			}),
			httpRequest.get({
				url: '/posts',
				params: {
					user: pid,
					offset: (page - 1) * process.env.LIMIT_PAGE.LIST_POST_USER,
					limit: process.env.LIMIT_PAGE.LIST_POST_USER
				}
			})
		]);
		if (resSingleUser.data.success && resListPostUser.data.success) {
			return {
				props: {
					singleUser: resSingleUser.data,
					listPostUser: resListPostUser.data
				}
			};
		}
		return {
			notFound: true
		};
	} catch (error) {
		console.log(error.response);
		return {
			notFound: true
		};
	}
}

export default SingleUser;
