import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';

import CustomLink from '@/components/Common/CustomLink';
import InputForm from '@/components/Form/InputForm';
import FacebookLoginButton from '@/components/SocialButtonLogin/Facebook';
import GoogleLoginButton from '@/components/SocialButtonLogin/Google';
import httpRequest from '@/lib/utils/httpRequest';
import { setCookie } from '@/lib/utils/session';
import showToast from '@/lib/utils/showToast';

const LoginForm = () => {
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const initialValues = {
		user_name: '',
		password: ''
	};
	const validationSchema = Yup.object({
		user_name: Yup.string().required('User name is required'),
		password: Yup.string().required('Password is required')
	});

	const onSubmit = async (values) => {
		try {
			const user = {
				user_name: values.user_name,
				password: values.password
			};
			setLoading(true);
			const response = await httpRequest.post({
				url: `/users/login`,
				data: user
			});
			if (response.data.success) {
				setCookie('token', response.data.data.access_token);
				router.push('/');
			} else {
				setErrors(response.data);
			}
		} catch (error) {
			console.log(error.response);
			showToast.error();
		} finally {
			setLoading(false);
		}
	};

	const handleSocialLogin = async (res) => {
		try {
			const user = {
				access_token: res._token.accessToken,
				provider: res._provider
			};
			setLoading(true);
			const response = await httpRequest.post({
				url: `/users/login`,
				data: user
			});
			if (response.data.success) {
				setCookie('token', response.data.data.access_token);
				router.push('/');
			}
		} catch (error) {
			console.log(error.response);
			showToast.error();
		} finally {
			setLoading(false);
		}
	};

	const handleSocialLoginFailure = (error) => {
		console.error(error);
		showToast.error();
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
						errors={errors.errors?.title}
					/>
				</div>
				<div className="form-group">
					<InputForm
						label="Password"
						placeholder="Password"
						id="password"
						name="password"
						type="password"
						errors={errors.errors?.title}
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
					{isLoading ? (
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
