import classnames from 'classnames';
import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import style from '@/common/components/ImageUserForm/styles/style.module.scss';

const ImageUserFormComponent = ({ errors, error, touched, label, imageSrc, imagAlt, ...props }) => {
	return (
		<>
			<label htmlFor={props.id || props.name} className="mb-md-2">
				{label}
			</label>
			<div className="d-flex">
				<div className="mr-2 d-flex align-items-center">
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
