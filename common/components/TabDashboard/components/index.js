import CustomLink from '@/common/components/CustomLink/components';

const TabDashboardComponent = ({ pidTab, items = [] }) => {
	return (
		<ul className="nav flex-column nav-pills">
			{items.map((item, index) =>
				items.indexOf(item) === 0 ? (
					<li className="nav-item" key={index}>
						<CustomLink href={`${item.href}`} className={`nav-link ${(!pidTab || pidTab === item.slug) && 'active'}`}>
							{item.title}
						</CustomLink>
					</li>
				) : (
					<li className="nav-item" key={index}>
						<CustomLink href={`${item.href}`} className={`nav-link ${pidTab === item.slug && 'active'}`}>
							{item.title}
						</CustomLink>
					</li>
				)
			)}
		</ul>
	);
};

export default TabDashboardComponent;
