import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import CustomLink from '@/common/components/CustomLink/components';
import InputForm from '@/common/components/InputForm/components';
import httpRequest from '@/common/utils/httpRequest';
import showToast from '@/common/utils/showToast';

const VerifyEmailComponent = ({ verifyEmail }) => {
	const [isLoading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const initialValues = {
		email: (verifyEmail && verifyEmail.data?.email) || ''
	};
	const validationSchema = Yup.object({
		email: Yup.string()
			.matches(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Email invalid'
			)
			.required('Email is required')
	});

	const onSubmit = async (values) => {
		try {
			setLoading(true);
			const response = await httpRequest.post({
				url: `/email/resend`,
				data: {
					email: values.email
				}
			});
			if (response.data.success) {
				showToast.success(`Resend email '${response.data.data.email}' success`);
			}
		} catch (error) {
			if (!error.response.data.success) {
				setErrors(error.response.data);
			}
			showToast.error();
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container-xl my-4">
			<div className="row">
				<div className="col-lg-8 col-md-10 mx-auto">
					<div className="bg-light rounded-lg shadow-sm p-4">
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
							<Form>
								<h2 className="text-center mb-3">Verify email</h2>
								{verifyEmail && (
									<div className="alert alert-success" role="alert">
										<span className="mr-1 text-dark">Verify success</span>
										<CustomLink className="text-decoration-none" href="/login">
											Login account
										</CustomLink>
									</div>
								)}
								<div className="form-group">
									<InputForm
										label="Email verify"
										placeholder="Enter email"
										id="email"
										name="email"
										type="text"
										errors={errors.error?.message}
									/>
								</div>
								<div className="text-center">
									{isLoading ? (
										<button type="submit" className="btn btn-info" disabled>
											<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
											Resend email
										</button>
									) : (
										<button type="submit" className="btn btn-info">
											Resend email
										</button>
									)}
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifyEmailComponent;
