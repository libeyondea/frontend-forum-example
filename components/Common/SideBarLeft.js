import React, { memo } from 'react';

import CustomLink from '@/components/Common/CustomLink';

const SideBarLeft = () => {
	return (
		<div className="sticky-top">
			<div className="mb-4">
				<div className="px-2 py-2">
					<h5 className="mb-0">Options</h5>
				</div>
				<div className="list-group">
					<li className="list-group-item-custom d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/" className="text-decoration-none">
							<i className="fa fa-home fa-sm" /> Home
						</CustomLink>
					</li>
					<li className="list-group-item-custom d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/tags" className="text-decoration-none">
							<i className="fa fa-tags fa-sm" /> Tags
						</CustomLink>
					</li>
					<li className="list-group-item-custom d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/about" className="text-decoration-none">
							<i className="fa fa-question fa-sm" /> About
						</CustomLink>
					</li>
					<li className="list-group-item-custom d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/faq" className="text-decoration-none">
							<i className="fa fa-question-circle fa-sm" /> FAQ
						</CustomLink>
					</li>
					<li className="list-group-item-custom d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href="/contact" className="text-decoration-none">
							<i className="fa fa-info fa-sm" /> Contact
						</CustomLink>
					</li>
				</div>
			</div>
			<div className="mb-4">
				<div className="px-2 py-2">
					<h5 className="mb-0">My Tags</h5>
				</div>
				<div className="list-group">
					<li className="list-group-item-custom d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href={`/tag/[pid]`} as={`/tag/next`} className="text-decoration-none">
							<span className="text-secondary">#</span>next
						</CustomLink>
					</li>
					<li className="list-group-item-custom d-flex align-items-center border-0 px-2 py-2">
						<CustomLink href={`/tag/[pid]`} as={`/tag/react`} className="text-decoration-none">
							<span className="text-secondary">#</span>react
						</CustomLink>
					</li>
				</div>
			</div>
		</div>
	);
};

export default memo(SideBarLeft);
