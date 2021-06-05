import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

import CustomImage from '@/common/components/CustomImage/components';
import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie, removeCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const NavBarComponent = () => {
	const router = useRouter();
	const { user } = useUser();

	const onLogoutClick = async (e) => {
		e.preventDefault();
		try {
			const response = await httpRequest.get({
				url: `/current_user/logout`,
				token: getCookie('token')
			});
			if (response.data.success) {
				removeCookie('token');
				showToast.success('Logout success');
				router.push('/login');
			}
		} catch (error) {
			console.log(error.response);
			showToast.error();
		}
	};

	return (
		<Navbar collapseOnSelect expand="md" bg="light" variant="light" fixed="top" className="shadow-sm">
			<div className="container-xl">
				<Link href="/" passHref>
					<Navbar.Brand className="d-flex align-items-center mr-auto">
						<CustomImage
							className="rounded-circle"
							src={`${process.env.IMAGES_URL}/6666666666.jpg`}
							width={44}
							height={44}
							alt="Logo"
						/>
						<div className="ml-2">De4thZone</div>
					</Navbar.Brand>
				</Link>
				{user && (
					<Dropdown as={NavItem} className="d-block d-md-none">
						<Dropdown.Toggle as={NavLink} id="dropdown-custom-2" className="d-flex align-items-center text-secondary">
							<CustomImage
								className="rounded-circle"
								src={`${process.env.IMAGES_URL}/${user?.avatar}`}
								width={35}
								height={35}
								alt={user?.user_name}
							/>
							<div className="ml-2 d-none d-sm-block">{user?.user_name}</div>
						</Dropdown.Toggle>
						<Dropdown.Menu align="right" className="p-0">
							<Link href={`/users/[pid]`} as={`/users/${user?.user_name}`} passHref>
								<Dropdown.Item>Profile</Dropdown.Item>
							</Link>
							<Link href={`/dashboard`} passHref>
								<Dropdown.Item>Dashboard</Dropdown.Item>
							</Link>
							<Dropdown.Divider className="m-0" />
							<Dropdown.Item onClick={onLogoutClick}>Logout</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				)}
				<Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto align-items-md-center">
						<Nav.Item>
							<Link href="/" passHref>
								<Nav.Link>Home</Nav.Link>
							</Link>
						</Nav.Item>
						{user && (
							<>
								<Nav.Item>
									<Link href="/new" passHref>
										<Nav.Link>New Post</Nav.Link>
									</Link>
								</Nav.Item>
								<Dropdown as={NavItem} className="d-none d-md-block">
									<Dropdown.Toggle as={NavLink} id="dropdown-custom-2" className="d-flex align-items-center">
										<CustomImage
											className="rounded-circle"
											src={`${process.env.IMAGES_URL}/${user?.avatar}`}
											width={35}
											height={35}
											alt={user?.user_name}
										/>
										<div className="ml-2">{user?.user_name}</div>
									</Dropdown.Toggle>
									<Dropdown.Menu align="right" className="p-0">
										<Link href={`/users/[pid]`} as={`/users/${user?.user_name}`} passHref>
											<Dropdown.Item>Profile</Dropdown.Item>
										</Link>
										<Link href={`/dashboard`} passHref>
											<Dropdown.Item>Dashboard</Dropdown.Item>
										</Link>
										<Dropdown.Divider className="m-0" />
										<Dropdown.Item onClick={onLogoutClick}>Logout</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</>
						)}
						{!user && (
							<>
								<Nav.Item>
									<Link href="/register" passHref>
										<Nav.Link>Register</Nav.Link>
									</Link>
								</Nav.Item>
								<Nav.Item>
									<Link href="/login" passHref>
										<Nav.Link>Login</Nav.Link>
									</Link>
								</Nav.Item>
							</>
						)}
						<Dropdown as={NavItem} className="d-block d-md-none">
							<Dropdown.Toggle as={NavLink} id="dropdown-custom-5">
								Options
							</Dropdown.Toggle>
							<Dropdown.Menu align="right" className="p-0">
								<Link href="/" passHref>
									<Dropdown.Item className="text-dark">
										<i className="fa fa-home fa-sm" /> Home
									</Dropdown.Item>
								</Link>
								<Link href="/tags" passHref>
									<Dropdown.Item>
										<i className="fa fa-tags fa-sm" /> Tags
									</Dropdown.Item>
								</Link>
								<Link href="/about" passHref>
									<Dropdown.Item>
										<i className="fa fa-question fa-sm" /> About
									</Dropdown.Item>
								</Link>
								<Link href="/faq" passHref>
									<Dropdown.Item>
										<i className="fa fa-question-circle fa-sm" /> FAQ
									</Dropdown.Item>
								</Link>
								<Link href="/contact" passHref>
									<Dropdown.Item>
										<i className="fa fa-info fa-sm" /> Contact
									</Dropdown.Item>
								</Link>
							</Dropdown.Menu>
						</Dropdown>
					</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
	);
};

export default NavBarComponent;
