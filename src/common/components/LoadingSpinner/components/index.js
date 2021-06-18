import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from 'styled-components';

const override = css``;

const LoadingSpinnerComponent = () => {
	return (
		<div>
			<BeatLoader css={override} loading={true} size={20} color={'#323ebe'} />
		</div>
	);
};

export default LoadingSpinnerComponent;
