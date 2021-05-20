import { toast } from 'react-toastify';

const showToast = {
	current: (message) => toast(message),
	success: (message) =>
		toast.success(message, {
			position: toast.POSITION.BOTTOM_RIGHT
		}),
	error: (message = 'An error occurred. Please try again later.') =>
		toast.error(message, {
			position: toast.POSITION.BOTTOM_RIGHT
		}),
	warn: (message) =>
		toast.info(message, {
			position: toast.POSITION.BOTTOM_RIGHT
		}),
	info: (message) =>
		toast.info(message, {
			position: toast.POSITION.BOTTOM_RIGHT
		})
};

export default showToast;
