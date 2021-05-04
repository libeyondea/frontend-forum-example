import React from 'react';

import CustomLink from '@/components/Common/CustomLink';

const TagCard = ({ tag }) => {
	if (!tag) return null;
	return (
		<div className="card card-post">
			<div className="p-3">
				<div className="card-block">
					<h5 className="card-title mb-1">
						<CustomLink href="/tag/[pid]" as={`/tag/${tag.slug}`} className="text-decoration-none">
							<span className="text-secondary">#</span>
							{tag.title}
						</CustomLink>
					</h5>
					<p className="card-text">{tag.content}</p>
				</div>
				<small className="text-muted">{tag.total_posts} posts published</small>
				<div className="d-flex justify-content-end mt-2">
					<button className={`btn btn-sm ${false ? 'btn-secondary' : 'btn-outline-secondary'}`}>
						{false ? (
							<>
								<i className="fa fa-minus" /> UnFollow
							</>
						) : (
							<>
								<i className="fa fa-plus" /> Follow
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default TagCard;
