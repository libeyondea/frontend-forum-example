import React from 'react';

import Layout from '@/modules/layout/components';

const Error404 = () => {
	return (
		<Layout>
			<div className="notfound d-flex flex-row align-items-center">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-12 text-center">
							<span className="display-404 d-block">404</span>
							<div className="mb-4 lead">The page you are looking for was not found.</div>
							<a href="/" className="btn-link">
								Back to Home
							</a>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Error404;
