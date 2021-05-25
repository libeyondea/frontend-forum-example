import React from 'react';

import Layout from '@/modules/layout/components';

const Error = ({ statusCode }) => {
	return (
		<Layout>
			<div className="notfound d-flex flex-row align-items-center">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-12 text-center">
							<span className="display-404 d-block">500</span>
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

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

export default Error;
