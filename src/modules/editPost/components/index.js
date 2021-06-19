import React from 'react';

import LoadingSpinner from '@/common/components/LoadingSpinner/components';
import useUser from '@/common/hooks/useUser';
import EditPostFormComponent from '@/modules/editPost/components/editPostForm';

const EditPostComponent = ({ editPost }) => {
	const { user } = useUser();

	return (
		<div className="container-xl my-4">
			{!user ? (
				<LoadingSpinner />
			) : (
				<div className="row">
					<div className="col-12">
						<div className="bg-light rounded-lg shadow-sm p-4">
							<EditPostFormComponent editPost={editPost} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditPostComponent;
