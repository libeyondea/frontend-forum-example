import React from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import EmptyTags from '@/components/Common/EmptyTags';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import SideBarLeft from '@/components/SideBarLeft';
import TagCard from '@/components/Tag/TagCard';
import httpRequest from '@/lib/utils/httpRequest';
import isEmpty from '@/lib/utils/isEmpty';
import { getCookie } from '@/lib/utils/session';

const Tags = ({ listTag }) => {
	return (
		<Layout>
			<div className="container-xl my-4">
				<div className="row">
					<div className="col-xl-9 col-md-9 order-md-2">
						<Breadcrumb
							items={[
								{
									title: 'Home',
									href: '/'
								},
								{
									title: 'Tags'
								}
							]}
						/>
						<h1 className="mb-4">Tags</h1>
						<div className="row">
							<MayBeSpinner test={isEmpty(listTag.data)} spinner={<EmptyTags />}>
								{listTag.data?.map((tag) => (
									<div className="col-lg-6 mb-4" key={tag.id}>
										<TagCard tag={tag} />
									</div>
								))}
								<Pagination total={listTag.meta?.tags_count} limit={process.env.LIMIT_PAGE.LIST_TAG} />
							</MayBeSpinner>
						</div>
					</div>
					<div className="d-none d-md-block col-xl-2 col-md-3 order-md-1">
						<SideBarLeft />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { page } = query;
		const response = await httpRequest.get({
			url: `/tags`,
			token: getCookie('token', req),
			params: {
				offset: (page - 1) * process.env.LIMIT_PAGE.LIST_TAG,
				limit: process.env.LIMIT_PAGE.LIST_TAG
			}
		});
		return {
			props: {
				listTag: response.data
			}
		};
	} catch (error) {
		console.log(error.response.data);
		return {
			props: {
				listTag: {}
			}
		};
	}
}

export default Tags;
