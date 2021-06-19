import Link from 'next/link';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import useUser from '@/common/hooks/useUser';
import timeFormat from '@/common/utils/timeFormat';
import CommentLoopComponent from '@/modules/singlePost/components/comment/components/commentLoop';
import CommentMetaComponent from '@/modules/singlePost/components/comment/components/commentMeta';
import style from '@/modules/singlePost/components/comment/styles/style.module.scss';

const CommentCard = ({ comment, listCommentClient, setListCommentClient, meta, setMeta, postUserName, postSlug }) => {
	const { user } = useUser();
	const [minimized, setMinimized] = useState(false);

	return (
		<div className="mt-4 d-flex">
			{!minimized ? (
				<>
					<div className="flex-shrink-0 mr-2 mr-sm-3 d-flex flex-column">
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={33}
								height={33}
								viewBox="0 0 24 24"
								role="img"
								aria-labelledby="a2384skryq2p7sphxymi79f8nnvpewfn"
								className="crayons-icon expanded"
							>
								<title id="a2384skryq2p7sphxymi79f8nnvpewfn">Minimize</title>
								<path d="M12 10.677L8 6.935 9 6l3 2.807L15 6l1 .935-4 3.742zm0 4.517L9 18l-1-.935 4-3.742 4 3.742-1 .934-3-2.805z" />
							</svg>
						</button>
						<div className="border-left border-secondary w-0 h-100 mx-auto mt-2"></div>
					</div>
					<div className="w-100">
						<div className="rounded-lg shadow-sm border p-3 bg-white text-break">
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
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={24}
												height={24}
												viewBox="0 0 24 24"
												role="img"
												aria-labelledby="amf1lepusdnzmtsxujxhxw7u5dhhlsay"
												className="crayons-icon pointer-events-none"
											>
												<title id="amf1lepusdnzmtsxujxhxw7u5dhhlsay">Options</title>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M8.25 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5.25 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm3.75 1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
												/>
											</svg>
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
													<Link
														href={`/u/${postUserName}/${comment.post.slug}/comment/${comment.slug}/delete`}
														passHref
													>
														<Dropdown.Item>Delete</Dropdown.Item>
													</Link>
												</>
											)}
										</Dropdown.Menu>
									</Dropdown>
								</div>
							</div>
							<div>{comment.content}</div>
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
						/>
						{comment.children_comment && (
							<CommentLoopComponent
								comments={comment.children_comment}
								listCommentClient={listCommentClient}
								setListCommentClient={setListCommentClient}
								meta={meta}
								setMeta={setMeta}
								postUserName={postUserName}
								postSlug={postSlug}
							/>
						)}
					</div>
				</>
			) : (
				<>
					<div className="flex-shrink-0 mr-3 d-flex align-items-center">
						<button
							type="button"
							className="p-0 text-secondary border-0 bg-transparent d-flex justify-content-center w-100"
							onClick={() => {
								setMinimized(!minimized);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={33}
								height={33}
								viewBox="0 0 24 24"
								role="img"
								aria-labelledby="ao9nwokf7zcleih7cta9lrn55wvw7fpj"
								className="crayons-icon collapsed"
							>
								<title id="ao9nwokf7zcleih7cta9lrn55wvw7fpj">Maximize</title>
								<path d="M12 18l-4-3.771 1-.943 3 2.829 3-2.829 1 .943L12 18zm0-10.115l-3 2.829-1-.943L12 6l4 3.771-1 .942-3-2.828z" />
							</svg>
						</button>
					</div>
					<div className="w-100">
						<div className="d-flex align-items-center rounded-lg shadow-sm border p-3 bg-white text-break">
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
			)}
		</div>
	);
};

export default CommentCard;
