import Breadcrumb from 'components/Common/Breadcrumb';
import Layout from 'components/Common/Layout';
import LoginForm from 'components/User/LoginForm';
import withAuth from 'lib/hoc/withAuth';
import Head from 'next/head';
import React from 'react';

const Login = () => (
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

export default withAuth(Login);
