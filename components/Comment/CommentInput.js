import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import CustomImage from '@/components/Common/CustomImage';
import CustomLink from '@/components/Common/CustomLink';
import TextForm from '@/components/Form/TextForm';
import { createCommentRequestedAction } from '@/redux/actions/commentAction';

const CommentInput = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.users.current_user);
	const createComment = useSelector((state) => state.comments.create_comment);
	const router = useRouter();
	const {
		query: { pid }
	} = router;

	const initialValues = {
		content: ''
	};
	const validationSchema = Yup.object({
		content: Yup.string().required('Content is required')
	});

	const onSubmit = (values, { resetForm }) => {
		const comment = {
			post_slug: pid,
			content: values.content
		};
		dispatch(createCommentRequestedAction(comment));
		resetForm();
	};

	if (!currentUser.is_authenticated && !currentUser.is_loading) {
		return (
			<div className="mb-3">
				<CustomLink className="text-decoration-none" href="/login">
					Login
				</CustomLink>
				&nbsp;or&nbsp;
				<CustomLink className="text-decoration-none" href="/register">
					Register
				</CustomLink>
				&nbsp;to add comments on this post.
			</div>
		);
	}
	return (
		<div className="media my-5">
			<CustomLink href="/users/[pid]" as={`/users/${currentUser.user?.user_name}`}>
				<CustomImage
					width="50"
					height="50"
					src={currentUser.user?.avatar}
					alt={currentUser.user?.user_name}
					className="d-flex mr-3 mb-3 rounded-circle"
				/>
			</CustomLink>
			<div className="media-body">
				<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
					<Form>
						<div className="form-group">
							<TextForm rows={3} placeholder="Write a comment..." id="content" name="content" />
						</div>
						{createComment.is_loading ? (
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
	);
};

export default CommentInput;
