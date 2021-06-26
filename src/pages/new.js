import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import NewPostComponent from '@/modules/newPost/components';

const NewPost = () => {
	return (
		<>
			<MetaWebsite title="New Post" />
			<LayoutComponent>
				<NewPostComponent />
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ req }) {
	try {
		const resCurrentUser = await httpRequest.get({
			url: `/current_user`,
			token: getCookie('token', req)
		});
		if (resCurrentUser.data.success) {
			return {
				props: {
					currentUser: resCurrentUser.data
				}
			};
		}
	} catch (error) {
		if (error?.response?.status === 401) {
			return {
				redirect: {
					destination: '/login',
					permanent: false
				}
			};
		}
		return {
			notFound: true
		};
	}
}

export default NewPost;
