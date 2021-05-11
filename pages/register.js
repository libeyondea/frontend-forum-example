import Head from 'next/head';
import React from 'react';

import Breadcrumb from '@/components/Common/Breadcrumb';
import Layout from '@/components/Common/Layout';
import RegisterForm from '@/components/User/RegisterForm';

const Register = () => (
	<>
		<Head>
			<title>Register | De4th Zone</title>
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
