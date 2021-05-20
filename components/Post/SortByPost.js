import CustomLink from '@/components/Common/CustomLink';

const SortByPost = ({ url = '', pidSort }) => {
	return (
		<ul className="nav nav-pills">
			<li className="nav-item">
				<CustomLink href={`${url}/feed`} className={`nav-link ${(!pidSort || pidSort === 'feed') && 'active'}`}>
					Feed
				</CustomLink>
			</li>
			<li className="nav-item">
				<CustomLink href={`${url}/latest`} className={`nav-link ${pidSort === 'latest' && 'active'}`}>
					Latest
				</CustomLink>
			</li>
			<li className="nav-item">
				<CustomLink href={`${url}/oldest`} className={`nav-link ${pidSort === 'oldest' && 'active'}`}>
					Oldest
				</CustomLink>
			</li>
		</ul>
	);
};

export default SortByPost;
