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
