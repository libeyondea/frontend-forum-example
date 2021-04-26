import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listTagRequestedAction } from 'redux/actions/tagAction';
import CustomLink from 'components/Common/CustomLink';
import MayBeSpinner from './MayBeSpinner';

const SideBar = ({}) => {
	console.log('render');
	const dispatch = useDispatch();
	const listTag = useSelector((state) => state.tags.list_tag);
	const listCategory = useSelector((state) => state.categories.list_category);

	useEffect(() => {
		dispatch(listTagRequestedAction(1));
	}, []);

	return (
		<div className="sticky-top">
			<div className="bg-light rounded-lg shadow-sm border mb-4">
				<div className="px-3 py-2 border-bottom">
					<h4 className="mb-0">Categories</h4>
				</div>
				<div className="list-group">
					<MayBeSpinner test={listCategory.is_loading} spinner={<>Loading...</>}>
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
					<h4 className="mb-0">Top tags</h4>
				</div>
				<div className="list-group">
					<MayBeSpinner test={listTag.is_loading} spinner={<>Loading...</>}>
						{listTag.tags?.map((tag) => (
							<li className="list-group-item-custom d-flex align-items-center border-0 px-3 py-2" key={tag.id}>
								<CustomLink href={`/tag/[pid]`} as={`/tag/${tag.slug}`} className="text-decoration-none">
									#{tag.slug}
								</CustomLink>
							</li>
						))}
					</MayBeSpinner>
				</div>
			</div>
		</div>
	);
};

export default memo(SideBar);
