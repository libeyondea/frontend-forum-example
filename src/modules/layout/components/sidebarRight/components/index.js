import React from 'react';

import ListCategoryComponent from '@/modules/layout/components/sidebarRight/components/listCategory/components';
import ListTagComponent from '@/modules/layout/components/sidebarRight/components/listTag/components';

const SideBarRightComponent = () => {
	return (
		<div className="sticky-top-none">
			<ListCategoryComponent />
			<ListTagComponent />
		</div>
	);
};

export default SideBarRightComponent;
