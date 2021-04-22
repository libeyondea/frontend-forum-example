import React from 'react';

const Error404 = () => {
	return (
		<div className="notfound">
			<div className="noise" />
			<div className="overlay" />
			<div className="terminal">
				<h1>
					Error <span className="errorcode">404</span>
				</h1>
				<p className="output">
					The page you are looking for might have been removed, had its name changed or is temporarily unavailable.
				</p>
				<p className="output">
					Please try to <a href="#">go back</a> or <a href="/">return to the homepage</a>.
				</p>
				<p className="output">Good luck.</p>
			</div>
		</div>
	);
};

export default Error404;
