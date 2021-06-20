import { Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
import marked from 'marked';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import * as Yup from 'yup';

import ImagePostForm from '@/common/components/ImagePostForm/components';
import InputForm from '@/common/components/InputForm/components';
import SelectForm from '@/common/components/SelectForm/components';
import TagListForm from '@/common/components/TagListForm/components';
import TextForm from '@/common/components/TextForm/components';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';
import style from '@/modules/newPost/styles/style.module.scss';

const EditPostFormComponent = ({ editPost }) => {
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);
	const [tags, setTag] = useState(editPost.data.tags);
	const [errors, setErrors] = useState({});
	const [loadImg, setLoadImg] = useState(
		editPost.data.image ? `${process.env.IMAGES_URL}/${editPost.data.image}` : null
	);
	const FILE_SIZE = 2048 * 1024;
	const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

	const { data: listCategory } = useSWR(`/categories?offset=0&limit=${process.env.LIMIT_PAGE.LIST_CATEGORY}`, {
		revalidateOnFocus: false
	});

	const initialValues = {
		title: editPost.data.title,
		content: editPost.data.content,
		category_id: editPost.data.category.id,
		image: null
	};
	const validationSchema = Yup.object({
		title: Yup.string().required('Title is required').max(150, 'Title is maximum 128 characters'),
		content: Yup.string().required('Content is required').max(6666, 'Excerpt is maximum 250 characters'),
		category_id: Yup.number().integer('Invaild category').required('Select category'),
		image: Yup.mixed()
			.test('fileSize', 'File too large', (value) => value === null || (value && value.size <= FILE_SIZE))
			.test(
				'fileFormat',
				'Unsupported Format',
				(value) => value === null || (value && SUPPORTED_FORMATS.includes(value.type))
			)
	});
	const onSubmit = async (values) => {
		try {
			setLoading(true);
			const response = await httpRequest.upload({
				url: `/posts/${editPost.data.slug}`,
				token: getCookie('token'),
				data: {
					title: values.title,
					content: values.content,
					category_id: values.category_id,
					tags: JSON.stringify(tags)
				},
				files: {
					image: values.image
				}
			});
			if (response.data.success) {
				showToast.success('Update post success');
				router.push(`/u/${response.data.data.user.user_name}/${response.data.data.slug}`);
			}
		} catch (error) {
			console.log(error);
			if (!error.response.data.success) {
				setErrors(error.response.data);
			}
			showToast.error('Update post fail');
		} finally {
			setLoading(false);
		}
	};

	const onChangeAvatar = (e, setFieldValue) => {
		try {
			console.log(e.target.files);
			let file = e.target.files[0];
			let reader = new FileReader();
			if (file) {
				reader.onloadend = () => {
					setLoadImg(reader.result);
				};
				reader.readAsDataURL(file);
				setFieldValue('image', file);
				e.target.value = null;
				showToast.info(`Load file success "${file.name}"`);
			}
		} catch (error) {
			console.log(error);
			showToast.error();
		}
	};

	const onBlurAvatar = (e, setFieldTouched) => {
		setFieldTouched('image', e.target.files[0] || null);
	};

	const onChangeRemoveImage = (setFieldValue) => {
		setFieldValue('image', null);
		setLoadImg(null);
	};

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			{({ setFieldValue, setFieldTouched, errors: error, touched, values }) => (
				<Form>
					<h2 className="text-center mb-3">New post</h2>
					<div className="form-row">
						<div className="form-group col-md-12">
							<ImagePostForm
								label="Image (.png, .jpg, .jpeg .gif)"
								id="image"
								name="image"
								type="file"
								accept=".png, .jpg, .jpeg .gif"
								onChange={(e) => onChangeAvatar(e, setFieldValue)}
								onBlur={(e) => onBlurAvatar(e, setFieldTouched)}
								error={error.image}
								touched={touched.image}
								imageSrc={loadImg}
								imagAlt={`Post image`}
								removeImage={() => onChangeRemoveImage(setFieldValue)}
							/>
						</div>
						<div className="form-group col-md-12">
							<InputForm label="Title" placeholder="Enter title" id="title" name="title" type="text" />
						</div>
						<div className="form-group col-md-6">
							<TextForm
								rows="16"
								label="Content (Markdown)"
								placeholder="Enter content"
								id="content"
								name="content"
								type="text"
							/>
						</div>
						<div className="form-group col-md-6">
							<div className="mb-2">Preview</div>
							<div
								className={`p-1 border rounded-lg bg-white overflow-auto ${style.content__preview}`}
								dangerouslySetInnerHTML={{ __html: marked(values.content) }}
							></div>
						</div>
						<div className="form-group col-md-12">
							<SelectForm label="Category" name="category_id">
								<option value="">Select category</option>
								{!listCategory ? (
									<option value="">Loading...</option>
								) : isEmpty(listCategory?.data) ? (
									<option value="">Empty category</option>
								) : (
									listCategory?.data?.map((category) => (
										<option value={category.id} key={category.id}>
											{category.title}
										</option>
									))
								)}
							</SelectForm>
						</div>
						<div className="form-group col-md-12">
							<TagListForm tags={tags} setTag={setTag} errors={errors.error?.message?.tags} />
						</div>
					</div>
					<div className="text-left">
						{isLoading ? (
							<button type="submit" className="btn btn-primary" disabled>
								<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
								Submit
							</button>
						) : (
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						)}
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default EditPostFormComponent;
