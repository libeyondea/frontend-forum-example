import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import ReactMarkdownComponent from '@/common/components/ReactMarkdown/components';
import TextForm from '@/common/components/TextForm/components';
import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';
import CommentLoadingComponent from '@/modules/singlePost/components/comment/components/commentLoading';
import style from '@/modules/singlePost/components/comment/styles/style.module.scss';

const CommentInput = ({ listCommentClient, setListCommentClient, meta, setMeta, postSlug }) => {
	const { user } = useUser();
	const [isLoading, setLoading] = useState(false);
	const [isPreview, setIsPreview] = useState(false);

	const initialValues = {
		content: ''
	};
	const validationSchema = Yup.object({
		content: Yup.string().required('Comment is required').max(6666, 'Comment must be at most 6666 characters')
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
				<div className="my-4 d-flex">
					<div className="flex-shrink-0 mr-2 mr-sm-3 d-flex flex-column">
						<CustomLink href={`/u/${user?.user_name}`} className="d-inline-flex">
							<CustomImage
								width="33"
								height="33"
								src={`${process.env.IMAGES_URL}/${user?.avatar}`}
								alt={user?.user_name}
								className="d-flex rounded-circle"
							/>
						</CustomLink>
					</div>
					<div className={`w-100 ${style.comment__detail}`}>
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
							{({ values }) => (
								<Form>
									{isPreview ? (
										<div className={`rounded-lg shadow-sm border bg-white p-2 p-sm-3 mb-3`}>
											<ReactMarkdownComponent text={values.content} />
										</div>
									) : (
										<div className="form-group">
											<TextForm rows={5} placeholder="Write a comment..." id="content" name="content" />
										</div>
									)}
									{isLoading ? (
										<button type="submit" className="btn btn-primary mr-2" disabled>
											<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
											Submit
										</button>
									) : (
										<button type="submit" className="btn btn-primary mr-2">
											Submit
										</button>
									)}
									{isPreview ? (
										<button type="button" className="btn btn-secondary" onClick={() => setIsPreview(false)}>
											Continue editing
										</button>
									) : (
										<button
											type="button"
											className="btn btn-secondary"
											onClick={() => setIsPreview(true)}
											disabled={isLoading ? true : false}
										>
											Preview
										</button>
									)}
								</Form>
							)}
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
