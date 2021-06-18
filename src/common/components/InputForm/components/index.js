import classnames from 'classnames';
import { useField } from 'formik';
import React from 'react';

const InuputFormComponent = ({ errors, label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input
				{...field}
				{...props}
				className={classnames('form-control', {
					'is-invalid': (meta.touched && meta.error) || errors
				})}
			/>
			{meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
			{errors && <div className="invalid-feedback">{errors}</div>}
		</>
	);
};

export default InuputFormComponent;
