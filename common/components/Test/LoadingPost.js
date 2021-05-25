import React from 'react';

const LoadingPost = () => {
	const arrayLoop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	return (
		<>
			{arrayLoop.map((i) => (
				<div className="col-12 mb-4" key={i}>
					<div className="card card-loading-post">
						<div className="p-3">
							<div className="d-flex align-items-center mb-2">
								<div className="rounded-circle mr-1 p-3 avt-loading"></div>
								<div className="user-loading py-2 w-25"></div>
							</div>
							<div className="body-loading">
								<div className="title-loading py-3 w-75 mb-2"></div>
								<div className="excerpt-loading py-2 w-50"></div>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default LoadingPost;
