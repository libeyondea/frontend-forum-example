import React from 'react';

import ListCategorySBR from '@/components/SideBarRight/ListCategory';
import ListTagSBR from '@/components/SideBarRight/ListTag';

const SideBarRight = () => {
	return (
		<div className="sticky-top-none">
			<ListCategorySBR />
			<ListTagSBR />
		</div>
	);
};

export default SideBarRight;
