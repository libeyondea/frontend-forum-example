import { useRouter } from 'next/router';
import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';
import CustomLink from '@/common/components/CustomLink/components';
import HighlightSearch from '@/common/components/HighlightSearch/components';
import style from '@/modules/commentCardSearch/styles/style.module.scss';

const CommentCardSearchComponent = ({ comment }) => {
	const { query } = useRouter();

	return (
		<div className={`card shadow-sm ${style.comment_card}`}>
			<div className="p-3">
				<div className="mb-2">
					<div className="d-flex align-items-center">
						<div className="mr-1">
							<CustomLink
								href={`/u/${comment.user.user_name}`}
								className="text-decoration-none d-inline-block d-flex align-items-center"
							>
								<CustomImage
									src={`${process.env.IMAGES_URL}/${comment.user.avatar}`}
									className="rounded-circle h-100 w-100"
									width={33}
									height={33}
									alt={comment.user.user_name}
									layout="fixed"
								/>
							</CustomLink>
						</div>
						<div className="lh-100">
							<div className="d-flex align-items-center">
								<CustomLink href={`/u/${comment.user.user_name}`} className="text-decoration-none text-dark">
									{comment.user.user_name}
								</CustomLink>
							</div>
						</div>
					</div>
				</div>
				<div className={`${style.body_comment_card}`}>
					<CustomLink
						href={`/u/${comment.user.user_name}/${comment.post.slug}/comment/${comment.slug}`}
						className={`text-decoration-none text-dark card-title mb-2 d-block ${style.title_comment_card}`}
					>
						<h5 className="font-weight-bold mb-0">{comment.post.title}</h5>
					</CustomLink>
					<div className="card-text mb-0 text-secondary">
						<HighlightSearch text={comment.content} highlight={query.q} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentCardSearchComponent;
