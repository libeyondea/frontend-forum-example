import React from 'react';

const Footer = (props) => {
	return (
		<footer className="py-5 mt-5 bg-custom">
			<div className="container">
				<div className="row">
					<div className="col-12 col-md mb-4">
						<img
							className="rounded-circle mb-2"
							src="https://avatars1.githubusercontent.com/u/57558120?s=460&u=edcf8c9d01f9f5b76c1c6e30d6c775ec147cc434&v=4"
							width={66}
							height={66}
							alt="logo"
						/>
						<small className="d-block text-light">Copyright © Your Website 2020</small>
					</div>
					<div className="col-6 col-md mb-4">
						<h5 className="text-light">Features</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<a className="text-secondary" href="#!">
									Cool stuff
								</a>
							</li>
							<li>
								<a className="text-secondary" href="#!">
									Random feature
								</a>
							</li>
							<li>
								<a className="text-secondary" href="#!">
									Team feature
								</a>
							</li>
							<li>
								<a className="text-secondary" href="#!">
									Stuff for developers
								</a>
							</li>
							<li>
								<a className="text-secondary" href="#!">
									Another one
								</a>
							</li>
							<li>
								<a className="text-secondary" href="#!">
									Last time
								</a>
							</li>
						</ul>
					</div>
					<div className="col-6 col-md mb-4">
						<h5 className="text-light">Resources</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<a className="text-secondary" href="#!">
									Resource
								</a>
							</li>
							<li>
								<a className="text-secondary" href="#!">
									Resource name
								</a>
							</li>
							<li>
								<a className="text-secondary" href="#!">
									Another resource
								</a>
							</li>
							<li>
								<a className="text-secondary" href="#!">
									Final resource
								</a>
							</li>
						</ul>
					</div>
					<div className="col-6 col-md mb-4">
						<h5 className="text-light">About</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<a className="text-secondary" href="#!">
									Team
								</a>
							</li>
							<li>
								<a className="text-secondary" href="#!">
									Locations
								</a>
							</li>
							<li>
								<a className="text-secondary" href="#!">
									Privacy
								</a>
							</li>
							<li>
								<a className="text-secondary" href="#!">
									Terms
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
