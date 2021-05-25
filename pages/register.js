import Head from 'next/head';
import React from 'react';

import Layout from '@/modules/layout/components';
import RegisterComponent from '@/modules/register/components';

const Register = () => (
	<>
		<Head>
			<title>Register | De4th Zone</title>
		</Head>
		<Layout>
			<RegisterComponent />
		</Layout>
	</>
);

export default Register;
