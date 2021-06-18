import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import Layout from '@/modules/layout/components';
import RegisterComponent from '@/modules/register/components';

const Register = () => (
	<>
		<MetaWebsite title="Register" />
		<Layout>
			<RegisterComponent />
		</Layout>
	</>
);

export default Register;
