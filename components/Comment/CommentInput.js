import React from 'react';
import { useSelector } from 'react-redux';
import CustomLink from 'components/Common/CustomLink';
import CustomImage from 'components/Common/CustomImage';

const CommentInput = () => {
	const login = useSelector((state) => state.users.login);
	if (!login.is_authenticated) {
		return (
			<div className="mb-3">
				<CustomLink href="/user/login" as="/user/login">
					Login
				</CustomLink>
				&nbsp;or&nbsp;
				<CustomLink href="/user/register" as="/user/register">
					Register
				</CustomLink>
				&nbsp;to add comments on this post.
			</div>
		);
	}
	return (
		<div className="media my-5">
			<CustomLink href="/profile/[pid]" as={`/profile/${login.user?.user_name}`}>
				<CustomImage
					width="50"
					height="50"
					src={login.user?.avatar}
					alt={login.user?.user_name}
					className="d-flex mr-3 rounded-circle"
				/>
			</CustomLink>
			<div className="media-body">
				<form>
					<div className="form-group">
						<textarea rows={3} className="form-control" placeholder="Write a comment..." defaultValue="" />
					</div>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default CommentInput;
