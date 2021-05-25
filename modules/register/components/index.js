import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb/components';
import RegisterFormComponent from '@/modules/register/components/registerForm';

const RegisterComponent = () => (
	<div className="container my-4">
		<Breadcrumb
			items={[
				{
					title: 'Home',
					href: '/'
				},
				{
					title: 'Register'
				}
			]}
		/>
		<div className="row">
			<div className="col-lg-8 col-md-10 mx-auto">
				<RegisterFormComponent />
			</div>
		</div>
	</div>
);

export default RegisterComponent;
