import React from 'react';

import FooterComponent from '@/modules/layout/components/footer/components';
import NavBarComponent from '@/modules/layout/components/navbar/components';

const LayoutComponent = ({ children }) => {
	return (
		<>
			<NavBarComponent />
			{children}
			<FooterComponent />
		</>
	);
};

export default LayoutComponent;
