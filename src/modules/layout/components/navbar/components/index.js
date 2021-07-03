import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { FaRegBell } from 'react-icons/fa';

import CustomImage from '@/common/components/CustomImage/components';
import useUser from '@/common/hooks/useUser';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie, removeCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';
import optionsMenu from '@/modules/layout/components/navbar/components/optionsMenu';
import style from '@/modules/layout/components/navbar/styles/style.module.scss';

const NavBarComponent = () => {
	const router = useRouter();
	const { user } = useUser();

	const [search, setSearch] = useState(router.query?.q || '');

	const onSearchSubmit = (e) => {
		e.preventDefault();
		try {
			router.push(`/search?q=${search}${router.query?.type ? `&type=${router.query?.type}` : ''}`);
		} catch (error) {
			showToast.error();
		}
	};

	const handleChangeSearch = (event) => {
		setSearch(event.target.value);
	};

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

	const DropdownMenuNoti = (classNameWrapper) => (
		<Dropdown as={NavItem} className={`${classNameWrapper}`}>
			<Dropdown.Toggle
				as={NavLink}
				id="dropdown-noti"
				className={`position-relative d-flex align-items-center text-secondary p-0 my-2 ms-2 me-3 ${style.custom__dropdown__toggle}`}
			>
				<FaRegBell className="h3 mb-0" />
				<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
					+99 <span className="visually-hidden">unread messages</span>
				</span>
			</Dropdown.Toggle>
			<Dropdown.Menu align="end" className="p-0 dropdown-menu-end" style={{ width: '333px' }}>
				<Link href={`/`} passHref>
					<Dropdown.Item className="p-3">
						<div className="d-flex align-items-center">
							<div className="me-2">
								<div className="text-decoration-none d-inline-block d-flex align-items-center">
									<CustomImage
										src={`${process.env.IMAGES_URL}/6666666666.jpg`}
										className="rounded-circle"
										width={40}
										height={40}
										alt={``}
										layout="fixed"
									/>
								</div>
							</div>
							<div className="lh-1 text-wrap">
								<div className="text-decoration-none text-dark">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit
								</div>
								<span className="text-muted small">{`6 years ago`}</span>
							</div>
						</div>
					</Dropdown.Item>
				</Link>
				<Dropdown.Divider className="m-0" />
				<Link href={`/`} passHref>
					<Dropdown.Item className="text-center">View all</Dropdown.Item>
				</Link>
			</Dropdown.Menu>
		</Dropdown>
	);

	const DropdownMenuUser = (classNameWrapper) => (
		<Dropdown as={NavItem} className={`${classNameWrapper}`}>
			<Dropdown.Toggle
				as={NavLink}
				id="dropdown-user"
				className={`d-flex align-items-center p-2 pe-md-2 pe-3 ${style.custom__dropdown__toggle}`}
			>
				<CustomImage
					className="rounded-circle"
					src={`${process.env.IMAGES_URL}/${user?.avatar}`}
					width={34}
					height={34}
					alt={user?.user_name}
					layout="fixed"
				/>
			</Dropdown.Toggle>
			<Dropdown.Menu align={'end'} className="p-0 dropdown-menu-end">
				<Link href={`/u/${user?.user_name}`} passHref>
					<Dropdown.Item>
						<span className="d-block h6 mb-0">
							{user?.first_name} {user?.last_name}
						</span>
						<small className="text-secondary">@{user?.user_name}</small>
					</Dropdown.Item>
				</Link>
				<Dropdown.Divider className="m-0" />
				<Link href={`/dashboard`} passHref>
					<Dropdown.Item>Dashboard</Dropdown.Item>
				</Link>
				<Link href="/new" passHref>
					<Dropdown.Item>New Post</Dropdown.Item>
				</Link>
				<Dropdown.Divider className="m-0" />
				<Dropdown.Item onClick={onLogoutClick}>Logout</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);

	return (
		<Navbar collapseOnSelect expand="md" bg="light" variant="light" fixed="top" className="shadow-sm">
			<div className="container-xl">
				<Link href="/" passHref>
					<Navbar.Brand className="d-flex align-items-center me-md-3 me-auto">
						<CustomImage
							className="rounded-circle"
							src={`${process.env.IMAGES_URL}/6666666666.jpg`}
							width={44}
							height={44}
							alt="Logo"
							layout="fixed"
						/>
						<div className="ms-2 d-none d-sm-block">De4thZone</div>
					</Navbar.Brand>
				</Link>
				{user && (
					<div className="d-flex align-items-center order-md-2">
						{DropdownMenuNoti('')}
						{DropdownMenuUser('')}
					</div>
				)}
				<Navbar.Toggle aria-controls="responsive-navbar-nav" className="" />
				<Navbar.Collapse id="responsive-navbar-nav" className="order-md-1">
					<Nav className="align-items-md-center">
						<form className="form-inline py-md-0 py-2" onSubmit={onSearchSubmit}>
							<input
								placeholder="Search"
								type="text"
								value={search}
								onChange={handleChangeSearch}
								className="form-control w-100"
							/>
						</form>
					</Nav>
					<Nav className="align-items-md-center ms-auto">
						<Dropdown as={NavItem}>
							<Dropdown.Toggle as={NavLink} id="dropdown-locale" className="py-2">
								{router.locale === 'vi' ? 'Vietnamese' : 'English'}
							</Dropdown.Toggle>
							<Dropdown.Menu align="end" className="p-0 dropdown-menu-end">
								<Link href={router.asPath} locale="en" passHref>
									<Dropdown.Item>English</Dropdown.Item>
								</Link>
								<Link href={router.asPath} locale="vi" passHref>
									<Dropdown.Item>Vietnamese</Dropdown.Item>
								</Link>
							</Dropdown.Menu>
						</Dropdown>
						{user && (
							<>
								<Nav.Item className="d-none d-md-block px-2">
									<Link href="/new" passHref>
										<Nav.Link className="btn btn-primary text-white fw-bold">New Post</Nav.Link>
									</Link>
								</Nav.Item>
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
							<Dropdown.Toggle as={NavLink} id="dropdown-options" className="py-2">
								Options
							</Dropdown.Toggle>
							<Dropdown.Menu align="end" className="p-0 dropdown-menu-end">
								{optionsMenu.map((m, index) => (
									<Link href={m.href} key={index} passHref>
										<Dropdown.Item className="d-flex align-items-center">
											{m.icon}
											{m.name}
										</Dropdown.Item>
									</Link>
								))}
							</Dropdown.Menu>
						</Dropdown>
					</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
	);
};

export default NavBarComponent;
