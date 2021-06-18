import classnames from 'classnames';
import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import style from '@/common/components/ImageUserForm/styles/style.module.scss';

const ImageUserFormComponent = ({ errors, error, touched, label, imageSrc, imagAlt, ...props }) => {
	return (
		<>
			{/* <label htmlFor={props.id || props.name} className="mb-md-1">
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
			</div> */}

			<label htmlFor={props.id || props.name} className="mb-md-2">
				{label}
			</label>
			<div className="d-flex flex-column flex-sm-row">
				<div className="mb-2 mb-sm-0 mr-2 d-flex align-items-center">
					<div className="">
						<button type="button" className="btn btn-outline-secondary position-relative">
							<input
								{...props}
								className={classnames(`position-absolute w-100 ${style.opacity_input_image}`, {
									'is-invalid': (touched && error) || errors
								})}
							/>
							<label className="mb-0" htmlFor={props.id || props.name}>
								Change Avatar
							</label>
						</button>
						{touched && error && <div className="invalid-feedback d-block">{error}</div>}
						{errors && <div className="invalid-feedback d-block">{errors}</div>}
					</div>
				</div>
				{imageSrc && (
					<div className="d-flex">
						<CustomImage className="rounded-circle" src={`${imageSrc}`} width={60} height={60} alt={imagAlt} />
					</div>
				)}
			</div>
		</>
	);
};

export default ImageUserFormComponent;
