import React from 'react';
import classnames from 'classnames';
import { useField } from 'formik';

const SelectFormik = ({ isError, errorMessage, label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<select
				{...field}
				{...props}
				className={classnames('form-control', {
					'is-invalid': (meta.touched && meta.error) || (isError && errorMessage)
				})}
			/>
			{meta.touched && meta.error && <div className="invalid-feedback">{meta.error}</div>}
			{isError && errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
		</>
	);
};

export default SelectFormik;
