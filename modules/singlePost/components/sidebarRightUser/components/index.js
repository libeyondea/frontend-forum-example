import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import isEmpty from '@/common/utils/isEmpty';
import timeFormat from '@/common/utils/timeFormat';
import style from '@/modules/singlePost/components/sidebarRightUser/styles/style.module.scss';
import FollowUserButtonComponent from '@/modules/singleUser/components/followUserButton';

const SideBarRightUserComponent = ({ user, listPostUser }) => {
	return (
		<div className="sticky-top">
			<div className={`wapper__card bg-light rounded-lg shadow-sm pt-0 pb-3 px-3 mb-4 ${style.border__top__user}`}>
				<div className="text-center mb-2 mt-n4">
					<CustomLink
						href={`/u/${user?.user_name}`}
						className="text-decoration-none d-inline-block text-dark font-weight-bold"
					>
						<CustomImage
							src={`${process.env.IMAGES_URL}/${user.avatar}`}
							alt={user.user_name}
							className="avatar rounded-circle img-thumbnail"
							width="55"
							height="55"
						/>
						<h5 className="text-break mb-2">{user.user_name}</h5>
					</CustomLink>
					<div>
						<FollowUserButtonComponent user_name={user?.user_name} following={user?.following} />
					</div>
				</div>
				<div>
					<ul className="list-group list-group-flush">
						<li className="bg-light list-group-item border-0 p-0 mb-2">
							<div className="text-secondary font-weight-bold small">ROLE</div>
							<div className="small">{user.role.title}</div>
						</li>
						<li className="bg-light list-group-item border-0 p-0">
							<div className="text-secondary font-weight-bold small">JOINED</div>
							<div className="small">
								<time dateTime={user.created_at}>{timeFormat(user.created_at)}</time>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div className="wapper__card bg-light rounded-lg shadow-sm border">
				<div className="px-3 py-2 border-bottom">
					<h5 className="mb-0">
						More from
						<CustomLink
							href={`/u/${user?.user_name}`}
							className="text-decoration-none d-inline-block font-weight-bold ml-1"
						>
							{user?.user_name}
						</CustomLink>
					</h5>
				</div>
				{!isEmpty(listPostUser?.data) && (
					<ul className="list-group">
						{listPostUser?.data?.map((post) => (
							<li className={`bg-light border-bottom px-3 py-2 ${style.list_group_item_custom}`} key={post.id}>
								<CustomLink href={`/u/${post.user.user_name}/${post.slug}`} className="text-decoration-none text-dark">
									{post.title}
								</CustomLink>
								<div className={`small ${style.tags}`}>
									{post.tags?.map((tag) => (
										<CustomLink
											href={`/t/${tag.slug}`}
											key={tag.id}
											onClick={(e) => e.stopPropagation()}
											className="p-1 text-decoration-none d-inline-block text-secondary"
										>
											<span className="text-muted">#</span>
											{tag.slug}
										</CustomLink>
									))}
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default SideBarRightUserComponent;
