import Link from 'next/link';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import useUser from '@/common/hooks/useUser';
import timeFormat from '@/common/utils/timeFormat';
import style from '@/modules/singleComment/styles/style.module.scss';
import CommentLoopComponent from '@/modules/singlePost/components/comment/components/commentLoop';
import CommentMetaComponent from '@/modules/singlePost/components/comment/components/commentMeta';

const SingleCommentComponent = ({ singleComment }) => {
	const { user } = useUser();
	const [minimized, setMinimized] = useState(false);
	const [listCommentClient, setListCommentClient] = useState(singleComment.data.children_comment);
	const [meta, setMeta] = useState({
		total: 0
	});

	return (
		<div className="container-xl my-4">
			<div className="row">
				<div className="col-md-8 mx-auto">
					<div className="wapper__card bg-light rounded-lg shadow-sm p-3 p-sm-4">
						<h4 className="mb-3">
							<span className="text-secondary">Comment on: </span>
							{singleComment.data.post.title}
						</h4>
						<CustomLink
							href={`/u/${singleComment.data.post.user?.user_name}/${singleComment.data.post.slug}`}
							className="btn btn-outline-secondary"
						>
							View post
						</CustomLink>
					</div>
				</div>
				{singleComment.data.parent_comment?.content && (
					<div className="col-md-9 mx-auto">
						<div className="wapper__card bg-light rounded-lg shadow-sm p-3 p-sm-4">
							<h4 className="mb-0">
								<span className="text-secondary">Replies for: </span>
								<CustomLink
									href={`/u/${singleComment.data.post.user?.user_name}/${singleComment.data.post.slug}/comment/${singleComment.data.parent_comment.slug}`}
									className="text-decoration-none text-dark"
								>
									{singleComment.data.parent_comment.content}
								</CustomLink>
							</h4>
						</div>
					</div>
				)}

				<div className="col-md-10 mx-auto">
					<div className="wapper__card bg-light rounded-lg shadow-sm p-3 p-sm-5">
						<div className="d-flex">
							{!minimized ? (
								<>
									<div className="flex-shrink-0 mr-2 mr-sm-3 d-flex flex-column">
										<CustomLink
											href={`/u/${singleComment.data.user?.user_name}`}
											className="mb-2 text-decoration-none d-inline-flex"
										>
											<CustomImage
												width="33"
												height="33"
												src={`${process.env.IMAGES_URL}/${singleComment.data.user?.avatar}`}
												alt={singleComment.data.user?.user_name}
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
												<div className="d-flex align-items-sm-center flex-column flex-sm-row">
													<CustomLink
														href={`/u/${singleComment.data.user?.user_name}`}
														className="text-decoration-none text-dark d-inline-block"
													>
														<h6 className="my-0">{singleComment.data.user?.user_name}</h6>
													</CustomLink>
													<span className="font-weight-bold d-none d-sm-block">・</span>
													<div className="mx-0 my-0 text-muted">
														<time dateTime={singleComment.data.created_at} className="">
															{timeFormat(singleComment.data.created_at)}
														</time>
													</div>
												</div>
												<div className="ml-auto">
													<Dropdown as={NavItem}>
														<Dropdown.Toggle
															as={NavLink}
															id="dropdown-comment-card-single"
															className={`d-flex align-items-center text-secondary p-0 ${style.custom__dropdown__toggle}`}
														>
															<svg width={25} height={25}>
																<path
																	d="M5 12.5c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41A1.93 1.93 0 0 0 7 10.5c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41zm5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59-.39.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59.56 0 1.03-.2 1.42-.59.39-.39.58-.86.58-1.41 0-.55-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59-.39.39-.58.86-.58 1.41z"
																	fillRule="evenodd"
																/>
															</svg>
														</Dropdown.Toggle>
														<Dropdown.Menu align="right" className="p-0 rounded-lg shadow-sm">
															<Link
																href={`/u/${singleComment.data.post.user?.user_name}/${singleComment.data.post.slug}/comment/${singleComment.data.slug}`}
																passHref
															>
																<Dropdown.Item>Open</Dropdown.Item>
															</Link>
															<Link href={`/report-abuse`} passHref>
																<Dropdown.Item>Report abuse</Dropdown.Item>
															</Link>
															{user && user?.user_name === singleComment.data.user?.user_name && (
																<>
																	<Link
																		href={`/u/${singleComment.data.post.user?.user_name}/${singleComment.data.post.slug}/comment/${singleComment.data.slug}/edit`}
																		passHref
																	>
																		<Dropdown.Item>Edit</Dropdown.Item>
																	</Link>
																	<Link
																		href={`/u/${singleComment.data.post.user?.user_name}/${singleComment.data.post.slug}/comment/${singleComment.data.slug}/delete`}
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
											<div>{singleComment.data.content}</div>
										</div>
										<CommentMetaComponent
											listCommentClient={listCommentClient}
											setListCommentClient={setListCommentClient}
											meta={meta}
											setMeta={setMeta}
											postSlug={singleComment.data.post.slug}
											favorited={singleComment.data.favorited}
											totalFavorited={singleComment.data.total_favorited}
											commentId={singleComment.data.id}
											commentSlug={singleComment.data.slug}
											isChildren={true}
										/>
										<CommentLoopComponent
											comments={listCommentClient}
											listCommentClient={listCommentClient}
											setListCommentClient={setListCommentClient}
											meta={meta}
											setMeta={setMeta}
											postUserName={singleComment.data.post.user.user_name}
											postSlug={singleComment.data.post.slug}
										/>
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
												href={`/u/${singleComment.data.user?.user_name}`}
												className="text-decoration-none text-dark d-inline-block"
											>
												<h6 className="my-0">{singleComment.data.user?.user_name}</h6>
											</CustomLink>
											<span className="font-weight-bold">・</span>
											<div className="mx-0 my-0 text-muted">
												<time dateTime={singleComment.data.created_at}>
													{timeFormat(singleComment.data.created_at)}
												</time>
											</div>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleCommentComponent;
