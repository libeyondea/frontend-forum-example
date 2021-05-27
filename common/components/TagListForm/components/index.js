import React, { useState } from 'react';

import convertTextToSlug from '@/common/utils/convertTextToSlug ';

const TagListFormComponent = ({ errors, tags, setTag, ...props }) => {
	const [input, setInput] = useState('');

	const handleInputChange = (e) => {
		setInput(e.target.value);
	};

	const handleTagInputKeyDown = (e) => {
		switch (e.keyCode) {
			case 13: // Enter
			case 9: // Tab
			case 188: // Comma
				if (e.keyCode !== 9) e.preventDefault();
				handleInputKeyDown(e);
				break;
			case 8: // Backspace
				handleDeleteKeyDown();
				break;
			default:
				break;
		}
	};

	const handleInputKeyDown = (e) => {
		const value = convertTextToSlug(e.target.value);
		if (value) {
			if (tags.find((tag) => tag.slug.toLowerCase() === value.toLowerCase())) {
				return;
			}
			setTag([
				...tags,
				{
					slug: value
				}
			]);
			setInput('');
		}
	};

	const handleDeleteKeyDown = () => {
		if (tags.length && !input.length) {
			setTag(tags.slice(0, tags.length - 1));
		}
	};

	const handleInputOnBlur = (e) => {
		const value = convertTextToSlug(e.target.value);
		if (value) {
			if (tags.find((tag) => tag.slug.toLowerCase() === value.toLowerCase())) {
				return;
			}
			setTag([
				...tags,
				{
					slug: value
				}
			]);
			setInput('');
		}
	};

	const handleRemoveItem = (index) => {
		const newTags = [...tags];
		newTags.splice(index, 1);
		setTag(newTags);
	};

	return (
		<>
			<label htmlFor="tags">Tags</label>
			<ul className="border rounded px-1 flex-wrap d-flex border mb-0">
				{tags.map(
					(item, i) =>
						item.slug && (
							<span className="badge badge-secondary my-1 mr-1 d-flex align-items-center font-weight-normal" key={i}>
								{item.slug}
								<i className="fa fa-times p-1 cursor-pointer" onClick={() => handleRemoveItem(i)} aria-hidden="true" />
							</span>
						)
				)}
				<input
					{...props}
					className="outline-none w-auto flex-fill py-2 border-0"
					value={input}
					id="tags"
					name="tags"
					onChange={handleInputChange}
					onBlur={handleInputOnBlur}
					onKeyDown={handleTagInputKeyDown}
				/>
			</ul>
			{errors &&
				errors.map((item, index) => (
					<div className="invalid-feedback d-block" key={index}>
						{item}
					</div>
				))}
		</>
	);
};

export default TagListFormComponent;
