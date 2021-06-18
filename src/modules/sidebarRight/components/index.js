import React from 'react';

import ListCategoryComponent from '@/modules/sidebarRight/components/listCategory/components';
import ListTagComponent from '@/modules/sidebarRight/components/listTag/components';

const SideBarRightComponent = () => {
	return (
		<div className="sticky-top-none">
			<ListCategoryComponent />
			<ListTagComponent />
		</div>
	);
};

export default SideBarRightComponent;
