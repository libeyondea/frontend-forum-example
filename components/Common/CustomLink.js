import React from 'react';
import Link from 'next/link';

const CustomLink = ({ className, href, as, onClick, children }) => (
	<Link href={href} as={as} passHref>
		<a className={className || ''} onClick={onClick}>
			{children}
		</a>
	</Link>
);

export default CustomLink;
