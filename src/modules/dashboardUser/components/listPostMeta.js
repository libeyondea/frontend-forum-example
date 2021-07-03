import React from 'react';

import CustomLink from '@/common/components/CustomLink/components';

const ListPostMetaComponent = ({ postSlug, userName }) => {
	return (
		<>
			<CustomLink href={`/u/${userName}/${postSlug}/delete`} className="btn btn-outline-danger btn-sm me-2">
				<i className="ion-edit" /> Delete
			</CustomLink>
			<CustomLink href={`/u/${userName}/${postSlug}/edit`} className="btn btn-outline-dark btn-sm">
				<i className="ion-edit" /> Edit
			</CustomLink>
		</>
	);
};

export default ListPostMetaComponent;
