import CustomLink from 'components/Common/CustomLink';
import CheckBoxForm from 'components/Form/CheckBoxForm';
import InputForm from 'components/Form/InputForm';
import SelectForm from 'components/Form/SelectForm';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserRequestedAction } from 'redux/actions/userAction';
import * as Yup from 'yup';

const RegisterForm = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const register = useSelector((state) => state.users.register);

	const initialValues = {
		first_name: '',
		last_name: '',
		user_name: '',
		email: '',
		password: '',
		password_confirm: '',
		phone_number: '',
		address: '',
		gender: '',
		avatar: '',
		agreeterms: false
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
			.max(16, 'User name must be at most 16 characters')
			.matches(/^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'User name invalid')
			.required('User name is required'),
		email: Yup.string()
			.matches(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Email invalid'
			)
			.required('Email is required'),
		password: Yup.string().required('Password is required'),
		password_confirm: Yup.string()
			.required('Comfirm password is required')
			.oneOf([Yup.ref('password')], 'Password is not match'),
		phone_number: Yup.string()
			.min(10, 'Phone number must be at least 10 characters')
			.matches(/^[0-9]+$/, 'Phone number invalid'),
		address: Yup.string()
			.min(6, 'Address must be at least 6 characters')
			.max(66, 'Address must be at most 66 characters'),
		avatar: Yup.string().max(666, 'Image must be at most 666 characters'),
		gender: Yup.string().oneOf(['male', 'female', 'orther'], 'Gender invalid').required('Select gender'),
		agreeterms: Yup.boolean().oneOf([true], 'You must agree to terms of service').required('Required')
	});
	const onSubmit = (values) => {
		const user = {
			first_name: values.first_name,
			last_name: values.last_name,
			user_name: values.user_name,
			email: values.email,
			password: values.password,
			phone_number: values.phone_number,
			address: values.address,
			gender: values.gender,
			avatar: values.avatar
		};
		dispatch(registerUserRequestedAction(user, router));
	};
	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			<Form>
				<h2 className="text-center mb-3">Register</h2>
				<div className="form-group">
					<InputForm label="First name" placeholder="First name" id="first_name" name="first_name" type="text" />
				</div>
				<div className="form-group">
					<InputForm label="Last name" placeholder="Last name" id="last_name" name="last_name" type="text" />
				</div>
				<div className="form-group">
					<InputForm
						label="User name"
						placeholder="User name"
						id="user_name"
						name="user_name"
						type="text"
						errors={register.errors?.user_name}
					/>
				</div>
				<div className="form-group">
					<InputForm
						label="Email"
						placeholder="Email"
						id="email"
						name="email"
						type="text"
						errors={register.errors?.email}
					/>
				</div>
				<div className="form-group">
					<InputForm label="Password" placeholder="Password" id="password" name="password" type="password" />
				</div>
				<div className="form-group">
					<InputForm
						label="Confirm password"
						placeholder="Confirm password"
						id="password_confirm"
						name="password_confirm"
						type="password"
					/>
				</div>
				<div className="form-group">
					<InputForm
						label="Phone number"
						placeholder="84 336 077 131"
						id="phone_number"
						name="phone_number"
						type="text"
					/>
				</div>
				<div className="form-group">
					<InputForm label="Address" placeholder="Address" id="address" name="address" type="text" />
				</div>
				<div className="form-group">
					<SelectForm label="Gender" name="gender">
						<option value="">Select gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="orther">Other</option>
					</SelectForm>
				</div>
				<div className="form-group">
					<InputForm label="Image" placeholder="Avatar" id="avatar" name="avatar" type="text" />
				</div>
				<div className="form-group form-check">
					<CheckBoxForm label="Agree to terms of service" id="agreeterms" name="agreeterms" />
				</div>
				<div className="text-center">
					{register.is_loading ? (
						<button type="submit" className="btn btn-success" disabled>
							<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
							Register
						</button>
					) : (
						<button type="submit" className="btn btn-success">
							Register
						</button>
					)}
					<p className="mt-3">
						<CustomLink href="/user/login" as="/user/login">
							Have an account?
						</CustomLink>
					</p>
					<p className="mt-3">or register with:</p>
					<a href="#!" className="btn-floating btn-fb btn-sm mr-1">
						<i className="fa fa-facebook" />
					</a>
					<a href="#!" className="btn-floating btn-tw btn-sm mr-1">
						<i className="fa fa-twitter" />
					</a>
					<a href="#!" className="btn-floating btn-li btn-sm mr-1">
						<i className="fa fa-linkedin" />
					</a>
					<a href="#!" className="btn-floating btn-git btn-sm">
						<i className="fa fa-github" />
					</a>
					<hr className="mt-4" />
					<p>
						By clicking <em>Register</em> you agree to our <a href="#!">terms of service</a>
					</p>
				</div>
			</Form>
		</Formik>
	);
};

export default RegisterForm;
