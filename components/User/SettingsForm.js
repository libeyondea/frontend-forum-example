import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import InputForm from '@/components/Form/InputForm';
import SelectForm from '@/components/Form/SelectForm';
import TextForm from '@/components/Form/TextForm';
import { updateUserRequestedAction } from '@/redux/actions/userAction';

const SettingsForm = () => {
	const dispatch = useDispatch();
	const singleUser = useSelector((state) => state.users.single_user);
	const updateUser = useSelector((state) => state.users.update_user);

	const initialValues = {
		first_name: singleUser.user.first_name,
		last_name: singleUser.user.last_name,
		user_name: singleUser.user.user_name,
		email: singleUser.user.email,
		phone_number: singleUser.user.phone_number,
		address: singleUser.user.address,
		gender: singleUser.user.gender,
		avatar: singleUser.user.avatar
	};
	const validationSchema = Yup.object({
		first_name: Yup.string()
			.min(1, 'Fisrt name must be at least 1 characters')
			.max(16, 'Fisrt name must be at most 16 characters')
			.required('First name is required'),
		last_name: Yup.string()
			.min(1, 'Last name must be at least 1 characters')
			.max(16, 'Last name must be at most 16 characters')
			.required('Last name is required'),
		user_name: Yup.string()
			.min(6, 'User name must be at least 6 characters')
			.max(66, 'User name must be at most 66 characters')
			.matches(/^(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9._-]+(?<![_.-])$/, 'User name invalid')
			.required('User name is required'),
		email: Yup.string()
			.matches(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Email invalid'
			)
			.required('Email is required'),
		phone_number: Yup.string()
			.min(10, 'Phone number must be at least 10 characters')
			.matches(/^[0-9]+$/, 'Phone number invalid')
			.nullable(),
		address: Yup.string()
			.min(6, 'Address must be at least 6 characters')
			.max(66, 'Address must be at most 66 characters')
			.nullable(),
		avatar: Yup.string().max(666, 'Image must be at most 666 characters').nullable(),
		gender: Yup.string().oneOf(['male', 'female', 'orther', null], 'Gender invalid').nullable()
	});
	const onSubmit = (values) => {
		const user = {
			first_name: values.first_name,
			last_name: values.last_name,
			user_name: values.user_name,
			email: values.email,
			phone_number: values.phone_number,
			address: values.address,
			gender: values.gender,
			avatar: values.avatar
		};
		dispatch(updateUserRequestedAction(user));
	};

	const gender = ['', 'male', 'female', 'orther'];

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			<Form>
				<div className="form-row">
					<div className="form-group col-md-6">
						<InputForm label="First name" placeholder="First name" id="first_name" name="first_name" type="text" />
					</div>
					<div className="form-group col-md-6">
						<InputForm label="Last name" placeholder="Last name" id="last_name" name="last_name" type="text" />
					</div>
					<div className="form-group col-md-6">
						<InputForm
							label="Email"
							placeholder="Email"
							id="email"
							name="email"
							type="text"
							errors={updateUser.errors?.email}
						/>
					</div>
					<div className="form-group col-md-6">
						<InputForm
							label="User name"
							placeholder="User name"
							id="user_name"
							name="user_name"
							type="text"
							errors={updateUser.errors?.user_name}
						/>
					</div>
					<div className="form-group col-md-6">
						<InputForm
							label="Phone number"
							placeholder="84 336 077 131"
							id="phone_number"
							name="phone_number"
							type="text"
						/>
					</div>
					<div className="form-group col-md-6">
						<SelectForm label="Gender" name="gender">
							<option value={gender[0]}>Select gender</option>
							<option value={gender[1]}>Male</option>
							<option value={gender[2]}>Female</option>
							<option value={gender[3]}>Other</option>
						</SelectForm>
					</div>
					<div className="form-group col-md-12">
						<TextForm rows="3" label="Address" placeholder="Address" id="address" name="address" />
					</div>
					<div className="form-group col-md-12">
						<TextForm rows="6" label="Avatar (Url or Base64)" placeholder="Avatar" id="avatar" name="avatar" />
					</div>
				</div>
				<div className="text-left">
					{updateUser.is_loading ? (
						<button type="submit" className="btn btn-primary" disabled>
							<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
							Update
						</button>
					) : (
						<button type="submit" className="btn btn-primary">
							Update
						</button>
					)}
				</div>
			</Form>
		</Formik>
	);
};

export default SettingsForm;
