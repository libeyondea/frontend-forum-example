import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import * as Yup from 'yup';

import ReactMarkdownComponent from '@/common/components/ReactMarkdown/components';
import TextForm from '@/common/components/TextForm/components';
import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';
import updateNestedArray from '@/common/utils/updateNestedArray';
import CommentLoadingComponent from '@/modules/singlePost/components/comment/components/commentLoading';
import style from '@/modules/singlePost/components/comment/styles/style.module.scss';

const CommentMetaComponent = ({
	listCommentClient,
	setListCommentClient,
	meta,
	setMeta,
	postSlug,
	commentId,
	commentSlug,
	favorited,
	totalFavorited,
	isSingleComment
}) => {
	const { user } = useUser();
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);
	const [isLoadingFav, setLoadingFav] = useState(false);
	const [replyBox, setReplyBox] = useState(false);
	const [isFavorited, setFavorited] = useState(favorited);
	const [sumFavorited, setSumFavorited] = useState(totalFavorited);
	const [isPreview, setIsPreview] = useState(false);
	const initialValues = {
		content: ''
	};
	const validationSchema = Yup.object({
		content: Yup.string().required('Comment is required').max(6666, 'Comment must be at most 6666 characters')
	});
	const onSubmit = async (values, { resetForm }) => {
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
			console.log(error);
			showToast.error();
		} finally {
			setLoading(false);
			resetForm();
			setReplyBox(false);
		}
	};

	const onFavoriteCommentClick = async (e) => {
		e.preventDefault();
		try {
			if (!user) {
				router.push('/login');
			} else {
				setLoadingFav(true);
				const response = isFavorited
					? await httpRequest.delete({
							url: `/favorite_comment`,
							params: {
								slug: commentSlug
							},
							token: getCookie('token')
					  })
					: await httpRequest.post({
							url: `/favorite_comment`,
							data: {
								slug: commentSlug
							},
							token: getCookie('token')
					  });
				if (response.data.success) {
					setFavorited(!isFavorited);
					setSumFavorited(!isFavorited ? sumFavorited + 1 : sumFavorited - 1);
					showToast.success(`${!isFavorited ? 'Liked' : 'Unliked '}`, commentSlug);
				}
			}
		} catch (error) {
			showToast.error();
		} finally {
			setLoadingFav(false);
		}
	};

	const onBoxReplyCommentClick = (e) => {
		e.preventDefault();
		if (!user) {
			router.push('/login');
		} else {
			setReplyBox(!replyBox);
			setIsPreview(false);
		}
	};

	return (
		<>
			{!replyBox ? (
				<div className="d-flex justify-content-start align-items-center mt-2">
					<button
						className={`d-flex align-items-center border-0 bg-transparent mr-3 ${
							isFavorited ? 'text-danger' : 'text-secondary'
						} ${isLoadingFav ? 'disabled' : ''}`}
						onClick={onFavoriteCommentClick}
					>
						{isFavorited ? <FaHeart className="mr-1" /> : <FaRegHeart className="mr-1" />}
						<span className="mr-1">{sumFavorited}</span>
						<span className="d-none d-sm-block">likes</span>
					</button>
					<button
						type="button"
						className="p-0 text-secondary border-0 bg-transparent d-flex align-items-center"
						onClick={onBoxReplyCommentClick}
					>
						<FaRegComment className="mr-1" />
						{/* <span className="mr-1">666</span> */}
						<span className="d-none d-sm-block">reply</span>
					</button>
				</div>
			) : (
				<div className="d-flex mt-3">
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
										<button
											type="button"
											className="btn btn-secondary mr-2"
											onClick={() => setIsPreview(false)}
											disabled={isLoading ? true : false}
										>
											Continue editing
										</button>
									) : (
										<button
											type="button"
											className="btn btn-secondary mr-2"
											onClick={() => setIsPreview(true)}
											disabled={isLoading ? true : false}
										>
											Preview
										</button>
									)}
									<button
										type="button"
										className="btn btn-light"
										onClick={onBoxReplyCommentClick}
										disabled={isLoading ? true : false}
									>
										Cancel
									</button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			)}
			{isLoading && <CommentLoadingComponent />}
		</>
	);
};

export default CommentMetaComponent;
