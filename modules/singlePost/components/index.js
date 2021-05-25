import marked from 'marked';
import React from 'react';

import Breadcrumb from '@/common/components/Breadcrumb/components';
import CustomImage from '@/common/components/CustomImage/components';
import SideBarRightComponent from '@/modules/sidebarRight/components';
import CommentComponent from '@/modules/singlePost/components/comment/components';
import PostActionComponent from '@/modules/singlePost/components/postAction';
import PostMetaComponent from '@/modules/singlePost/components/postMeta';
import PostTagListComponent from '@/modules/singlePost/components/postTagList';

const SinglePostComponent = ({ singlePost }) => {
	return (
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
						{singlePost.data?.image && (
							<div>
								<CustomImage
									src={`${process.env.IMAGES_URL}/${singlePost.data?.image}`}
									className="rounded-lg"
									alt={singlePost.data?.title}
									layout="responsive"
									width={500}
									height={280}
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
							<div
								className="my-5"
								dangerouslySetInnerHTML={{
									__html: marked(singlePost.data?.content)
								}}
							/>
							<hr />
							<CommentComponent />
						</div>
					</article>
				</div>
				<div className="d-none d-md-block col-xl-3 col-md-3">
					<SideBarRightComponent />
				</div>
			</div>
		</div>
	);
};

export default SinglePostComponent;
