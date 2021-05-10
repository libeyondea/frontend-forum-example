import Link from 'next/link';
import { useRouter } from 'next/router';
import Nav from 'react-bootstrap/Nav';

const SortByPost = ({ asUrl }) => {
	const router = useRouter();
	const {
		pathname,
		query: { tab }
	} = router;

	return (
		<Nav variant="pills">
			<Nav.Item>
				<Link href={`${pathname}?tab=feed`} as={`${asUrl}?tab=feed`} passHref>
					<Nav.Link className={`${(tab === 'feed' || !tab) && 'active'}`}>Feed</Nav.Link>
				</Link>
			</Nav.Item>
			<Nav.Item>
				<Link href={`${pathname}?tab=latest`} as={`${asUrl}?tab=latest`} passHref>
					<Nav.Link className={`${tab === 'latest' && 'active'}`}>Latest</Nav.Link>
				</Link>
			</Nav.Item>

			<Nav.Item>
				<Link href={`${pathname}?tab=oldest`} as={`${asUrl}?tab=oldest`} passHref>
					<Nav.Link className={`${tab === 'oldest' && 'active'}`}>Oldest</Nav.Link>
				</Link>
			</Nav.Item>
		</Nav>
	);
};

export default SortByPost;
