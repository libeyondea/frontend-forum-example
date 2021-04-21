import React from 'react';
import Head from 'next/head';
import Layout from 'components/Common/Layout';
import RegisterForm from 'components/User/RegisterForm';
import Breadcrumb from 'components/Common/Breadcrumb';

const Register = () => (
	<>
		<Head>
			<title>Register | De4th Zone</title>
		</Head>
		<Layout>
			<div className="container my-5">
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
						<RegisterForm />
					</div>
				</div>
			</div>
		</Layout>
	</>
);

export default Register;
