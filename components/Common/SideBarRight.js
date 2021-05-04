import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomLink from '@/components/Common/CustomLink';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import MayBeSpinner from '@/components/Common/MayBeSpinner';
import { listCategoryRequestedAction } from '@/redux/actions/categoryAction';
import { listTagRequestedAction } from '@/redux/actions/tagAction';

const SideBarRight = () => {
	const dispatch = useDispatch();
	const listTag = useSelector((state) => state.tags.list_tag);
	const listCategory = useSelector((state) => state.categories.list_category);

	useEffect(() => {
		dispatch(listTagRequestedAction(1));
		dispatch(listCategoryRequestedAction(1));
	}, [dispatch]);

	return (
		<div className="sticky-top-none">
			<div className="bg-light rounded-lg shadow-sm border mb-4">
				<div className="px-3 py-2 border-bottom">
					<h5 className="mb-0">Categories</h5>
				</div>
				<div className="list-group">
					<MayBeSpinner test={listCategory.is_loading} spinner={<LoadingSpinner />}>
						{listCategory.categories?.map((category) => (
							<li className="list-group-item-custom d-flex align-items-center px-3 py-2" key={category.id}>
								<CustomLink href={`/category/[pid]`} as={`/category/${category.slug}`} className="text-decoration-none">
									{category.title}
								</CustomLink>
								<span className="badge badge-default badge-pill">{category.total_posts}</span>
							</li>
						))}
					</MayBeSpinner>
				</div>
			</div>
			<div className="bg-light rounded-lg shadow-sm border mb-4">
				<div className="px-3 py-2 border-bottom">
					<h5 className="mb-0">Popular tags</h5>
				</div>
				<div className="list-group">
					<MayBeSpinner test={listTag.is_loading} spinner={<LoadingSpinner />}>
						{listTag.tags?.map((tag) => (
							<li className="list-group-item-custom d-flex align-items-center border-0 px-3 py-2" key={tag.id}>
								<CustomLink href={`/tag/[pid]`} as={`/tag/${tag.slug}`} className="text-decoration-none">
									<span className="text-secondary">#</span>
									{tag.slug}
								</CustomLink>
							</li>
						))}
					</MayBeSpinner>
				</div>
			</div>
		</div>
	);
};

export default memo(SideBarRight);
