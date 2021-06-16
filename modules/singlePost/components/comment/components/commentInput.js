import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import TextForm from '@/common/components/TextForm/components';
import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';
import CommentLoadingComponent from '@/modules/singlePost/components/comment/components/commentLoading';

const CommentInput = ({ listCommentClient, setListCommentClient, meta, setMeta, postSlug }) => {
	const { user } = useUser();
	const [isLoading, setLoading] = useState(false);

	const initialValues = {
		content: ''
	};
	const validationSchema = Yup.object({
		content: Yup.string().required('Comment is required').max(1000, 'Comment must be at most 1000 characters')
	});
	const onSubmit = async (values, { resetForm }) => {
		try {
			const comment = {
				post_slug: postSlug,
				content: values.content
			};
			setLoading(true);
			const response = await httpRequest.post({
				url: `/comments`,
				token: getCookie('token'),
				data: comment
			});
			if (response.data.success) {
				setListCommentClient([response.data.data].concat(listCommentClient));
				setMeta({
					...meta,
					total: meta.total + 1,
					total_parent: meta.total_parent + 1
				});
				showToast.success(`Add comment success`);
			}
		} catch (error) {
			console.log(error);
			showToast.error();
		} finally {
			setLoading(false);
			resetForm();
		}
	};

	return (
		<>
			{user && (
				<div className="my-4 d-flex align-items-start flex-column flex-sm-row">
					<CustomLink href={`/u/${user?.user_name}`} className="mr-3 mb-3">
						<CustomImage
							width="33"
							height="33"
							src={`${process.env.IMAGES_URL}/${user?.avatar}`}
							alt={user?.user_name}
							className="d-flex rounded-circle"
						/>
					</CustomLink>
					<div className="flex-fill w-100">
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
							<Form>
								<div className="form-group">
									<TextForm rows={3} placeholder="Write a comment..." id="content" name="content" />
								</div>
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
							</Form>
						</Formik>
					</div>
				</div>
			)}
			{!user && (
				<div className="my-4">
					<CustomLink className="text-decoration-none" href="/login">
						Login
					</CustomLink>
					&nbsp;or&nbsp;
					<CustomLink className="text-decoration-none" href="/register">
						Register
					</CustomLink>
					&nbsp;to add comments on this post.
				</div>
			)}
			{isLoading && <CommentLoadingComponent />}
		</>
	);
};

export default CommentInput;
