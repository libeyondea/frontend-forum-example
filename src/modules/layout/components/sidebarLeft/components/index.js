import React from 'react';

import ListOptionsMenu from '@/modules/layout/components/navbar/components/listOptionsMenu';
import ListTagFollowedComponent from '@/modules/layout/components/sidebarLeft/components/listTagFollowed/components';

const SideBarLeftComponent = () => {
	return (
		<div className="sticky-top">
			<div className="wapper__card mb-4">
				<div className="px-2 py-2">
					<h5 className="mb-0">Options</h5>
				</div>
				<ListOptionsMenu />
			</div>
			<ListTagFollowedComponent />
		</div>
	);
};

export default SideBarLeftComponent;
