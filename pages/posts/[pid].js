import Head from 'next/head';
import React from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import CommentList from '@/components/Comment/CommentList';
import CustomImage from '@/components/Common/CustomImage';
import CustomLink from '@/components/Common/CustomLink';
import Layout from '@/components/Layout';
import PostMeta from '@/components/Post/PostMeta';
import SideBarRight from '@/components/SideBarRight';
import httpRequest from '@/lib/utils/httpRequest';

const SinglePost = ({ singlePost }) => {
	return (
		<>
			<Head>
				<title>{singlePost.data?.title} | De4th Zone</title>
				<meta name="description" content={singlePost.data?.excerpt} />
			</Head>
			<Layout>
				<div className="container-xl my-4">
					<div className="row">
						<div className="col-xl-9 col-md-9">
							<Breadcrumb
								items={[
									{
										title: 'Home',
										href: '/'
									},
									{
										title: singlePost.data?.title
									}
								]}
							/>
							<article className="single-post bg-light rounded-lg shadow-sm">
								<div className="cover-img-none">
									<CustomImage
										src={`${process.env.IMAGES_URL}/${singlePost.data?.image}`}
										className="rounded-lg"
										alt={singlePost.data?.title}
										layout="responsive"
										width={500}
										height={280}
									/>
								</div>
								<div className="p-5">
									<div className="mb-3">
										<h1 className="mb-3">{singlePost.data?.title}</h1>
										{singlePost.data?.tags?.map((tag) => (
											<CustomLink
												key={tag.id}
												href={`/tags/[...pid]`}
												as={`/tags/${tag.slug}`}
												className="custom-tag p-1 text-decoration-none"
											>
												<span>#</span>
												{tag.slug}
											</CustomLink>
										))}
									</div>
									<PostMeta singlePost={singlePost} />
									<div
										dangerouslySetInnerHTML={{
											__html: singlePost.data?.content
										}}
									/>
									<hr />
									<div id="comment-post" className="comment-post">
										<CommentList />
									</div>
								</div>
							</article>
						</div>
						<div className="d-none d-md-block col-xl-3 col-md-3">
							<SideBarRight />
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export async function getServerSideProps({ query }) {
	try {
		console.log(query.pid);
		const { pid } = query;
		const resSinglePost = await httpRequest.get({
			url: `/posts/${pid}`
		});
		if (resSinglePost.data.success) {
			return {
				props: {
					singlePost: resSinglePost.data
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

export default SinglePost;
