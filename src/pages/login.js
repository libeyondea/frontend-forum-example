import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import Layout from '@/modules/layout/components';
import LoginComponent from '@/modules/login/components';

const Login = () => {
	return (
		<>
			<MetaWebsite title="Login" />
			<Layout>
				<LoginComponent />
			</Layout>
		</>
	);
};

export default Login;
