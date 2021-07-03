import { FaTags } from 'react-icons/fa';
import { FcAbout, FcContacts, FcFaq, FcHome, FcPrivacy } from 'react-icons/fc';

const optionsMenu = [
	{
		icon: <FcHome className="h4 mb-0 me-1" />,
		name: 'Home',
		href: '/'
	},
	{
		icon: <FaTags className="h4 mb-0 me-1" />,
		name: 'Tags',
		href: '/tags'
	},
	{
		icon: <FcAbout className="h4 mb-0 me-1" />,
		name: 'About',
		href: '/'
	},
	{
		icon: <FcFaq className="h4 mb-0 me-1" />,
		name: 'FAQ',
		href: '/'
	},
	{
		icon: <FcContacts className="h4 mb-0 me-1" />,
		name: 'Contact',
		href: '/'
	},
	{
		icon: <FcPrivacy className="h4 mb-0 me-1" />,
		name: 'Privacy Policy',
		href: '/',
		hidden: true
	}
];

export default optionsMenu;
