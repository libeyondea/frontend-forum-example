import Link from 'next/link';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NavLink from 'react-bootstrap/NavLink';
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
		<div className={`d-flex ${!isSingleComment ? 'mt-4' : ''}`}>
			<>
				<div className={`flex-shrink-0 mr-2 mr-sm-3 flex-column ${minimized ? 'd-none' : 'd-flex'}`}>
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
						<BsChevronContract className="font-weight-bold" />
					</button>
					<div className="border-left border-secondary w-0 h-100 mx-auto mt-2"></div>
				</div>
				<div className={`w-100 ${style.comment__detail} ${minimized ? 'd-none' : 'd-block'}`}>
					<div className="rounded-lg shadow-sm border p-2 p-sm-3 bg-white text-break">
						<div className="d-flex align-items-center mb-2">
							<div className="d-flex align-items-sm-center flex-column flex-sm-row mr-auto">
								<CustomLink
									href={`/u/${comment.user?.user_name}`}
									className="text-decoration-none text-dark d-inline-block"
								>
									<h6 className="my-0">{comment.user?.user_name}</h6>
								</CustomLink>
								<span className="font-weight-bold d-none d-sm-block">・</span>
								<div className="mx-0 my-0 text-muted">
									<time dateTime={comment.created_at} className="">
										{timeFormat(comment.created_at)}
									</time>
								</div>
							</div>
							<div className="">
								<Dropdown>
									<Dropdown.Toggle
										as={NavLink}
										id="dropdown-comment-card"
										className={`d-flex align-items-center text-secondary p-0 ${style.custom__dropdown__toggle}`}
									>
										<FaEllipsisH />
									</Dropdown.Toggle>
									<Dropdown.Menu alignRight="right" className="p-0 rounded-lg shadow-sm">
										<Link href={`/u/${postUserName}/${comment.post.slug}/comment/${comment.slug}`} passHref>
											<Dropdown.Item>Open</Dropdown.Item>
										</Link>
										<Link href={`/report-abuse`} passHref>
											<Dropdown.Item>Report abuse</Dropdown.Item>
										</Link>
										{user && user?.user_name === comment.user?.user_name && (
											<>
												<Link href={`/u/${postUserName}/${comment.post.slug}/comment/${comment.slug}/edit`} passHref>
													<Dropdown.Item>Edit</Dropdown.Item>
												</Link>
												<Link href={`/u/${postUserName}/${comment.post.slug}/comment/${comment.slug}/delete`} passHref>
													<Dropdown.Item>Delete</Dropdown.Item>
												</Link>
											</>
										)}
									</Dropdown.Menu>
								</Dropdown>
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
				<div className={`flex-shrink-0 mr-3 align-items-center ${minimized ? 'd-flex' : 'd-none'}`}>
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
					<div className="d-flex align-items-center rounded-lg shadow-sm border p-2 p-sm-3 bg-white text-break">
						<CustomLink
							href={`/u/${comment.user?.user_name}`}
							className="text-decoration-none text-dark d-inline-block"
						>
							<h6 className="my-0">{comment.user?.user_name}</h6>
						</CustomLink>
						<span className="font-weight-bold">・</span>
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
