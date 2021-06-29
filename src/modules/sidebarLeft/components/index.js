import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';

import CustomLink from '@/common/components/CustomLink/components';
import optionsMenu from '@/modules/layout/components/navbar/components/optionsMenu';
import ListTagFollowedComponent from '@/modules/sidebarLeft/components/listTagFollowed/components';

const SideBarLeftComponent = () => {
	const [hiddenMenu, setHiddenMenu] = useState(true);
	return (
		<div className="sticky-top">
			<div className="wapper__card mb-4">
				<div className="px-2 py-2">
					<h5 className="mb-0">Options</h5>
				</div>
				<ul className="list-group">
					{optionsMenu.map((m, index) => (
						<li
							className={`align-items-center border-0 px-2 py-2 ${m.hidden && hiddenMenu ? 'd-none' : 'd-flex'}`}
							key={index}
						>
							<CustomLink href={m.href} className="text-decoration-none text-dark d-flex align-items-center">
								{m.icon}
								{m.name}
							</CustomLink>
						</li>
					))}
					<li className={`align-items-center border-0 px-2 py-2 ${!hiddenMenu ? 'd-none' : 'd-flex'}`}>
						<button
							type="button"
							className="border-0 p-0 bg-transparent d-flex align-items-center text-secondary"
							onClick={() => setHiddenMenu(false)}
						>
							<FaEllipsisH className="h4 mb-0 mr-1" />
							More
						</button>
					</li>
				</ul>
			</div>
			<ListTagFollowedComponent />
		</div>
	);
};

export default SideBarLeftComponent;
