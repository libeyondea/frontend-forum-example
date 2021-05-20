import React from 'react';

import BodyListCategory from '@/components/SideBarRight/ListCategory/Body';
import HeaderListCategory from '@/components/SideBarRight/ListCategory/Header';

const ListCategorySBR = () => {
	return (
		<div className="bg-light rounded-lg shadow-sm border mb-4">
			<HeaderListCategory />
			<BodyListCategory />
		</div>
	);
};

export default ListCategorySBR;
