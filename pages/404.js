import React from 'react';

const Error404 = () => {
	return (
		<div id="notfound" style={{ margin: '-72px' }}>
			<div className="notfound">
				<div className="notfound-404">
					<h1>
						4<span>0</span>4
					</h1>
				</div>
				<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
				<a href="/">home page</a>
			</div>
		</div>
	);
};

export default Error404;
