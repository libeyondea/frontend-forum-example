import React, { memo } from 'react';

import CustomLink from '@/common/components/CustomLink/components';
import ListTagFollowedComponent from '@/modules/sidebarLeft/components/listTagFollowed/components';

const SideBarLeftComponent = () => {
	return (
		<div className="sticky-top">
			<div className="mb-4">
				<div className="px-2 py-2">
					<h5 className="mb-0">Options</h5>
				</div>
				<ul className="list-group">
					<li className="d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/" className="text-decoration-none text-dark">
							<i className="fa fa-home fa-sm" /> Home
						</CustomLink>
					</li>
					<li className="d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/tags" className="text-decoration-none text-dark">
							<i className="fa fa-tags fa-sm" /> Tags
						</CustomLink>
					</li>
					<li className="d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/about" className="text-decoration-none text-dark">
							<i className="fa fa-question fa-sm" /> About
						</CustomLink>
					</li>
					<li className="d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/faq" className="text-decoration-none text-dark">
							<i className="fa fa-question-circle fa-sm" /> FAQ
						</CustomLink>
					</li>
					<li className="d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/contact" className="text-decoration-none text-dark">
							<i className="fa fa-info fa-sm" /> Contact
						</CustomLink>
					</li>
				</ul>
			</div>
			<ListTagFollowedComponent />
		</div>
	);
};

export default memo(SideBarLeftComponent);
