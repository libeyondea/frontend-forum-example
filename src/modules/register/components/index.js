import React from 'react';

import RegisterFormComponent from '@/modules/register/components/registerForm';

const RegisterComponent = () => (
	<div className="container-xl my-4">
		<div className="row">
			<div className="col-lg-8 col-md-10 mx-auto">
				<div className="bg-light rounded-lg shadow-sm p-4">
					<RegisterFormComponent />
				</div>
			</div>
		</div>
	</div>
);

export default RegisterComponent;
