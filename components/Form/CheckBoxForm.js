import React from 'react';
import { useField } from 'formik';

const CheckBoxForm = ({ isError, errorMessage, label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<input {...field} {...props} type="checkbox" className="form-check-input" />
			<label className="form-check-label" htmlFor={props.id || props.name}>
				{label}
			</label>
			{meta.touched && meta.error && <div className="invalid-feedback d-block">{meta.error}</div>}
			{isError && errorMessage && <div className="invalid-feedback d-block">{errorMessage}</div>}
		</>
	);
};

export default CheckBoxForm;
