import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import * as Yup from 'yup';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import TextForm from '@/common/components/TextForm/components';
import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const EditCommentComponent = ({ editComment }) => {
	const router = useRouter();
	const { user } = useUser();
	const [isLoading, setLoading] = useState(false);

	const initialValues = {
		content: editComment.data.content
	};
	const validationSchema = Yup.object({
		content: Yup.string().required('Comment is required').max(1000, 'Comment must be at most 1000 characters')
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
			showToast.error();
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container-xl my-4">
			<div className="row">
				<div className="col-md-10 mx-auto">
					<div className="wapper__card bg-light rounded-lg shadow-sm p-3 p-sm-5">
						<h4 className="mb-4">Editing comment</h4>
						<div>
							<div className="my-4 d-flex align-items-start flex-column flex-sm-row">
								<CustomLink href={`/u/${user?.user_name}`} className="mr-3 mb-3">
									<CustomImage
										width="50"
										height="50"
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
											<button type="button" className="btn btn-light ml-2" onClick={() => router.back()}>
												Back
											</button>
										</Form>
									</Formik>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditCommentComponent;
