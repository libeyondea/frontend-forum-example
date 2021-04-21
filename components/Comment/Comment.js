import React from 'react';
import CustomLink from 'components/Common/CustomLink';
import CustomImage from 'components/Common/CustomImage';
import CommentMeta from 'components/Comment/CommentMeta';

const Comment = ({ comment }) => {
	return (
		<div className="media mb-5">
			<CustomLink href="/profile/[pid]" as={`/profile/${comment.user?.user_name}`}>
				<CustomImage
					width="50"
					height="50"
					src={comment.user?.avatar}
					alt={comment.user?.user_name}
					className="d-flex mr-3 rounded-circle"
				/>
			</CustomLink>
			<div className="media-body">
				<div className="border p-3 bg-white">
					<div className="mb-2">
						<CustomLink
							href="/profile/[pid]"
							as={`/profile/${comment.user?.user_name}`}
							className="text-decoration-none"
						>
							<h5 className="my-0">{comment.user?.user_name}</h5>
						</CustomLink>
						<small className="mx-0 my-0">{new Date(comment.created_at).toDateString()}</small>
					</div>
					{comment.body}
				</div>
				<CommentMeta comment={comment} />
			</div>
		</div>
	);
};

export default Comment;
