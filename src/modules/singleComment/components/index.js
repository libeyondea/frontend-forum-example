import React, { useState } from 'react';

import CustomLink from '@/common/components/CustomLink/components';
import markdownToText from '@/common/utils/markdownToText';
import CommentCard from '@/modules/singlePost/components/comment/components/commentCard';

const SingleCommentComponent = ({ singleComment }) => {
	const [listCommentClient, setListCommentClient] = useState(singleComment.data.children_comment);
	const [meta, setMeta] = useState({
		total: 0
	});

	return (
		<div className="container-xl my-4">
			<div className="row">
				<div className="col-md-8 mx-auto">
					<div className="wapper__card bg-light rounded-lg shadow-sm p-3 p-sm-4">
						<h4 className="mb-3">
							<span className="text-secondary">Comment on: </span>
							{singleComment.data.post.title}
						</h4>
						<CustomLink
							href={`/u/${singleComment.data.post.user?.user_name}/${singleComment.data.post.slug}`}
							className="btn btn-outline-secondary"
						>
							View post
						</CustomLink>
					</div>
				</div>
				{singleComment.data.parent_comment?.content && (
					<div className="col-md-9 mx-auto">
						<div className="wapper__card bg-light rounded-lg shadow-sm p-3 p-sm-4">
							<h4 className="mb-0">
								<span className="text-secondary">Replies for: </span>
								<CustomLink
									href={`/u/${singleComment.data.post.user?.user_name}/${singleComment.data.post.slug}/comment/${singleComment.data.parent_comment.slug}`}
									className="text-decoration-none text-dark"
								>
									{markdownToText(singleComment.data.parent_comment.content, 66)}
								</CustomLink>
							</h4>
						</div>
					</div>
				)}
				<div className="col-md-10 mx-auto">
					<div className="wapper__card bg-light rounded-lg shadow-sm p-3 p-sm-5">
						<CommentCard
							comment={singleComment.data}
							listCommentClient={listCommentClient}
							setListCommentClient={setListCommentClient}
							meta={meta}
							setMeta={setMeta}
							postUserName={singleComment.data.post.user?.user_name}
							postSlug={singleComment.data.post.slug}
							isSingleComment={true}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleCommentComponent;
