import React from 'react';

import CommentInputComponent from '@/modules/singlePost/components/comment/components/commentInput';
import CommentListComponent from '@/modules/singlePost/components/comment/components/commentList';

const CommentComponent = () => {
	return (
		<div id="comment-post">
			<CommentInputComponent />
			<CommentListComponent />
		</div>
	);
};

export default CommentComponent;
