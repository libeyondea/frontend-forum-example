import { useRouter } from 'next/router';
import React, { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FaEllipsisH, FaFacebookF, FaHeart, FaRegHeart, FaTwitter } from 'react-icons/fa';
import { GoReport } from 'react-icons/go';

import CustomLink from '@/common/components/CustomLink/components';
import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const PostFooterComponent = ({ favorited, totalFavorited, postSlug, postUserName, postTitle }) => {
	const { user } = useUser();
	const router = useRouter();
	const [isLoading, setLoading] = useState(false);
	const [isFavorited, setFavorited] = useState(favorited);
	const [sumFavorited, setSumFavorited] = useState(totalFavorited);

	const onFavoritePostClick = async (e) => {
		e.preventDefault();
		try {
			if (!user) {
				router.push('/login');
			} else {
				setLoading(true);
				const response = isFavorited
					? await httpRequest.delete({
							url: `/favorite_post`,
							params: {
								slug: postSlug
							},
							token: getCookie('token')
					  })
					: await httpRequest.post({
							url: `/favorite_post`,
							data: {
								slug: postSlug
							},
							token: getCookie('token')
					  });
				if (response.data.success) {
					setFavorited(!isFavorited);
					setSumFavorited(!isFavorited ? sumFavorited + 1 : sumFavorited - 1);
					showToast.success(`${!isFavorited ? 'Liked' : 'Unliked '}`, postSlug);
				}
			}
		} catch (error) {
			showToast.error();
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="d-flex justify-content-start align-items-center">
			<button
				className={`d-flex align-items-center border-0 bg-transparent p-0 me-auto ${
					isFavorited ? 'text-danger' : 'text-secondary'
				} ${isLoading ? 'disabled' : ''}`}
				onClick={onFavoritePostClick}
			>
				{isFavorited ? (
					<>
						<FaHeart className="me-1" />
					</>
				) : (
					<>
						<FaRegHeart className="me-1" />
					</>
				)}
				<span className="me-1">{sumFavorited}</span>
				<span className="d-none d-sm-block">likes</span>
			</button>
			<OverlayTrigger
				trigger="click"
				key="options-single-post"
				placement="left"
				rootClose
				overlay={
					<Popover id={`popover-positioned-options-single-post`}>
						<Popover.Header as="h3" className="text-center">
							Options
						</Popover.Header>
						<Popover.Body className="p-0">
							<CustomLink href="/report_abuse" className="d-flex align-items-center dropdown-item">
								<GoReport className="me-1" />
								Report abuse
							</CustomLink>
							<CustomLink
								target="_blank"
								rel="noopener noreferrer"
								href={`https://www.facebook.com/sharer.php?u=${process.env.WEBSITE_URL}/u/${postUserName}/${postSlug}`}
								className="d-flex align-items-center dropdown-item"
							>
								<FaFacebookF className="me-1" />
								Share to Facebook
							</CustomLink>
							<CustomLink
								target="_blank"
								rel="noopener noreferrer"
								href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)} ${
									process.env.WEBSITE_URL
								}/u/${postUserName}/${postSlug}`}
								className="d-flex align-items-center dropdown-item"
							>
								<FaTwitter className="me-1" />
								Share to Twitter
							</CustomLink>
						</Popover.Body>
					</Popover>
				}
			>
				<button type="button" className="d-flex align-items-center p-0 border-0 bg-transparent">
					<FaEllipsisH />
				</button>
			</OverlayTrigger>
		</div>
	);
};

export default PostFooterComponent;
