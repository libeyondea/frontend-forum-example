import React from 'react';

import style from '@/common/components/LoadingPost/styles/style.module.scss';

const LoadingPost = ({ lengthArr = 10 }) => {
	let postSpinnerList = [];
	const SpinnerPost = (i) => {
		return (
			<div className="col-12 mb-3" key={i}>
				<div className={`card ${style.loading_post_card}`}>
					<div className="p-3">
						<div className="d-flex align-items-center mb-2">
							<div className="rounded-circle me-1 p-3 loading-animation"></div>
							<div className="py-2 w-25 loading-animation"></div>
						</div>
						<div className={`${style.body_loading_post}`}>
							<div className="loading-animation py-3 w-75 mb-2"></div>
							<div className="loading-animation py-2 w-50"></div>
						</div>
					</div>
				</div>
			</div>
		);
	};
	for (let i = 0; i < lengthArr; i++) {
		postSpinnerList.push(SpinnerPost(i));
	}
	return postSpinnerList;
};

export default LoadingPost;
