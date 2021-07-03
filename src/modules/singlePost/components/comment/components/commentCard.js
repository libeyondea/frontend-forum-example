import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { BsChevronContract, BsChevronExpand } from 'react-icons/bs';
import { FaEllipsisH } from 'react-icons/fa';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import ReactMarkdownComponent from '@/common/components/ReactMarkdown/components';
import useUser from '@/common/hooks/useUser';
import timeFormat from '@/common/utils/timeFormat';
import CommentLoopComponent from '@/modules/singlePost/components/comment/components/commentLoop';
import CommentMetaComponent from '@/modules/singlePost/components/comment/components/commentMeta';
import style from '@/modules/singlePost/components/comment/styles/style.module.scss';

const CommentCard = ({
	comment,
	listCommentClient,
	setListCommentClient,
	meta,
	setMeta,
	postUserName,
	postSlug,
	isSingleComment = false
}) => {
	const { user } = useUser();
	const [minimized, setMinimized] = useState(false);

	return (
		<div className={`d-flex ${!isSingleComment ? 'mt-3 mt-sm-4' : ''}`}>
			<>
				<div className={`flex-shrink-0 me-2 me-sm-3 flex-column ${minimized ? 'd-none' : 'd-flex'}`}>
					<CustomLink href={`/u/${comment.user?.user_name}`} className="mb-2 text-decoration-none d-inline-flex">
						<CustomImage
							width="33"
							height="33"
							src={`${process.env.IMAGES_URL}/${comment.user?.avatar}`}
							alt={comment.user?.user_name}
							className="rounded-circle h-100 w-100"
						/>
					</CustomLink>
					<button
						type="button"
						className="p-0 text-secondary border-0 bg-transparent d-flex justify-content-center w-100"
						onClick={() => {
							setMinimized(!minimized);
						}}
					>
						<BsChevronContract className="fw-bold" />
					</button>
					<div className="border-start border-2 w-0 h-100 mx-auto mt-2"></div>
				</div>
				<div className={`w-100 ${style.comment__detail} ${minimized ? 'd-none' : 'd-block'}`}>
					<div className="rounded-3 shadow-sm border p-2 p-sm-3 bg-white text-break">
						<div className="d-flex align-items-center mb-2">
							<div className="d-flex align-items-sm-center flex-column flex-sm-row me-auto">
								<CustomLink
									href={`/u/${comment.user?.user_name}`}
									className="text-decoration-none text-dark d-inline-block"
								>
									<h6 className="my-0">{comment.user?.user_name}</h6>
								</CustomLink>
								<span className="fw-bold d-none d-sm-block mx-1">•</span>
								<CustomLink
									href={`/u/${postUserName}/${comment.post.slug}/comment/${comment.slug}`}
									className="text-decoration-none text-secondary d-inline-block"
								>
									<time dateTime={comment.created_at}>{timeFormat(comment.created_at)}</time>
									{comment.updated_at > comment.created_at && (
										<>
											{` `}• Edited on <time dateTime={comment.updated_at}>{timeFormat(comment.updated_at)}</time>
										</>
									)}
								</CustomLink>
							</div>
							<div className="">
								<OverlayTrigger
									trigger="click"
									key="options-comment"
									placement="left"
									overlay={
										<Popover id={`popover-positioned-options-comment`}>
											<Popover.Header as="h3">Options</Popover.Header>
											<Popover.Body className="p-0">
												<CustomLink
													href={`/u/${postUserName}/${comment.post.slug}/comment/${comment.slug}`}
													className="d-flex align-items-center dropdown-item"
												>
													Open
												</CustomLink>
												<CustomLink href={`/report_abuse`} className="d-flex align-items-center dropdown-item">
													Report abuse
												</CustomLink>
												{user && user?.user_name === comment.user?.user_name && (
													<>
														<CustomLink
															href={`/u/${postUserName}/${comment.post.slug}/comment/${comment.slug}/edit`}
															className="d-flex align-items-center dropdown-item"
														>
															Edit
														</CustomLink>
														<CustomLink
															href={`/u/${postUserName}/${comment.post.slug}/comment/${comment.slug}/delete`}
															className="d-flex align-items-center dropdown-item"
														>
															Delete
														</CustomLink>
													</>
												)}
											</Popover.Body>
										</Popover>
									}
								>
									<button type="button" className="d-flex align-items-center p-0 border-0 bg-transparent">
										<FaEllipsisH />
									</button>
								</OverlayTrigger>
							</div>
						</div>
						<ReactMarkdownComponent text={comment.content} />
					</div>
					<CommentMetaComponent
						listCommentClient={listCommentClient}
						setListCommentClient={setListCommentClient}
						meta={meta}
						setMeta={setMeta}
						postSlug={postSlug}
						favorited={comment.favorited}
						totalFavorited={comment.total_favorited}
						commentId={comment.id}
						commentSlug={comment.slug}
						isSingleComment={isSingleComment}
					/>
					{isSingleComment ? (
						<CommentLoopComponent
							comments={listCommentClient}
							listCommentClient={listCommentClient}
							setListCommentClient={setListCommentClient}
							meta={meta}
							setMeta={setMeta}
							postUserName={postUserName}
							postSlug={postSlug}
						/>
					) : (
						comment.children_comment && (
							<CommentLoopComponent
								comments={comment.children_comment}
								listCommentClient={listCommentClient}
								setListCommentClient={setListCommentClient}
								meta={meta}
								setMeta={setMeta}
								postUserName={postUserName}
								postSlug={postSlug}
							/>
						)
					)}
				</div>
			</>
			<>
				<div className={`flex-shrink-0 me-3 align-items-center ${minimized ? 'd-flex' : 'd-none'}`}>
					<button
						type="button"
						className="p-0 text-secondary border-0 bg-transparent d-flex justify-content-center w-100"
						onClick={() => {
							setMinimized(!minimized);
						}}
					>
						<BsChevronExpand />
					</button>
				</div>
				<div className={`w-100 ${style.comment__detail} ${minimized ? 'd-block' : 'd-none'}`}>
					<div className="d-flex align-items-center rounded-3 shadow-sm border p-2 p-sm-3 bg-white text-break">
						<CustomLink
							href={`/u/${comment.user?.user_name}`}
							className="text-decoration-none text-dark d-inline-block"
						>
							<h6 className="my-0">{comment.user?.user_name}</h6>
						</CustomLink>
						<span className="fw-bold">・</span>
						<div className="mx-0 my-0 text-muted">
							<time dateTime={comment.created_at}>{timeFormat(comment.created_at)}</time>
						</div>
					</div>
				</div>
			</>
		</div>
	);
};

export default CommentCard;
