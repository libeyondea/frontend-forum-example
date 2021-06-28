import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import ReactMarkdownComponent from '@/common/components/ReactMarkdown/components';
import CommentComponent from '@/modules/singlePost/components/comment/components';
import PostActionComponent from '@/modules/singlePost/components/postAction';
import PostFooterComponent from '@/modules/singlePost/components/postFooter';
import PostMetaComponent from '@/modules/singlePost/components/postMeta';
import PostTagListComponent from '@/modules/singlePost/components/postTagList';
import SideBarRightUserComponent from '@/modules/singlePost/components/sidebarRightUser/components';

const SinglePostComponent = ({ singlePost, listPostUser, listComment }) => {
	return (
		<div className="container-xl py-4">
			<div className="row">
				<div className="col-xl-9 mb-4 mb-xl-0">
					<article className="wapper__card single-post bg-light rounded-lg shadow-sm">
						{singlePost.data?.image && (
							<div>
								<CustomImage
									src={`${process.env.IMAGES_URL}/${singlePost.data?.image}`}
									className="rounded-lg"
									alt={singlePost.data?.title}
									layout="responsive"
									width={500}
									height={280}
									isBlur
								/>
							</div>
						)}
						<div className="p-3 p-sm-5">
							<div className="mb-3">
								<h1>{singlePost.data?.title}</h1>
							</div>
							<PostTagListComponent tags={singlePost.data.tags} />
							<PostMetaComponent singlePost={singlePost} />
							<PostActionComponent userName={singlePost.data.user?.user_name} postSlug={singlePost.data.slug} />
							<div className="my-5">
								<ReactMarkdownComponent text={singlePost.data?.content} />
							</div>
							<PostFooterComponent
								favorited={singlePost.data.favorited}
								totalFavorited={singlePost.data.total_favorited}
								postSlug={singlePost.data.slug}
								postUserName={singlePost.data.user.user_name}
								postTitle={singlePost.data.title}
							/>
							<hr />
							<CommentComponent
								listComment={listComment}
								postSlug={singlePost.data.slug}
								postUserName={singlePost.data.user.user_name}
							/>
						</div>
					</article>
				</div>
				<div className="col-xl-3">
					<SideBarRightUserComponent postUser={singlePost.data.user} listPostUser={listPostUser} />
				</div>
			</div>
		</div>
	);
};

export default SinglePostComponent;
