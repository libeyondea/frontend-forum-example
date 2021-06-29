import React from 'react';

const LoadingTag = ({ lengthArr = 10 }) => {
	let tagSpinnerList = [];
	const SpinnerTag = (i) => {
		return (
			<div className="col-6 mb-3" key={i}>
				<div className="card">
					<div className="p-3">
						<div className="loading-animation py-3 w-75 mb-2"></div>
						<div className="loading-animation py-2 w-50"></div>
					</div>
				</div>
			</div>
		);
	};
	for (let i = 0; i < lengthArr; i++) {
		tagSpinnerList.push(SpinnerTag(i));
	}
	return tagSpinnerList;
};

export default LoadingTag;
