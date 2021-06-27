import React, { memo } from 'react';
import { FaTags } from 'react-icons/fa';
import { FcAbout, FcContacts, FcFaq, FcHome } from 'react-icons/fc';

import CustomLink from '@/common/components/CustomLink/components';
import ListTagFollowedComponent from '@/modules/sidebarLeft/components/listTagFollowed/components';

const SideBarLeftComponent = () => {
	return (
		<div className="sticky-top">
			<div className="wapper__card mb-4">
				<div className="px-2 py-2">
					<h5 className="mb-0">Options</h5>
				</div>
				<ul className="list-group">
					<li className="d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/" className="text-decoration-none text-dark d-flex align-items-center">
							<FcHome className="h4 mb-0 mr-1" /> Home
						</CustomLink>
					</li>
					<li className="d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/tags" className="text-decoration-none text-dark d-flex align-items-center">
							<FaTags className="h4 mb-0 mr-1" /> Tags
						</CustomLink>
					</li>
					<li className="d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/about" className="text-decoration-none text-dark d-flex align-items-center">
							<FcAbout className="h4 mb-0 mr-1" /> About
						</CustomLink>
					</li>
					<li className="d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/faq" className="text-decoration-none text-dark d-flex align-items-center">
							<FcFaq className="h4 mb-0 mr-1" /> FAQ
						</CustomLink>
					</li>
					<li className="d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/contact" className="text-decoration-none text-dark d-flex align-items-center">
							<FcContacts className="h4 mb-0 mr-1" /> Contact
						</CustomLink>
					</li>
				</ul>
			</div>
			<ListTagFollowedComponent />
		</div>
	);
};

export default memo(SideBarLeftComponent);
