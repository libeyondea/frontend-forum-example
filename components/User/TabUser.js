import CustomLink from '@/components/Common/CustomLink';

const TabUser = ({ url = '', pidTab }) => {
	return (
		<ul className="nav flex-column nav-pills">
			<li className="nav-item">
				<CustomLink href={`${url}/profile`} className={`nav-link ${(!pidTab || pidTab === 'profile') && 'active'}`}>
					Edit profile
				</CustomLink>
			</li>
			<li className="nav-item">
				<CustomLink href={`${url}/customization`} className={`nav-link ${pidTab === 'customization' && 'active'}`}>
					Setting
				</CustomLink>
			</li>
		</ul>
	);
};

export default TabUser;
