import React from 'react';

import MetaDefault from '@/common/meta/MetaDefault';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import LayoutComponent from '@/modules/layout/components';
import VerifyEmailComponent from '@/modules/verifyEmail/components';

const VerifyEmail = ({ verifyEmail }) => {
	return (
		<>
			<MetaDefault title="Verify Email" />
			<LayoutComponent>
				<VerifyEmailComponent verifyEmail={verifyEmail} />
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const url = query.url;
		if (url) {
			const resVerifyEmail = await httpRequest.get({
				url: decodeURIComponent(url),
				token: getCookie('token', req)
			});
			if (resVerifyEmail.data.success) {
				return {
					props: {
						verifyEmail: resVerifyEmail.data
					}
				};
			}
		} else {
			return {
				props: {
					verifyEmail: null
				}
			};
		}
	} catch (error) {
		return {
			notFound: true
		};
	}
}

export default VerifyEmail;
