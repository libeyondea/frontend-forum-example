import React from 'react';

import LoginFormComponent from '@/modules/login/components/loginForm';

const LoginComponent = () => {
	return (
		<div className="container-xl my-4">
			<div className="row">
				<div className="col-lg-8 col-md-10 mx-auto">
					<div className="bg-light rounded-lg shadow-sm p-4">
						<LoginFormComponent />
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginComponent;
