import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import CustomLink from '@/components/Common/CustomLink';
import FacebookLoginButton from '@/components/Common/FacebookLoginButton';
import GoogleLoginButton from '@/components/Common/GoogleLoginButton';
import InputForm from '@/components/Form/InputForm';
import { loginUserRequestedAction } from '@/redux/actions/userAction';

const LoginForm = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const login = useSelector((state) => state.users.login);

	const initialValues = {
		user_name: '',
		password: ''
	};
	const validationSchema = Yup.object({
		user_name: Yup.string().required('User name is required'),
		password: Yup.string().required('Password is required')
	});

	const onSubmit = (values) => {
		const user = {
			user_name: values.user_name,
			password: values.password
		};
		dispatch(loginUserRequestedAction(user, router));
	};

	const handleSocialLogin = (res) => {
		const user = {
			access_token: res._token.accessToken,
			provider: res._provider
		};
		dispatch(loginUserRequestedAction(user, router));
	};

	const handleSocialLoginFailure = (err) => {
		console.error(err);
	};
	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			<Form>
				<h2 className="text-center mb-3">Login</h2>
				<div className="form-group">
					<InputForm
						label="User name"
						placeholder="Enter user name"
						id="user_name"
						name="user_name"
						type="text"
						errors={login.errors?.user}
					/>
				</div>
				<div className="form-group">
					<InputForm
						label="Password"
						placeholder="Password"
						id="password"
						name="password"
						type="password"
						errors={login.errors?.user}
					/>
				</div>
				<div className="d-flex justify-content-between mb-3">
					<div className="form-group form-check">
						<input type="checkbox" className="form-check-input" id="remember" />
						<label className="form-check-label" htmlFor="remember">
							Remember
						</label>
					</div>
					<span>
						<CustomLink className="text-decoration-none" href="/user/forgot-password">
							Forgot password?
						</CustomLink>
					</span>
				</div>
				<div className="text-center">
					{login.is_loading ? (
						<button type="submit" className="btn btn-success" disabled>
							<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
							Login
						</button>
					) : (
						<button type="submit" className="btn btn-success">
							Login
						</button>
					)}
					<p className="mt-3">
						Not a member?{' '}
						<CustomLink className="text-decoration-none" href="/register">
							Need an account?
						</CustomLink>
					</p>
					<p>or login in with:</p>
					<div>
						<FacebookLoginButton
							handleSocialLogin={handleSocialLogin}
							handleSocialLoginFailure={handleSocialLoginFailure}
						/>
					</div>
					<div>
						<GoogleLoginButton
							handleSocialLogin={handleSocialLogin}
							handleSocialLoginFailure={handleSocialLoginFailure}
						/>
					</div>
				</div>
			</Form>
		</Formik>
	);
};

export default LoginForm;
