import React, { useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';

import CustomLink from '@/common/components/CustomLink/components';
import optionsMenu from '@/modules/layout/components/navbar/components/optionsMenu';

const ListOptionsMenu = () => {
	const [hiddenMenu, setHiddenMenu] = useState(true);

	return (
		<ul className="list-group">
			{optionsMenu.map((m, index) => (
				<li className={`align-items-center border-0 p-0 ${m.hidden && hiddenMenu ? 'd-none' : 'd-flex'}`} key={index}>
					<CustomLink href={m.href} className="text-decoration-none d-flex align-items-center dropdown-item p-2">
						{m.icon}
						{m.name}
					</CustomLink>
				</li>
			))}
			<li className={`align-items-center border-0 p-0 ${!hiddenMenu ? 'd-none' : 'd-flex'}`}>
				<button
					type="button"
					className="border-0 d-flex align-items-center text-secondary dropdown-item p-2"
					onClick={() => setHiddenMenu(false)}
				>
					<FaEllipsisH className="h4 mb-0 me-1" />
					More
				</button>
			</li>
		</ul>
	);
};

export default ListOptionsMenu;
