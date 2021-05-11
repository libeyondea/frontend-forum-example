import Router, { useRouter } from 'next/router';
import Error404 from 'pages/404';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumb from '@/components/Common/Breadcrumb';
import CustomLink from '@/components/Common/CustomLink';
import Empty from '@/components/Common/Empty';
import Layout from '@/components/Common/Layout';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import SettingsForm from '@/components/User/SettingsForm';
import isEmpty from '@/lib/utils/isEmpty';
import { editUserRequestedAction } from '@/redux/actions/userAction';

const EditUser = () => {
	const dispatch = useDispatch();
	const editUser = useSelector((state) => state.users.edit_user);
	const currentUser = useSelector((state) => state.users.current_user);
	const updateUser = useSelector((state) => state.users.update_user);
	const router = useRouter();
	const {
		query: { pid },
		isReady
	} = router;

	useEffect(() => {
		if (isReady) {
			if (currentUser.is_authenticated) {
				dispatch(editUserRequestedAction(pid));
			}
		}
	}, [dispatch, isReady, currentUser.is_authenticated, pid]);

	if (!currentUser.is_loading && !currentUser.is_authenticated) {
		Router.push('/login');
	}

	if (!isEmpty(editUser.errors) || !isEmpty(updateUser.errors)) {
		return <Error404 />;
	}

	return (
		<Layout>
			<div className="container my-4">
				<MayBeSpinner test={editUser.is_loading} spinner={<LoadingSpinner />}>
					<MayBeSpinner test={isEmpty(editUser.user)} spinner={<Empty />}>
						<Breadcrumb
							items={[
								{
									title: 'Home',
									href: '/'
								},
								{
									title: 'Edit profile and settings'
								}
							]}
						/>
						<div className="row">
							<div className="col-lg-3 mb-4">
								<ul className="list-group">
									<li className="list-group-item-custom d-flex align-items-center border-0 px-2 py-2">
										<CustomLink href="/" className="text-decoration-none">
											<i className="fa fa-home fa-sm" /> Edit profile
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
				</MayBeSpinner>
			</div>
		</Layout>
	);
};

export default EditUser;
