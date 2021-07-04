import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import LoadingSpinnerComponent from '@/common/components/LoadingSpinner/components';
import ReactMarkdownComponent from '@/common/components/ReactMarkdown/components';
import TextForm from '@/common/components/TextForm/components';
import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const EditCommentComponent = ({ editComment }) => {
	const router = useRouter();
	const { user } = useUser();
	const [isLoading, setLoading] = useState(false);
	const [isPreview, setIsPreview] = useState(false);

	const initialValues = {
		content: editComment.data.content
	};

	const validationSchema = Yup.object({
		content: Yup.string().required('Comment is required').max(6666, 'Comment must be at most 6666 characters')
	});

	const onSubmit = async (values) => {
		try {
			const comment = {
				content: values.content,
				post_slug: editComment.data.post.slug
			};
			setLoading(true);
			const response = await httpRequest.put({
				url: `/comments/${editComment.data.slug}`,
				token: getCookie('token'),
				data: comment
			});
			if (response.data.success) {
				showToast.success(`Update comment success`);
				router.push(
					`/u/${editComment.data.post.user.user_name}/${editComment.data.post.slug}/comment/${editComment.data.slug}`
				);
			}
		} catch (error) {
			showToast.error(`Update comment error`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container-xl py-4">
			{!user ? (
				<LoadingSpinnerComponent />
			) : (
				<div className="row">
					<div className="col-md-10 mx-auto">
						<div className="wapper__card bg-light rounded-3 shadow-sm p-3 p-sm-5">
							<h4 className="mb-4">Editing comment</h4>
							<div>
								<div className="my-4 d-flex align-items-start flex-column flex-sm-row">
									<CustomLink href={`/u/${user?.user_name}`} className={`me-3 mb-3 ${isLoading ? 'disabled' : ''}`}>
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
											{({ values }) => (
												<Form>
													{isPreview ? (
														<div className={`rounded-3 shadow-sm border bg-white p-2 p-sm-3 mb-3`}>
															<ReactMarkdownComponent markdown={values.content} />
														</div>
													) : (
														<div className="mb-3">
															<TextForm
																rows={5}
																placeholder="Write a comment..."
																id="content"
																name="content"
																disabled={isLoading ? true : false}
															/>
														</div>
													)}
													{isLoading ? (
														<button type="submit" className="btn btn-primary me-2" disabled>
															<span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
															Submit
														</button>
													) : (
														<button type="submit" className="btn btn-primary me-2">
															Submit
														</button>
													)}
													{isPreview ? (
														<button
															type="button"
															className="btn btn-secondary me-2"
															onClick={() => setIsPreview(false)}
															disabled={isLoading ? true : false}
														>
															Continue editing
														</button>
													) : (
														<button
															type="button"
															className="btn btn-secondary me-2"
															onClick={() => setIsPreview(true)}
															disabled={isLoading ? true : false}
														>
															Preview
														</button>
													)}
													<CustomLink
														className={`btn btn-light ${isLoading ? 'disabled' : ''}`}
														href={`/u/${editComment.data.post.user.user_name}/${editComment.data.post.slug}/comment/${editComment.data.slug}`}
													>
														Cancel
													</CustomLink>
												</Form>
											)}
										</Formik>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditCommentComponent;
