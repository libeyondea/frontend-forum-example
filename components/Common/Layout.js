import React from 'react';

import Footer from '@/components/Common/Footer';
import Navbar from '@/components/Common/Navbar';
import useAuth from '@/lib/hooks/useAuth';

const Layout = ({ children }) => {
	useAuth();
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
