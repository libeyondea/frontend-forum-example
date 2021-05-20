import Head from 'next/head';
import React from 'react';

import EmptyPost from '@/components/Common/EmptyPost';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import PostCard from '@/components/Post/PostCard';
import SortByPost from '@/components/Post/SortByPost';
import SideBarLeft from '@/components/SideBarLeft';
import SideBarRight from '@/components/SideBarRight';
import httpRequest from '@/lib/utils/httpRequest';
import isEmpty from '@/lib/utils/isEmpty';
import { getCookie } from '@/lib/utils/session';

const Index = ({ listPost, pid }) => {
	return (
		<>
			<Head>
				<title>Home | De4th Zone</title>
				<meta name="description" content="De4th Zone" />
			</Head>
			<Layout>
				<div className="container-xl my-4">
					<div className="row">
						<div className="col-xl-7 col-lg-7 col-md-9 order-xl-2 order-lg-2 order-md-2">
							<div className="d-flex align-items-center mb-2">
								<h4 className="mr-auto mb-0">Posts</h4>
								<SortByPost pidSort={pid} />
							</div>
							<div className="row">
								<MayBeSpinner test={isEmpty(listPost?.data)} spinner={<EmptyPost />}>
									{listPost?.data?.map((post) => (
										<div className="col-12 mb-4" key={post?.id}>
											<PostCard post={post} />
										</div>
									))}
								</MayBeSpinner>
								<Pagination total={listPost?.meta?.posts_count} limit={process.env.LIMIT_PAGE.LIST_POST_HOME} />
							</div>
						</div>
						<div className="d-none d-md-block col-xl-2 col-lg-2 col-md-3 order-xl-1 order-lg-1 order-md-1">
							<SideBarLeft />
						</div>
						<div className="d-none d-lg-block col-xl-3 col-lg-3 col-md-12 order-xl-3 order-lg-3 order-md-3">
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
		const { pid: getPid = [], page } = query;
		const pid = getPid[0] || 'feed';
		if (getPid.length > 1) {
			console.log('1');
			return {
				notFound: true
			};
		}
		const resListPost = await httpRequest.get({
			url: '/posts',
			token: getCookie('token', req),
			params: {
				tab: pid,
				offset: (page - 1) * process.env.LIMIT_PAGE.LIST_POST_HOME,
				limit: process.env.LIMIT_PAGE.LIST_POST_HOME
			}
		});
		if (resListPost.data.success) {
			console.log('2');
			return {
				props: {
					listPost: resListPost.data,
					pid
				}
			};
		}
		console.log('3');
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

export default Index;
