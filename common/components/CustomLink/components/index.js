import Link from 'next/link';
import React from 'react';

const CustomLinkComponent = ({ className, href, as, onClick, children }) => (
	<Link href={href} as={as} onClick={onClick} passHref>
		<a className={className || ''}>{children}</a>
	</Link>
);

export default CustomLinkComponent;
