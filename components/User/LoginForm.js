import React from 'react';
import { useRouter } from 'next/router';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { loginUserRequestedAction } from 'redux/actions/userAction';
import CustomLink from 'components/Common/CustomLink';
import InputForm from 'components/Form/InputForm';
import FacebookLogin from 'react-facebook-login';

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
	const responseFacebook = (response) => {
		console.log(response);
		const user = {
			access_token: response.accessToken,
			provider: 'facebook'
		};
		dispatch(loginUserRequestedAction(user, router));
	};
	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			<Form>
				<h2 className="text-center mb-3">Login now</h2>
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
						<a href="#!">Forgot password?</a>
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
						<CustomLink href="/user/register" as="/user/register">
							Need an account?
						</CustomLink>
					</p>
					<p>or sign in with:</p>
					<div className="mb-3">
						<FacebookLogin
							appId="765638147489641"
							autoLoad={false}
							fields="name,email,picture"
							size="small"
							callback={responseFacebook}
						/>
					</div>
					<a href="#!" className="btn-floating btn-tw btn-sm mr-1">
						<i className="fa fa-twitter" />
					</a>
					<a href="#!" className="btn-floating btn-li btn-sm mr-1">
						<i className="fa fa-linkedin"></i>
					</a>
					<a href="#!" className="btn-floating btn-git btn-sm">
						<i className="fa fa-github" />
					</a>
				</div>
			</Form>
		</Formik>
	);
};

export default LoginForm;
