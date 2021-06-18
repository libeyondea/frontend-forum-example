import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb/components';
import LoadingSpinner from '@/common/components/LoadingSpinner/components';
import useUser from '@/common/hooks/useUser';
import NewPostFormComponent from '@/modules/newPost/components/newPostForm';

const NewPostComponent = () => {
	const { user } = useUser();

	return (
		<div className="container-xl my-4">
			{!user ? (
				<LoadingSpinner />
			) : (
				<>
					<Breadcrumb
						items={[
							{
								title: 'Home',
								href: '/'
							},
							{
								title: 'New post'
							}
						]}
					/>
					<div className="row">
						<div className="col-12 mb-4">
							<div className="bg-light rounded-lg shadow-sm p-4">
								<NewPostFormComponent />
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default NewPostComponent;
