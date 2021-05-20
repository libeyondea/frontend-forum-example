import React from 'react';

const LoadingComment = () => {
	return (
		<>
			<div className="media mb-4 card-comment">
				<div className="rounded-circle mr-3 mb-3 avt-loading img-avatar"></div>
				<div className="media-body">
					<div className="border p-3 bg-white text-break">
						<div className="title-loading py-3 w-75 mb-2"></div>
						<div className="excerpt-loading py-2 w-50"></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoadingComment;
