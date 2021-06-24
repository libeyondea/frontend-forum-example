import React, { useState } from 'react';

import LoadingSpinner from '@/common/components/LoadingSpinner/components';
import useUser from '@/common/hooks/useUser';
import NewPostFormComponent from '@/modules/newPost/components/newPostForm';
import style from '@/modules/newPost/styles/style.module.scss';

const NewPostComponent = () => {
	const { user } = useUser();
	const [isPreview, setIsPreview] = useState(false);

	return (
		<div className="container-xl my-4">
			{!user ? (
				<LoadingSpinner />
			) : (
				<div className="row">
					<div className="col-md-9">
						<div className="d-flex align-items-center mb-3">
							<ul className="ml-auto nav nav-pills">
								<li className="nav-item">
									<button
										className={`border-0  py-1 px-3 text-dark ${style.nav_link} ${!isPreview && style.active}`}
										onClick={() => setIsPreview(false)}
									>
										Edit
									</button>
								</li>
								<li className="nav-item">
									<button
										className={`border-0  py-1 px-3 text-dark ${style.nav_link} ${isPreview && style.active}`}
										onClick={() => setIsPreview(true)}
									>
										Preview
									</button>
								</li>
							</ul>
						</div>
						<div className="row">
							<div className="col-12">
								<NewPostFormComponent isPreview={isPreview} />
							</div>
						</div>
					</div>
					<div className="col-md-3">
						<h5 className="font-weight-bold">Editor Basics</h5>
						<p className="text-secondary mb-0">Editor Basics Use Markdown to write and format posts.</p>
						<details className="my-1">
							<summary className="cursor-pointer text-secondary ">Commonly used syntax</summary>
							<table className="bg-light rounded-lg shadow-sm w-100 mt-2 mb-4 small">
								<tbody>
									<tr>
										<td className="p-2">
											# Header
											<br />
											...
											<br />
											###### Header
										</td>
										<td className="p-2">
											H1 Header
											<br />
											...
											<br />
											H6 Header
										</td>
									</tr>
									<tr>
										<td className="p-2">*italics* or _italics_</td>
										<td className="p-2">
											<em>italics</em>
										</td>
									</tr>
									<tr>
										<td className="p-2">**bold**</td>
										<td className="p-2">
											<strong>bold</strong>
										</td>
									</tr>
									<tr>
										<td className="p-2">[Link](https://...)</td>
										<td className="p-2">
											<a href="https://de4thzone.com">Link</a>
										</td>
									</tr>
									<tr>
										<td className="p-2">
											* item 1<br />* item 2
										</td>
										<td className="p-2">
											<ul className="m-0 p-0">
												<li>item 1</li>
												<li>item 2</li>
											</ul>
										</td>
									</tr>
									<tr>
										<td className="p-2">
											1. item 1<br />
											2. item 2
										</td>
										<td className="p-2">
											<ol className="m-0 p-0">
												<li>item 1</li>
												<li>item 2</li>
											</ol>
										</td>
									</tr>
									<tr>
										<td className="p-2">&gt; quoted text</td>
										<td className="p-2">
											<span className="">quoted text</span>
										</td>
									</tr>
									<tr>
										<td className="p-2">`inline code`</td>
										<td className="p-2">
											<code>inline code</code>
										</td>
									</tr>
								</tbody>
							</table>
						</details>
					</div>
				</div>
			)}
		</div>
	);
};

export default NewPostComponent;
