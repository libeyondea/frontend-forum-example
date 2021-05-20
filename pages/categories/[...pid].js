import React from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import EmptyPost from '@/components/Common/EmptyPost';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import PostCard from '@/components/Post/PostCard';
import SortByPost from '@/components/Post/SortByPost';
import SideBarRight from '@/components/SideBarRight';
import httpRequest from '@/lib/utils/httpRequest';
import isEmpty from '@/lib/utils/isEmpty';
import { getCookie } from '@/lib/utils/session';

const SingleCategory = ({ singleCategory, listPostCategory, pid }) => {
	return (
		<Layout>
			<div className="container-xl my-4">
				<div className="row">
					<div className="col-xl-9 col-md-8">
						<Breadcrumb
							items={[
								{
									title: 'Home',
									href: '/'
								},
								{
									title: 'Categories',
									href: '/categories'
								},
								{
									title: singleCategory.data?.title
								}
							]}
						/>
						<h1 className="mb-4">{singleCategory.data?.title}</h1>
						<div className="d-flex align-items-center mb-2">
							<h4 className="mr-auto mb-0">Posts</h4>
							<SortByPost url={`/categories/${singleCategory.data?.slug}`} pidSort={pid} />
						</div>
						<div className="row">
							<MayBeSpinner test={isEmpty(listPostCategory.data)} spinner={<EmptyPost />}>
								{listPostCategory.data.map((post) => (
									<div className="col-12 mb-4" key={post.id}>
										<PostCard post={post} />
									</div>
								))}
								<Pagination
									total={listPostCategory.meta?.posts_count}
									limit={process.env.LIMIT_PAGE.LIST_POST_CATEGORY}
								/>
							</MayBeSpinner>
						</div>
					</div>
					<div className="d-none d-md-block col-xl-3 col-md-4">
						<SideBarRight />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { pid: getPid = [], page } = query;
		const pid = getPid[1] || 'feed';
		if (getPid.length > 2) {
			return {
				notFound: true
			};
		}
		const [resSingleCategory, resListPostCtegory] = await Promise.all([
			httpRequest.get({
				url: `/categories/${getPid[0]}`,
				token: getCookie('token', req)
			}),
			httpRequest.get({
				url: '/posts',
				token: getCookie('token', req),
				params: {
					category: getPid[0],
					tab: pid,
					offset: (page - 1) * process.env.LIMIT_PAGE.LIST_POST_TAG,
					limit: process.env.LIMIT_PAGE.LIST_POST_TAG
				}
			})
		]);
		if (resSingleCategory.data.success && resListPostCtegory.data.success) {
			return {
				props: {
					singleCategory: resSingleCategory.data,
					listPostCategory: resListPostCtegory.data,
					pid: pid
				}
			};
		}
		return {
			notFound: true
		};
	} catch (error) {
		console.log(error);
		return {
			notFound: true
		};
	}
}
export default SingleCategory;
