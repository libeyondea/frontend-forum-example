import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';

import ImageUserForm from '@/common/components/ImageUserForm/components';
import InputForm from '@/common/components/InputForm/components';
import SelectForm from '@/common/components/SelectForm/components';
import TextForm from '@/common/components/TextForm/components';
import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const EditProfileFormComponent = ({ editProfile }) => {
	const router = useRouter();
	const { mutateUser } = useUser();
	const [isLoading, setLoading] = useState(false);
	const [loadImg, setLoadImg] = useState(`${process.env.IMAGES_URL}/${editProfile.data.avatar}`);
	const [errors, setErrors] = useState({});
	const gender = ['', 'male', 'female', 'orther'];
	const FILE_SIZE = 2048 * 1024;
	const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

	const initialValues = {
		first_name: editProfile?.data?.first_name,
		last_name: editProfile?.data?.last_name,
		user_name: editProfile?.data?.user_name,
		email: editProfile?.data?.email,
		phone_number: editProfile?.data.phone_number || '',
		address: editProfile?.data.address || '',
		gender: editProfile?.data.gender || '',
		avatar: null
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
		avatar: Yup.mixed()
			.test('fileSize', 'File too large', (value) => value === null || (value && value.size <= FILE_SIZE))
			.test(
				'fileFormat',
				'Unsupported Format',
				(value) => value === null || (value && SUPPORTED_FORMATS.includes(value.type))
			),
		gender: Yup.string().oneOf(['male', 'female', 'orther', null], 'Gender invalid').nullable()
	});

	const onSubmit = async (values) => {
		try {
			setLoading(true);
			const response = await httpRequest.upload({
				url: `/settings/profile`,
				token: getCookie('token'),
				data: {
					first_name: values.first_name,
					last_name: values.last_name,
					user_name: values.user_name,
					email: values.email,
					password: values.password,
					phone_number: values.phone_number,
					address: values.address,
					gender: values.gender
				},
				files: {
					avatar: values.avatar
				}
			});
			if (!response.data.success) {
				setErrors(response.data);
				showToast.error('Validation form errors');
			}
			if (response.data.success) {
				await mutateUser();
				router.push(`/settings/profile`);
				showToast.success(`Update profile success`);
			}
		} catch (error) {
			console.log(error.response);
			showToast.error();
		} finally {
			setLoading(false);
		}
	};

	const onChangeAvatar = (e, setFieldValue) => {
		try {
			console.log(e.target.files[0]);
			let file = e.target.files[0];
			let reader = new FileReader();
			if (file) {
				reader.onloadend = () => {
					setLoadImg(reader.result);
				};
				reader.readAsDataURL(file);
				setFieldValue('avatar', file);
				e.target.value = null;
				showToast.info(`Load file success "${file.name}"`);
			}
		} catch (error) {
			console.log(error);
			showToast.error();
		}
	};

	const onBlurAvatar = (e, setFieldTouched) => {
		setFieldTouched('avatar', e.target.files[0] || null);
	};

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			{({ setFieldValue, setFieldTouched, errors: error, touched }) => (
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
								errors={errors.error?.invalid_params?.email}
							/>
						</div>
						<div className="form-group col-md-6">
							<InputForm
								label="User name"
								placeholder="User name"
								id="user_name"
								name="user_name"
								type="text"
								errors={errors.error?.invalid_params?.user_name}
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
							<ImageUserForm
								label="Avatar"
								id="avatar"
								name="avatar"
								type="file"
								accept=".png, .jpg, .jpeg .gif"
								onChange={(e) => onChangeAvatar(e, setFieldValue)}
								onBlur={(e) => onBlurAvatar(e, setFieldTouched)}
								error={error.avatar}
								touched={touched.avatar}
								imageSrc={loadImg}
								imagAlt={editProfile.data.user_name}
							/>
						</div>
					</div>
					<div className="text-left">
						{isLoading ? (
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
			)}
		</Formik>
	);
};

export default EditProfileFormComponent;
