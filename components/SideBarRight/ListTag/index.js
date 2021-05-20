import React from 'react';

import BodyListTag from '@/components/SideBarRight/ListTag/Body';
import HeaderListTag from '@/components/SideBarRight/ListTag/Header';

const ListTagSBR = () => {
	return (
		<div className="bg-light rounded-lg shadow-sm border mb-4">
			<HeaderListTag />
			<BodyListTag />
		</div>
	);
};

export default ListTagSBR;
