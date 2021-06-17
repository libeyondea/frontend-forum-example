import { useRouter } from 'next/router';
import React, { useState } from 'react';

import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const FavoritePostButtonComponent = ({ favorited, slug, totalFavorited }) => {
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
			showToast.success(`${!isFavorited ? 'Liked' : 'Unliked '}`, slug);
			const response = isFavorited
				? await httpRequest.delete({
						url: `/favorite_post`,
						params: {
							slug: slug
						},
						token: getCookie('token')
				  })
				: await httpRequest.post({
						url: `/favorite_post`,
						data: {
							slug: slug
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
		<>
			<button
				className={`d-flex align-items-center border-0 bg-transparent ${
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
		</>
	);
};

export default FavoritePostButtonComponent;
