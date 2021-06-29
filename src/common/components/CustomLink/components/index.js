import Link from 'next/link';
import React, { forwardRef } from 'react';

const TagA = forwardRef(({ className, href, onClick, children, ...props }, ref) => {
	return (
		<a href={href} className={className || ''} onClick={onClick} ref={ref} {...props}>
			{children}
		</a>
	);
});

TagA.displayName = 'TagA';

const CustomLinkComponent = ({ className, href, as, onClick, children }) => (
	<Link href={href} as={as} passHref>
		<TagA className={className} href={href} onClick={onClick}>
			{children}
		</TagA>
	</Link>
);

export default CustomLinkComponent;
