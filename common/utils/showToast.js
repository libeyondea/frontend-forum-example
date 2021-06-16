import { toast } from 'react-toastify';

const showToast = {
	current: (message, id) =>
		toast(message, {
			autoClose: 1666,
			toastId: id
		}),
	success: (message, id) =>
		toast.success(message, {
			autoClose: 1666,
			position: toast.POSITION.BOTTOM_RIGHT,
			toastId: id
		}),
	error: (message = 'An error occurred. Please try again later.', id) =>
		toast.error(message, {
			autoClose: 1666,
			position: toast.POSITION.BOTTOM_RIGHT,
			toastId: id
		}),
	warn: (message, id) =>
		toast.info(message, {
			autoClose: 1666,
			position: toast.POSITION.BOTTOM_RIGHT,
			toastId: id
		}),
	info: (message, id) =>
		toast.info(message, {
			autoClose: 1666,
			position: toast.POSITION.BOTTOM_RIGHT,
			toastId: id
		})
};

export default showToast;
