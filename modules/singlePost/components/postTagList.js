import React from 'react';

import CustomLink from '@/common/components/CustomLink/components';

const PostTagListComponent = ({ tags }) => {
	return (
		<div className="mb-3">
			{tags.map((tag) => (
				<CustomLink key={tag.id} href={`/tags/${tag.slug}`} className="p-1 text-decoration-none text-secondary">
					<span className="text-muted">#</span>
					{tag.slug}
				</CustomLink>
			))}
		</div>
	);
};

export default PostTagListComponent;
