import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';
import CommentFormComponent from '@/modules/singlePost/components/comment/components/commentForm';
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
						className={`d-flex align-items-center border-0 bg-transparent me-3 ${
							isFavorited ? 'text-danger' : 'text-secondary'
						} ${isLoadingFav ? 'disabled' : ''}`}
						onClick={onFavoriteCommentClick}
					>
						{isFavorited ? <FaHeart className="me-1" /> : <FaRegHeart className="me-1" />}
						<span className="me-1">{sumFavorited}</span>
						<span className="d-none d-sm-block">likes</span>
					</button>
					<button
						type="button"
						className="p-0 text-secondary border-0 bg-transparent d-flex align-items-center"
						onClick={onBoxReplyCommentClick}
					>
						<FaRegComment className="me-1" />
						{/* <span className="me-1">666</span> */}
						<span className="d-none d-sm-block">reply</span>
					</button>
				</div>
			) : (
				<div className="d-flex mt-3">
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
							isChild
							onBoxReplyCommentClick={onBoxReplyCommentClick}
							commentId={commentId}
							isSingleComment={isSingleComment}
							setReplyBox={setReplyBox}
						/>
					</div>
				</div>
			)}
			{isLoading && <CommentLoadingComponent />}
		</>
	);
};

export default CommentMetaComponent;
