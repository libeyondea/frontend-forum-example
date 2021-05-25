import Head from 'next/head';
import React from 'react';

import Layout from '@/modules/layout/components';
import LoginComponent from '@/modules/login/components';

const Login = () => {
	return (
		<>
			<Head>
				<title>Login | De4th Zone</title>
				<meta name="description" content="Login" />
			</Head>
			<Layout>
				<LoginComponent />
			</Layout>
		</>
	);
};

export default Login;
