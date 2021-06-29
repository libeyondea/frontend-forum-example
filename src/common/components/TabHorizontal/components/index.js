import CustomLink from '@/common/components/CustomLink/components';
import style from '@/common/components/TabHorizontal/styles/style.module.scss';

const TabHorizontalComponent = ({ pidTab, items = [] }) => {
	return (
		<ul className="nav nav-pills">
			{items.map((item, index) =>
				items.indexOf(item) === 0 ? (
					<li className="nav-item" key={index}>
						<CustomLink
							href={`${item.href}`}
							className={`text-decoration-none py-1 px-3 text-dark ${style.nav_link} ${
								(!pidTab || pidTab === item.slug) && style.active
							}`}
						>
							{item.title}
						</CustomLink>
					</li>
				) : (
					<li className="nav-item" key={index}>
						<CustomLink
							href={`${item.href}`}
							className={`text-decoration-none py-1 px-3 text-dark ${style.nav_link} ${
								pidTab === item.slug && style.active
							}`}
						>
							{item.title}
						</CustomLink>
					</li>
				)
			)}
		</ul>
	);
};

export default TabHorizontalComponent;
