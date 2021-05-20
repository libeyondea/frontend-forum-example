import Head from 'next/head';
import React from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import Layout from '@/components/Layout';
import LoginForm from '@/components/User/LoginForm';

const Login = () => {
	return (
		<>
			<Head>
				<title>Login | De4th Zone</title>
			</Head>
			<Layout>
				<div className="container my-4">
					<Breadcrumb
						items={[
							{
								title: 'Home',
								href: '/'
							},
							{
								title: 'Login'
							}
						]}
					/>
					<div className="row">
						<div className="col-lg-8 col-md-10 mx-auto">
							<LoginForm />
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Login;
