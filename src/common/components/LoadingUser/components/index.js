import React from 'react';

import style from '@/common/components/LoadingUser/styles/style.module.scss';

const LoadingUser = ({ lengthArr = 10 }) => {
	let userSpinnerList = [];
	const SpinnerUser = (i) => {
		return (
			<div className="col-lg-6 mb-3" key={i}>
				<div className={`card ${style.loading_user_card}`}>
					<div className="p-3">
						<div className="d-flex align-items-center mb-2">
							<div className="rounded-circle mr-1 p-3 loading-animation"></div>
							<div className="py-2 w-25 loading-animation"></div>
						</div>
						<div className={`${style.body_loading_user}`}>
							<div className="loading-animation py-3 w-75"></div>
						</div>
					</div>
				</div>
			</div>
		);
	};
	for (let i = 0; i < lengthArr; i++) {
		userSpinnerList.push(SpinnerUser(i));
	}
	return userSpinnerList;
};

export default LoadingUser;
