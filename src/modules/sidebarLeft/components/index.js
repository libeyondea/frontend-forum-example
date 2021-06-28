import React from 'react';

import CustomLink from '@/common/components/CustomLink/components';
import optionsMenu from '@/modules/layout/components/navbar/components/optionsMenu';
import ListTagFollowedComponent from '@/modules/sidebarLeft/components/listTagFollowed/components';

const SideBarLeftComponent = () => {
	return (
		<div className="sticky-top">
			<div className="wapper__card mb-4">
				<div className="px-2 py-2">
					<h5 className="mb-0">Options</h5>
				</div>
				<ul className="list-group">
					{optionsMenu.map((m, index) => (
						<li className="d-flex align-items-center border-0 px-2 py-2" key={index}>
							<CustomLink href={m.href} className="text-decoration-none text-dark d-flex align-items-center">
								{m.icon}
								{m.name}
							</CustomLink>
						</li>
					))}
				</ul>
			</div>
			<ListTagFollowedComponent />
		</div>
	);
};

export default SideBarLeftComponent;
