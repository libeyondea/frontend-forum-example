import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';
import style from '@/modules/singlePost/styles/style.module.scss';

const PostFooterComponent = ({ favorited, totalFavorited, postSlug, postUserName, postTitle }) => {
	const { user } = useUser();
	const router = useRouter();
	const [isFavorited, setFavorited] = useState(favorited);
	const [sumFavorited, setSumFavorited] = useState(totalFavorited);

	const onFavoritePostClick = async (e) => {
		e.preventDefault();
		try {
			if (!user) {
				router.push('/login');
				return;
			}
			setFavorited(!isFavorited);
			setSumFavorited(!isFavorited ? sumFavorited + 1 : sumFavorited - 1);
			showToast.success(`${!isFavorited ? 'Liked' : 'Unliked '}`, postSlug);
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
				// success
			}
		} catch (error) {
			showToast.error();
		}
	};

	return (
		<div className="d-flex justify-content-start align-items-center">
			<button
				className={`d-flex align-items-center border-0 bg-transparent p-0 mr-auto ${
					isFavorited ? 'text-danger' : 'text-secondary'
				}`}
				onClick={onFavoritePostClick}
			>
				{isFavorited ? (
					<>
						<i className="fa fa-heart fa-sm mr-1" />
					</>
				) : (
					<>
						<i className="fa fa-heart-o fa-sm mr-1" />
					</>
				)}
				<span className="mr-1">{sumFavorited}</span>
				<span className="d-none d-sm-block">likes</span>
			</button>
			<Dropdown as={NavItem}>
				<Dropdown.Toggle
					as={NavLink}
					id="dropdown-custom-single-post"
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
					<Link href={`/report-abuse`} passHref>
						<Dropdown.Item>Report abuse</Dropdown.Item>
					</Link>
					<Dropdown.Item
						target="_blank"
						rel="noopener noreferrer"
						href={`https://www.facebook.com/sharer.php?u=${process.env.WEBSITE_URL}/u/${postUserName}/${postSlug}`}
					>
						Share to Facebook
					</Dropdown.Item>
					<Dropdown.Item
						target="_blank"
						rel="noopener noreferrer"
						href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)} ${
							process.env.WEBSITE_URL
						}/u/${postUserName}/${postSlug}`}
					>
						Share to Twitter
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default PostFooterComponent;
