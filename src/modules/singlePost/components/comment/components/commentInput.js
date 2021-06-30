import React, { useState } from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import useUser from '@/common/hooks/useUser';
import CommentFormComponent from '@/modules/singlePost/components/comment/components/commentForm';
import CommentLoadingComponent from '@/modules/singlePost/components/comment/components/commentLoading';
import style from '@/modules/singlePost/components/comment/styles/style.module.scss';

const CommentInput = ({ listCommentClient, setListCommentClient, meta, setMeta, postSlug }) => {
	const { user } = useUser();
	const [isLoading, setLoading] = useState(false);
	const [isPreview, setIsPreview] = useState(false);

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
						<CommentFormComponent
							isLoading={isLoading}
							setLoading={setLoading}
							isPreview={isPreview}
							setIsPreview={setIsPreview}
							listCommentClient={listCommentClient}
							setListCommentClient={setListCommentClient}
							meta={meta}
							setMeta={setMeta}
							postSlug={postSlug}
						/>
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
