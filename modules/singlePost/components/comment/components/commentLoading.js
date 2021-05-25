import React from 'react';

const CommentLoadingComponent = () => {
	return (
		<div className="mb-4 d-flex align-items-start flex-column flex-sm-row">
			<div className="rounded-circle mr-3 mb-3 p-4 loading-animation"></div>
			<div className="flex-fill w-100 ">
				<div className="border p-3 bg-white text-break">
					<div className="mb-2 loading-animation w-75 py-3"></div>
					<div className="loading-animation py-2 w-50"></div>
				</div>
			</div>
		</div>
	);
};

export default CommentLoadingComponent;
