import { END } from '@redux-saga/core';
import React from 'react';
import { useSelector } from 'react-redux';

import CommentList from '@/components/Comment/CommentList';
import Breadcrumb from '@/components/Common/Breadcrumb';
import CustomImage from '@/components/Common/CustomImage';
import CustomLink from '@/components/Common/CustomLink';
import Layout from '@/components/Common/Layout';
import Maybe from '@/components/Common/Maybe';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import SideBarRight from '@/components/Common/SideBarRight';
import PostMeta from '@/components/Post/PostMeta';
import useViewport from '@/lib/hooks/useViewport';
import { singlePostRequestedAction } from '@/redux/actions/postAction';
import { wrapper } from '@/redux/store';

const SinglePost = () => {
	const singlePost = useSelector((state) => state.posts.single_post);
	const viewPort = useViewport();
	return (
		<Layout>
			<div className="container-xl my-4">
				<div className="row">
					<div className="col-xl-9 col-md-8">
						<MayBeSpinner test={singlePost.is_loading || !singlePost.post} spinner={<>Loading...</>}>
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
									<CustomImage src={singlePost.post.image} className="rounded-lg" alt={singlePost.post.title} />
								</div>
								<div className="p-5">
									<div className="mb-3">
										<h1 className="mb-3">{singlePost.post?.title}</h1>
										{singlePost.post.tags?.map((tag) => (
											<CustomLink
												key={tag.id}
												href={`/tag/[pid]`}
												as={`/tag/${tag.slug}`}
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
					</div>
					<Maybe test={viewPort.vw >= 768}>
						<div className="col-xl-3 col-md-4">
							<SideBarRight />
						</div>
					</Maybe>
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
