import React from 'react';
import { useSelector } from 'react-redux';
import { singlePostRequestedAction } from 'redux/actions/postAction';
import SideBar from 'components/Common/SideBar';
import CustomLink from 'components/Common/CustomLink';
import PostMeta from 'components/Post/PostMeta';
import CommentList from 'components/Comment/CommentList';
import Layout from 'components/Common/Layout';
import Breadcrumb from 'components/Common/Breadcrumb';
import MayBeSpinner from 'components/Common/MayBeSpinner';

const SinglePost = (props) => {
	const singlePost = useSelector((state) => state.posts.single_post);
	return (
		<Layout>
			<div className="container my-4">
				<div className="row">
					<div className="col-lg-9 mb-4">
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
							<article className="bg-light p-4 rounded-lg shadow-sm">
								<div className="mb-3">
									<h1 className="mb-3">{singlePost.post?.title}</h1>
									{singlePost.post.tags?.map((tag) => (
										<CustomLink
											key={tag.id}
											href={`/tag/[pid]`}
											as={`/tag/${tag.slug}`}
											className="badge badge-light p-2 mb-2 mr-2"
										>
											<span>{tag.slug}</span>
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
								<CommentList postSlug={singlePost.post?.slug} />
							</article>
						</MayBeSpinner>
					</div>
					<div className="col-lg-3">
						<SideBar />
					</div>
				</div>
			</div>
		</Layout>
	);
};

SinglePost.getInitialProps = async ({ store, query }) => {
	const { pid } = query;
	store.dispatch(singlePostRequestedAction(pid));
};

export default SinglePost;
