import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';

import CustomImage from '@/components/Common/CustomImage';
import CustomLink from '@/components/Common/CustomLink';
import LoadingComment from '@/components/Common/LoadingComment';
import TextForm from '@/components/Form/TextForm';
import useUser from '@/lib/hooks/useUser';
import httpRequest from '@/lib/utils/httpRequest';
import { getCookie } from '@/lib/utils/session';
import showToast from '@/lib/utils/showToast';

const CommentInput = ({ mutateListComment }) => {
	const router = useRouter();
	const { user } = useUser();
	const [isLoading, setLoading] = useState(false);
	const {
		query: { pid }
	} = router;

	const initialValues = {
		content: ''
	};
	const validationSchema = Yup.object({
		content: Yup.string().required('Comment is required').max(1000, 'Comment must be at most 1000 characters')
	});
	const onSubmit = async (values, { resetForm }) => {
		try {
			const comment = {
				post_slug: pid,
				content: values.content
			};
			setLoading(true);
			const response = await httpRequest.post({
				url: `/comments`,
				token: getCookie('token'),
				data: comment
			});
			if (response.data.success) {
				await mutateListComment();
				showToast.success(`Add comment success`);
			}
		} catch (error) {
			console.log(error.response);
			showToast.error();
		} finally {
			setLoading(false);
			resetForm();
		}
	};

	return (
		<>
			{user && (
				<div className="media my-5">
					<CustomLink href="/users/[pid]" as={`/users/${user?.user_name}`} className="mr-3 mb-3">
						<CustomImage
							width="50"
							height="50"
							src={`${process.env.IMAGES_URL}/${user?.avatar}`}
							alt={user?.user_name}
							className="d-flex rounded-circle"
						/>
					</CustomLink>
					<div className="media-body">
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
			)}
			{isLoading && <LoadingComment />}
		</>
	);
};

export default CommentInput;
