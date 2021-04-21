import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listTagRequestedAction } from 'redux/actions/tagAction';
import CustomLink from 'components/Common/CustomLink';
import MayBeSpinner from './MayBeSpinner';

const SideBar = (props) => {
	const dispatch = useDispatch();
	const listTag = useSelector((state) => state.tags.list_tag);

	useEffect(() => {
		dispatch(listTagRequestedAction(1));
	}, []);

	return (
		<div className="sticky-top">
			<div className="bg-light rounded-lg shadow-sm pt-2 border mb-4">
				<h4 className="mx-3">Categories</h4>
				<div className="list-group">
					<li className="list-group-item-custom d-flex align-items-center bg-light px-3">
						<CustomLink href={`/categories/666/PPP`} className="text-decoration-none mr-1">
							Test
						</CustomLink>
						<span className="badge badge-default badge-pill">66</span>
					</li>
					<li className="list-group-item-custom d-flex align-items-center bg-light px-3">
						<CustomLink href={`/categories/666/PPP`} className="text-decoration-none mr-1">
							Test 1
						</CustomLink>
						<span className="badge badge-default badge-pill">63</span>
					</li>
				</div>
			</div>
			<div className="bg-light rounded-lg shadow-sm pt-2 border">
				<h4 className="mx-3">Top tags</h4>
				<div className="px-3 mb-1 pt-3 border-top">
					<MayBeSpinner test={listTag.is_loading} spinner={<>Loading...</>}>
						{listTag.tags?.map((tag) => (
							<CustomLink
								key={tag.id}
								href={`/tag/[pid]`}
								as={`/tag/${tag.slug}`}
								className="badge badge-light p-2 mb-2 mr-2"
							>
								<span>{tag.slug}</span>
							</CustomLink>
						))}
					</MayBeSpinner>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
