import classnames from 'classnames';
import React from 'react';

import CustomImage from '@/components/Common/CustomImage';

const FileForm = ({ errors, error, touched, label, imgName, imageSrc, imagAlt, ...props }) => {
	return (
		<>
			<label htmlFor={props.id || props.name} className="mb-md-1">
				{label}
			</label>
			<div className="row d-flex align-items-center">
				<div className="col-md-9 mb-3 mb-md-0">
					<div className={`custom-file`}>
						<input
							{...props}
							className={classnames('custom-file-input', {
								'is-invalid': (touched && error) || errors
							})}
						/>
						<label className="custom-file-label" htmlFor={props.id || props.name}>
							{imgName ? imgName : 'Choose file...'}
						</label>
						{touched && error && <div className="invalid-feedback">{error}</div>}
						{errors && <div className="invalid-feedback">{errors}</div>}
					</div>
				</div>
				<div className="col-md-3 d-flex align-items-center">
					<CustomImage className="rounded-circle" src={`${imageSrc}`} width={60} height={60} alt={imagAlt} />
				</div>
			</div>
		</>
	);
};

export default FileForm;
