import CustomImage from 'components/Common/CustomImage';
import CustomLink from 'components/Common/CustomLink';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { useDispatch, useSelector } from 'react-redux';
import { listCategoryRequestedAction } from 'redux/actions/categoryAction';
import { logoutUserRequestedAction } from 'redux/actions/userAction';

import Maybe from './Maybe';
import MayBeSpinner from './MayBeSpinner';

const NavBar = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const login = useSelector((state) => state.users.login);
	const listCategory = useSelector((state) => state.categories.list_category);

	useEffect(() => {
		dispatch(listCategoryRequestedAction(1));
	}, [dispatch]);

	const handleLogoutUser = (e) => {
		e.preventDefault();
		dispatch(logoutUserRequestedAction(router));
	};

	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" className="shadow-sm">
				<Container>
					<Link href="/" passHref>
						<Navbar.Brand className="d-flex align-items-center">
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
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="ml-auto align-items-lg-center">
							<Nav.Item>
								<Link href="/" passHref>
									<Nav.Link>Home</Nav.Link>
								</Link>
							</Nav.Item>
							<Dropdown as={NavItem}>
								<Dropdown.Toggle as={NavLink} id="dropdown-custom-1">
									Categories
								</Dropdown.Toggle>
								<Dropdown.Menu align="right">
									<MayBeSpinner test={listCategory.is_loading} spinner={<>Loading...</>}>
										{listCategory.categories?.map((category) => (
											<CustomLink
												key={category.id}
												href={`/category/[pid]`}
												as={`/category/${category.slug}`}
												className="dropdown-item"
											>
												{category.title}
											</CustomLink>
										))}
									</MayBeSpinner>
								</Dropdown.Menu>
							</Dropdown>
							<Maybe test={login.is_authenticated}>
								<Nav.Item>
									<Link href="/editor/new" as="/editor/new" passHref>
										<Nav.Link>New Post</Nav.Link>
									</Link>
								</Nav.Item>
								<Dropdown as={NavItem}>
									<Dropdown.Toggle as={NavLink} id="dropdown-custom-2" className="d-flex align-items-center">
										<CustomImage
											className="rounded-circle mr-2"
											src={login.user?.avatar}
											width={35}
											height={35}
											alt={login.user?.user_name}
										/>
										{login.user?.user_name}
									</Dropdown.Toggle>
									<Dropdown.Menu align="right">
										<Link href={`/profile/[pid]`} as={`/profile/${login.user.user_name}`} passHref>
											<Dropdown.Item>Profile</Dropdown.Item>
										</Link>
										<Dropdown.Divider />
										<Dropdown.Item onClick={handleLogoutUser}>Logout</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</Maybe>
							<Maybe test={!login.is_authenticated}>
								<Nav.Item>
									<Link href="/user/register" passHref>
										<Nav.Link>Register</Nav.Link>
									</Link>
								</Nav.Item>
								<Nav.Item>
									<Link href="/user/login" passHref>
										<Nav.Link>Login</Nav.Link>
									</Link>
								</Nav.Item>
							</Maybe>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavBar;
