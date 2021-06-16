import React, { useState } from 'react';

import CommentInputComponent from '@/modules/singlePost/components/comment/components/commentInput';
import CommentListComponent from '@/modules/singlePost/components/comment/components/commentList';

const CommentComponent = ({ listComment, postSlug, postUserName }) => {
	const [listCommentClient, setListCommentClient] = useState(listComment.data);
	const [meta, setMeta] = useState(listComment.meta);

	return (
		<div id="comment-post">
			<h4 className="mb-0">Comments ({meta.total})</h4>
			<CommentInputComponent
				listCommentClient={listCommentClient}
				setListCommentClient={setListCommentClient}
				meta={meta}
				setMeta={setMeta}
				postSlug={postSlug}
			/>
			<CommentListComponent
				listCommentClient={listCommentClient}
				setListCommentClient={setListCommentClient}
				meta={meta}
				setMeta={setMeta}
				postUserName={postUserName}
				postSlug={postSlug}
			/>
		</div>
	);
};

export default CommentComponent;
