import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import CustomLink from '@/components/Common/CustomLink';
import Maybe from '@/components/Common/Maybe';

const SideBarLeft = () => {
	const currentUser = useSelector((state) => state.users.current_user);

	return (
		<div className="sticky-top">
			<div className="mb-4">
				<div className="px-2 py-2">
					<h5 className="mb-0">Options</h5>
				</div>
				<ul className="list-group">
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
				</ul>
			</div>
			<Maybe test={currentUser.is_authenticated}>
				<div className="mb-4">
					<div className="px-2 py-2">
						<h5 className="mb-0">My Tags</h5>
					</div>
					<ul className="list-group">
						<li className="list-group-item-custom d-flex align-items-center border-0 px-2 py-2">
							<CustomLink href={`/tags/[pid]`} as={`/tags/next`} className="text-decoration-none">
								<span className="text-secondary">#</span>next
							</CustomLink>
						</li>
						<li className="list-group-item-custom d-flex align-items-center border-0 px-2 py-2">
							<CustomLink href={`/tags/[pid]`} as={`/tags/react`} className="text-decoration-none">
								<span className="text-secondary">#</span>react
							</CustomLink>
						</li>
					</ul>
				</div>
			</Maybe>
		</div>
	);
};

export default memo(SideBarLeft);