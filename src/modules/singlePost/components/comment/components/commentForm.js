import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';

import ReactMarkdownComponent from '@/common/components/ReactMarkdown/components';
import TextForm from '@/common/components/TextForm/components';
import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';
import updateNestedArray from '@/common/utils/updateNestedArray';

const CommentFormComponent = ({
	isLoading,
	setLoading,
	isPreview,
	setIsPreview,
	listCommentClient,
	setListCommentClient,
	meta,
	setMeta,
	postSlug,
	isOpenComment,
	setIsOpenComment,
	onCloseCommentClick,
	isChild = false,
	onBoxReplyCommentClick,
	commentId,
	isSingleComment,
	setReplyBox
}) => {
	const { user } = useUser();
	const router = useRouter();

	const initialValues = {
		content: ''
	};

	const validationSchema = Yup.object({
		content: Yup.string().required('Comment is required').max(6666, 'Comment must be at most 6666 characters')
	});

	const onSubmit = async (values, { resetForm }) => {
		try {
			setLoading(true);
			const response = await httpRequest.post({
				url: `/comments`,
				token: getCookie('token'),
				data: {
					post_slug: postSlug,
					content: values.content
				}
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
			showToast.error();
		} finally {
			setLoading(false);
			resetForm();
			setIsPreview(false);
		}
	};

	const onSubmitChild = async (values, { resetForm }) => {
		try {
			if (!user) {
				router.push('/login');
			} else {
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
						isSingleComment
							? [response.data.data].concat(listCommentClient)
							: updateNestedArray(listCommentClient, response.data.data.parent_id, response.data.data)
					);
					setMeta({
						...meta,
						total: meta.total + 1
					});

					showToast.success(`Add comment success`);
				}
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
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={isChild ? onSubmitChild : onSubmit}
			>
				{({ values, resetForm }) => (
					<Form>
						{isPreview ? (
							<div className={`rounded-3 shadow-sm border bg-white p-2 p-sm-3 mb-3`}>
								<ReactMarkdownComponent text={values.content} />
							</div>
						) : (
							<div className="mb-3">
								<TextForm
									onFocus={() => (!isChild ? setIsOpenComment(true) : {})}
									rows={5}
									placeholder="Write a comment..."
									id="content"
									name="content"
									onBlur={() => {}}
									disabled={isLoading ? true : false}
									style={!isChild && !isOpenComment ? { height: '66px', resize: 'none' } : {}}
								/>
							</div>
						)}
						{((!isChild && isOpenComment) || isChild) && (
							<>
								{isLoading ? (
									<button type="submit" className="btn btn-primary btn-sm me-2" disabled>
										<span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
										Submit
									</button>
								) : (
									<button type="submit" className="btn btn-primary btn-sm me-2">
										Submit
									</button>
								)}
								{isPreview ? (
									<button
										type="button"
										className="btn btn-secondary btn-sm me-2"
										onClick={() => setIsPreview(false)}
										disabled={isLoading ? true : false}
									>
										Continue editing
									</button>
								) : (
									<button
										type="button"
										className="btn btn-secondary btn-sm me-2"
										onClick={() => setIsPreview(true)}
										disabled={isLoading ? true : false}
									>
										Preview
									</button>
								)}
								<button
									type="button"
									className="btn btn-light btn-sm"
									onClick={
										isChild
											? onBoxReplyCommentClick
											: () => {
													onCloseCommentClick();
													resetForm();
											  }
									}
									disabled={isLoading ? true : false}
								>
									Cancel
								</button>
							</>
						)}
					</Form>
				)}
			</Formik>
		</>
	);
};
export default CommentFormComponent;
