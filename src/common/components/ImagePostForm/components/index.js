import classnames from 'classnames';
import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import style from '@/common/components/ImagePostForm/styles/style.module.scss';

const ImagePostFormComponent = ({ errors, error, touched, label, imageSrc, imagAlt, removeImage, ...props }) => {
	return (
		<>
			<label htmlFor={props.id || props.name} className="mb-md-2">
				{label}
			</label>
			<div className="d-flex flex-column flex-md-row">
				<div className="mb-2 mb-md-0 mr-2 d-flex align-items-center">
					<div className="">
						<button type="button" className="btn btn-outline-secondary position-relative">
							<input
								{...props}
								className={classnames(`position-absolute w-100 ${style.opacity_input_image}`, {
									'is-invalid': (touched && error) || errors
								})}
							/>
							<label className="mb-0" htmlFor={props.id || props.name}>
								Change
							</label>
						</button>
						{touched && error && <div className="invalid-feedback d-block">{error}</div>}
						{errors && <div className="invalid-feedback d-block">{errors}</div>}
					</div>
				</div>
				{imageSrc && (
					<div className="d-flex flex-column flex-sm-row">
						<div className="mr-2 mb-2 mb-sm-0">
							<CustomImage className="" src={`${imageSrc}`} width={350} height={150} alt={imagAlt} />
						</div>
						<div className="d-flex align-items-center">
							<button type="button" className="btn btn-danger" onClick={removeImage}>
								Remove
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ImagePostFormComponent;
