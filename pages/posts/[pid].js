import { END } from '@redux-saga/core';
import React from 'react';
import { useSelector } from 'react-redux';

import CommentList from '@/components/Comment/CommentList';
import Breadcrumb from '@/components/Common/Breadcrumb';
import CustomImage from '@/components/Common/CustomImage';
import CustomLink from '@/components/Common/CustomLink';
import Empty from '@/components/Common/Empty';
import Layout from '@/components/Common/Layout';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import SideBarRight from '@/components/Common/SideBarRight';
import PostMeta from '@/components/Post/PostMeta';
import isEmpty from '@/lib/utils/isEmpty';
import { singlePostRequestedAction } from '@/redux/actions/postAction';
import { wrapper } from '@/redux/store';

const SinglePost = () => {
	const singlePost = useSelector((state) => state.posts.single_post);

	return (
		<Layout>
			<div className="container-xl my-4">
				<div className="row">
					<div className="col-xl-9 col-md-9">
						<MayBeSpinner test={singlePost.is_loading} spinner={<LoadingSpinner />}>
							<MayBeSpinner test={isEmpty(singlePost.post)} spinner={<Empty />}>
								<Breadcrumb
									items={[
										{
											title: 'Home',
											href: '/'
										},
										{
											title: singlePost.post?.title
										}
									]}
								/>
								<article className="single-post bg-light rounded-lg shadow-sm">
									<div className="cover-img">
										<CustomImage src={singlePost.post?.image} className="rounded-lg" alt={singlePost.post?.title} />
									</div>
									<div className="p-5">
										<div className="mb-3">
											<h1 className="mb-3">{singlePost.post?.title}</h1>
											{singlePost.post?.tags?.map((tag) => (
												<CustomLink
													key={tag.id}
													href={`/tags/[pid]`}
													as={`/tags/${tag.slug}`}
													className="badge badge-light p-2 mb-2 mr-2"
												>
													<span className="text-secondary">#</span>
													{tag.slug}
												</CustomLink>
											))}
										</div>
										<PostMeta post={singlePost.post} />
										<div
											dangerouslySetInnerHTML={{
												__html: singlePost.post?.content
											}}
										/>
										<hr />
										<div className="comment-post">
											<CommentList postSlug={singlePost.post?.slug} />
										</div>
									</div>
								</article>
							</MayBeSpinner>
						</MayBeSpinner>
					</div>
					<div className="d-none d-md-block col-xl-3 col-md-3">
						<SideBarRight />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {
	const { pid } = query;
	store.dispatch(singlePostRequestedAction(pid));
	store.dispatch(END);
	await store.sagaTask.toPromise();
});

export default SinglePost;
