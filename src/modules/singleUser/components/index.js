import Link from 'next/link';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FaEllipsisH, FaHashtag, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { GoReport } from 'react-icons/go';
import { GrArticle } from 'react-icons/gr';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import useUser from '@/common/hooks/useUser';
import EditProfileButtonComponent from '@/modules/singleUser/components/editProfileButton';
import FollowUserButtonComponent from '@/modules/singleUser/components/followUserButton';
import ListPostUserComponent from '@/modules/singleUser/components/listPostUser';
import style from '@/modules/singleUser/styles/style.module.scss';

const SingleUserComponent = ({ singleUser, listPostUser }) => {
	const { user } = useUser();
	return (
		<div className="container-xl py-4">
			<div className="row">
				<div className="col-12 mb-4">
					<div className={`text-left text-sm-center bg-light rounded-3 shadow-sm px-4 pb-4 pt-4 ${style.info__user}`}>
						<div className={`position-relative mb-2 ${style.avt}`}>
							<span className="d-inline-flex p-3 rounded-circle">
								<CustomImage
									src={`${process.env.IMAGES_URL}/${singleUser.data?.avatar}`}
									alt={singleUser.data?.user_name}
									className="avatar rounded-circle"
									width="133"
									height="133"
								/>
							</span>
							{singleUser.data?.user_name !== user?.user_name && (
								<div className={`d-flex position-absolute ${style.more__user}`}>
									<OverlayTrigger
										trigger="click"
										key="options-single-user"
										placement="left"
										overlay={
											<Popover id={`popover-positioned-options-single-user`}>
												<Popover.Header as="h3" className="text-center">
													Options
												</Popover.Header>
												<Popover.Body className="p-0">
													<CustomLink href="/report_abuse" className="d-flex align-items-center dropdown-item">
														<GoReport className="me-1" />
														Report abuse
													</CustomLink>
												</Popover.Body>
											</Popover>
										}
									>
										<button type="button" className="d-flex align-items-center p-0 border-0 bg-transparent">
											<FaEllipsisH className="h4 mb-0" />
										</button>
									</OverlayTrigger>
								</div>
							)}
						</div>
						<h4 className="text-break mb-1">
							{singleUser.data?.first_name} {singleUser.data?.last_name}
						</h4>
						<p className="text-break text-secondary mb-2">@{singleUser.data?.user_name}</p>
						{singleUser.data?.biography && <p className="text-break mb-2">{singleUser.data?.biography}</p>}
						{user && singleUser.data?.user_name === user?.user_name && (
							<div>
								<EditProfileButtonComponent />
							</div>
						)}
						{singleUser.data?.user_name !== user?.user_name && (
							<div className="d-flex justify-content-sm-center">
								<FollowUserButtonComponent
									user_name={singleUser.data?.user_name}
									following={singleUser.data?.following}
								/>
							</div>
						)}
						<div className="mt-1">
							{singleUser.data?.total_user_followers} <span className="text-secondary">followers</span> ·{' '}
							{singleUser.data?.total_following_users} <span className="text-secondary">following</span>
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-4 mb-4 mb-md-0">
					<ul className="wapper__card list-group rounded-3 shadow-sm">
						<li className="list-group-item d-flex flex-wrap align-items-center">
							<GrArticle className="me-1" />
							<span>{singleUser.data?.total_posts} Posts published</span>
						</li>
						<li className="list-group-item d-flex flex-wrap align-items-center">
							<FaRegComment className="me-1" />
							<span>{singleUser.data?.total_comments} comment written</span>
						</li>
						<li className="list-group-item d-flex flex-wrap align-items-center">
							<FaRegHeart className="me-1" />
							<span>{singleUser.data?.total_favorited} Posts favorited</span>
						</li>
						<li className="list-group-item d-flex flex-wrap align-items-center">
							<FaHashtag className="me-1" />
							<span>{singleUser.data?.total_tags_followed} Tags followed</span>
						</li>
					</ul>
				</div>
				<div className="col-lg-8 col-md-8">
					<ListPostUserComponent listPostUser={listPostUser} />
				</div>
			</div>
		</div>
	);
};

export default SingleUserComponent;
