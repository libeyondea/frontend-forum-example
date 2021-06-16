import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import TextForm from '@/common/components/TextForm/components';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';
import updateNestedArray from '@/common/utils/updateNestedArray';
import CommentLoadingComponent from '@/modules/singlePost/components/comment/components/commentLoading';

const CommentMetaComponent = ({
	listCommentClient,
	setListCommentClient,
	meta,
	setMeta,
	postSlug,
	commentId,
	isChildren = false
}) => {
	const [isLoading, setLoading] = useState(false);
	const [replyBox, setReplyBox] = useState(false);

	const initialValues = {
		content: ''
	};
	const validationSchema = Yup.object({
		content: Yup.string().required('Comment is required').max(1000, 'Comment must be at most 1000 characters')
	});
	const onSubmit = async (values, { resetForm }) => {
		try {
			setLoading(true);
			const response = await httpRequest.post({
				url: `/comments`,
				token: getCookie('token'),
				data: {
					post_slug: postSlug,
					content: values.content,
					parent_id: commentId
				}
			});
			if (response.data.success) {
				setListCommentClient(
					isChildren
						? [response.data.data].concat(listCommentClient)
						: updateNestedArray(listCommentClient, response.data.data.parent_id, response.data.data)
				);
				setMeta({
					...meta,
					total: meta.total + 1
				});
				showToast.success(`Add comment success`);
			}
		} catch (error) {
			showToast.error();
		} finally {
			setLoading(false);
			resetForm();
			setReplyBox(false);
		}
	};

	return (
		<>
			{!replyBox ? (
				<div className="d-flex justify-content-start align-items-center p-2">
					<a href="#!" className="text-decoration-none text-secondary mr-3 d-flex align-items-center">
						<i className="fa fa-heart-o fa-sm mr-1"></i>
						<span className="mr-1">666</span>
						<span className="d-none d-sm-block">likes</span>
					</a>
					<button
						type="button"
						className="p-0 text-secondary border-0 bg-transparent d-flex align-items-center"
						onClick={() => {
							setReplyBox(!replyBox);
						}}
					>
						<i className="fa fa-comment-o fa-sm mr-1"></i>
						{/* <span className="mr-1">666</span> */}
						<span className="d-none d-sm-block">reply</span>
					</button>
				</div>
			) : (
				<div className="d-flex mt-3">
					<div className="w-100">
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
								<button
									type="button"
									className="btn btn-light ml-2"
									onClick={() => {
										setReplyBox(!replyBox);
									}}
								>
									Cancel
								</button>
							</Form>
						</Formik>
					</div>
				</div>
			)}
			{isLoading && <CommentLoadingComponent />}
		</>
	);
};

export default CommentMetaComponent;
