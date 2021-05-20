import React from 'react';

const LoadingTags = () => {
	const arrayLoop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return (
		<>
			{arrayLoop.map((i) => (
				<div className="col-6 mb-4" key={i}>
					<div className="card card-loading-post">
						<div className="p-3">
							<div className="title-loading py-3 w-75 mb-2"></div>
							<div className="excerpt-loading py-2 w-50"></div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default LoadingTags;
