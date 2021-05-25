import classnames from 'classnames';
import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';

const ImagePostFormComponent = ({
	errors,
	error,
	touched,
	label,
	imgName,
	imageSrc,
	imagAlt,
	removeImage,
	...props
}) => {
	return (
		<>
			<label htmlFor={props.id || props.name} className="mb-md-1">
				{label}
			</label>
			<div className="row d-flex align-items-center">
				<div className="col-md-5 mb-3 mb-md-0">
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
				<div className="col-md-7 d-flex align-items-center">
					{imageSrc && (
						<>
							<CustomImage className="" src={`${imageSrc}`} width={350} height={150} alt={imagAlt} />
							<div className="ml-4">
								<button type="button" className="btn btn-danger" onClick={removeImage}>
									Remove
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default ImagePostFormComponent;
