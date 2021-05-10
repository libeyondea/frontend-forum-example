import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { useDispatch, useSelector } from 'react-redux';

import CustomImage from '@/components/Common/CustomImage';
import Maybe from '@/components/Common/Maybe';
import { logoutUserRequestedAction } from '@/redux/actions/userAction';

const NavBar = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const currentUser = useSelector((state) => state.users.current_user);

	const handleLogoutUser = (e) => {
		e.preventDefault();
		dispatch(logoutUserRequestedAction(router));
	};

	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" className="shadow-sm">
				<div className="container-xl">
					<Link href="/" passHref>
						<Navbar.Brand className="d-flex align-items-center mr-auto">
							<CustomImage
								className="rounded-circle mr-2"
								src="https://avatars1.githubusercontent.com/u/57558120?s=460&u=edcf8c9d01f9f5b76c1c6e30d6c775ec147cc434&v=4"
								width={44}
								height={44}
								alt="Logo"
							/>
							De4thZone
						</Navbar.Brand>
					</Link>
					<Maybe test={currentUser.is_authenticated}>
						<Dropdown as={NavItem} className="d-block d-lg-none">
							<Dropdown.Toggle as={NavLink} id="dropdown-custom-2" className="d-flex align-items-center">
								<CustomImage
									className="rounded-circle mr-2"
									src={currentUser.user?.avatar}
									width={35}
									height={35}
									alt={currentUser.user?.user_name}
								/>
								{currentUser.user?.user_name}
							</Dropdown.Toggle>
							<Dropdown.Menu align="right">
								<Link href={`/users/[pid]`} as={`/users/${currentUser.user.user_name}`} passHref>
									<Dropdown.Item>Profile</Dropdown.Item>
								</Link>
								<Dropdown.Divider />
								<Dropdown.Item onClick={handleLogoutUser}>Logout</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Maybe>
					<Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="ml-auto align-items-lg-center">
							<Nav.Item>
								<Link href="/" passHref>
									<Nav.Link>Home</Nav.Link>
								</Link>
							</Nav.Item>
							<Maybe test={currentUser.is_authenticated}>
								<Nav.Item>
									<Link href="/editor/new" as="/editor/new" passHref>
										<Nav.Link>New Post</Nav.Link>
									</Link>
								</Nav.Item>
								<Dropdown as={NavItem} className="d-none d-lg-block">
									<Dropdown.Toggle as={NavLink} id="dropdown-custom-2" className="d-flex align-items-center">
										<CustomImage
											className="rounded-circle mr-2"
											src={currentUser.user?.avatar}
											width={35}
											height={35}
											alt={currentUser.user?.user_name}
										/>
										{currentUser.user?.user_name}
									</Dropdown.Toggle>
									<Dropdown.Menu align="right">
										<Link href={`/users/[pid]`} as={`/users/${currentUser.user.user_name}`} passHref>
											<Dropdown.Item>Profile</Dropdown.Item>
										</Link>
										<Dropdown.Divider />
										<Dropdown.Item onClick={handleLogoutUser}>Logout</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</Maybe>
							<Maybe test={!currentUser.is_authenticated}>
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
							</Maybe>
							<Dropdown as={NavItem} className="d-block d-lg-none">
								<Dropdown.Toggle as={NavLink} id="dropdown-custom-5">
									Options
								</Dropdown.Toggle>
								<Dropdown.Menu align="right">
									<Link href="/" passHref>
										<Dropdown.Item>
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
		</>
	);
};

export default NavBar;
