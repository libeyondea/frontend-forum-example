import React from 'react';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import LoginForm from 'components/User/LoginForm';
import Breadcrumb from 'components/Common/Breadcrumb';

const Login = () => (
	<>
		<Head>
			<title>Login | De4th Zone</title>
		</Head>
		<Layout>
			<div className="container">
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

export default Login;
