import React from 'react';

import CustomImage from '@/common/components/CustomImage/components';

const FooterComponent = () => {
	return (
		<footer className="py-5 bg-dark">
			<div className="container">
				<div className="row">
					<div className="col-12 col-md mb-4">
						<CustomImage
							className="rounded-circle"
							src={`${process.env.IMAGES_URL}/6666666666.jpg`}
							width={66}
							height={66}
							alt="Logo De4th Zone"
						/>
						<small className="d-block text-light">Copyright © Your Website 2020</small>
					</div>
					<div className="col-6 col-md mb-4">
						<h5 className="text-white">Features</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
									Cool stuff
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
									Random feature
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
									Team feature
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
									Stuff for developers
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
									Another one
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
									Last time
								</a>
							</li>
						</ul>
					</div>
					<div className="col-6 col-md mb-4">
						<h5 className="text-white">Resources</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
									Resource
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
									Resource name
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
									Another resource
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
									Final resource
								</a>
							</li>
						</ul>
					</div>
					<div className="col-6 col-md mb-4">
						<h5 className="text-white">About</h5>
						<ul className="list-unstyled text-small mb-0">
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
									Team
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
									Locations
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
									Privacy
								</a>
							</li>
							<li>
								<a className="text-secondary text-decoration-none" href="#!">
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

export default FooterComponent;
