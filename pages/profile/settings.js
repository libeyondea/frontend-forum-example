import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumb from '@/components/Common/Breadcrumb';
import CustomLink from '@/components/Common/CustomLink';
import Layout from '@/components/Common/Layout';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import SettingsForm from '@/components/User/SettingsForm';
import { editUserRequestedAction } from '@/redux/actions/userAction';

const Setting = () => {
	const dispatch = useDispatch();
	const login = useSelector((state) => state.users.login);
	const editUser = useSelector((state) => state.users.edit_user);

	useEffect(() => {
		if (login.is_authenticated) {
			dispatch(editUserRequestedAction());
		}
	}, [dispatch, login.is_authenticated]);

	return (
		<Layout>
			<div className="container my-4">
				<MayBeSpinner
					test={editUser.is_loading || !editUser.user || !login.is_authenticated}
					spinner={<LoadingSpinner />}
				>
					<Breadcrumb
						items={[
							{
								title: 'Home',
								href: '/'
							},
							{
								title: 'Settings'
							}
						]}
					/>
					<div className="row">
						<div className="col-lg-3 mb-4">
							<ul className="list-group">
								<li className="list-group-item-custom d-flex align-items-center border-0 px-2 py-2">
									<CustomLink href="/" className="text-decoration-none">
										<i className="fa fa-home fa-sm" /> Profile
									</CustomLink>
								</li>
								<li className="list-group-item-custom d-flex align-items-center border-0 px-2 py-2">
									<CustomLink href="/customization" className="text-decoration-none">
										<i className="fa fa-tags fa-sm" /> Customization
									</CustomLink>
								</li>
							</ul>
						</div>
						<div className="col-lg-9">
							<div className="bg-light p-4 rounded-lg shadow-sm">
								<SettingsForm />
							</div>
						</div>
					</div>
				</MayBeSpinner>
			</div>
		</Layout>
	);
};

export default Setting;
