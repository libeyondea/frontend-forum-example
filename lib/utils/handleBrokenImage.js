const handleBrokenImage = (e) => {
	e.target.src = process.env.IMAGES.DEFAULT_IMAGE_BROKEN;
	e.target.onerror = null;
};

export default handleBrokenImage;
