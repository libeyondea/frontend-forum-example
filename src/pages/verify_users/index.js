import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import VerifyUserComponent from '@/modules/verifyUser/components';

const VerifyUser = ({ verifyUser }) => {
	return (
		<>
			<MetaWebsite title="Verify your email" isNoneMeta />
			<LayoutComponent>
				<VerifyUserComponent verifyUser={verifyUser} />
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { url } = query;
		if (url) {
			const resVerifyUser = await httpRequest.get({
				url: decodeURIComponent(url),
				token: getCookie('token', req)
			});
			if (resVerifyUser.data.success) {
				return {
					props: {
						verifyUser: resVerifyUser.data
					}
				};
			}
		} else {
			return {
				props: {
					verifyUser: null
				}
			};
		}
	} catch (error) {
		return {
			notFound: true
		};
	}
}

export default VerifyUser;
