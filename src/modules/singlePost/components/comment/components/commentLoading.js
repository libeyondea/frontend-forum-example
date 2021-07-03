import React from 'react';

const CommentLoadingComponent = ({ classNameContainer }) => {
	return (
		<div className={`mt-4 d-flex align-items-start ${classNameContainer || ''}`}>
			<div className="rounded-circle me-2 me-sm-3 p-3 loading-animation"></div>
			<div className="flex-fill w-100 ">
				<div className="border p-2 p-sm-3 bg-white text-break">
					<div className="mb-2 loading-animation w-75 py-3"></div>
					<div className="loading-animation py-2 w-50"></div>
				</div>
			</div>
		</div>
	);
};

export default CommentLoadingComponent;
