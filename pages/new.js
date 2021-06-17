import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import LayoutComponent from '@/modules/layout/components';
import NewPostComponent from '@/modules/newPost/components';

const NewPost = () => {
	return (
		<>
			<MetaWebsite title="New Post" />
			<LayoutComponent>
				<NewPostComponent />
			</LayoutComponent>
		</>
	);
};

export default NewPost;
