import { isEmpty } from 'lodash';

import CustomLink from '@/common/components/CustomLink/components';
import style from '@/common/components/TabVertical/styles/style.module.scss';

const TabVerticalComponent = ({ pidTab, items = [] }) => {
	return (
		<ul className={`nav flex-column nav-pills ${style.nav__pills}`}>
			{items.map(
				(item, index) =>
					!isEmpty(item) &&
					(items.indexOf(item) === 0 ? (
						<li className="nav-item" key={index}>
							<CustomLink
								href={`${item.href}`}
								className={`nav-link text-dark ${style.nav__link} ${
									(!pidTab || pidTab === item.slug) && `${style.active}`
								}`}
							>
								{item.title}
							</CustomLink>
						</li>
					) : (
						<li className="nav-item" key={index}>
							<CustomLink
								href={`${item.href}`}
								className={`nav-link text-dark ${style.nav__link} ${pidTab === item.slug && `${style.active}`}`}
							>
								{item.title}
							</CustomLink>
						</li>
					))
			)}
		</ul>
	);
};

export default TabVerticalComponent;
