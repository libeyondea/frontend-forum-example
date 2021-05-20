import Head from 'next/head';
import React from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import EmptyPost from '@/components/Common/EmptyPost';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import PostCard from '@/components/Post/PostCard';
import SortByPost from '@/components/Post/SortByPost';
import SideBarRight from '@/components/SideBarRight';
import FollowTagButton from '@/components/User/FollowTagButton';
import httpRequest from '@/lib/utils/httpRequest';
import isEmpty from '@/lib/utils/isEmpty';
import { getCookie } from '@/lib/utils/session';

const SingleTag = ({ singleTag, listPostTag, pid }) => {
	return (
		<>
			<Head>
				<title>{singleTag.data.title} | De4th Zone</title>
				<meta name="description" content={singleTag.data.content} />
			</Head>
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
										title: 'Tags',
										href: '/tags'
									},
									{
										title: singleTag.data?.title
									}
								]}
							/>
							<div className="card card-post mb-4">
								<div className="p-3">
									<div className="card-block">
										<h1 className="card-title mb-1">
											<span className="text-secondary">#</span>
											{singleTag.data?.title}
										</h1>
										<p className="card-text">{singleTag.data?.content}</p>
									</div>
									<small className="text-muted">{singleTag.data?.total_posts} posts published</small>
									<div className="d-flex justify-content-end mt-2">
										<FollowTagButton slug={singleTag.data?.slug} following={singleTag.data?.following} />
									</div>
								</div>
							</div>
							<div className="d-flex align-items-center mb-2">
								<h4 className="mr-auto mb-0">Posts</h4>
								<SortByPost url={`/tags/${singleTag.data?.slug}`} pidSort={pid} />
							</div>
							<div className="row">
								<MayBeSpinner test={isEmpty(listPostTag.data)} spinner={<EmptyPost />}>
									{listPostTag.data.map((post) => (
										<div className="col-12 mb-4" key={post.id}>
											<PostCard post={post} />
										</div>
									))}
									<Pagination total={listPostTag.meta?.posts_count} limit={process.env.LIMIT_PAGE.LIST_POST_TAG} />
								</MayBeSpinner>
							</div>
						</div>
						<div className="d-none d-md-block col-xl-3 col-md-4">
							<SideBarRight />
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		console.log('GGGGGGGGGGGGGGGGGG ', query.pid);
		const { pid: getPid = [], page } = query;
		const pid = getPid[1] || 'feed';
		if (getPid.length > 2) {
			return {
				notFound: true
			};
		}
		const [resSingleTag, resListPostTag] = await Promise.all([
			httpRequest.get({
				url: `/tags/${getPid[0]}`,
				token: getCookie('token', req)
			}),
			httpRequest.get({
				url: '/posts',
				token: getCookie('token', req),
				params: {
					tag: getPid[0],
					tab: pid,
					offset: (page - 1) * process.env.LIMIT_PAGE.LIST_POST_TAG,
					limit: process.env.LIMIT_PAGE.LIST_POST_TAG
				}
			})
		]);
		if (resSingleTag.data.success && resListPostTag.data.success) {
			return {
				props: {
					singleTag: resSingleTag.data,
					listPostTag: resListPostTag.data,
					pid: pid
				}
			};
		}
		return {
			notFound: true
		};
	} catch (error) {
		console.log(error.response);
		return {
			notFound: true
		};
	}
}

export default SingleTag;
