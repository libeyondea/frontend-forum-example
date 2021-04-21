import handleBrokenImage from 'lib/utils/handleBrokenImage';

const CustomImage = ({ src, alt, className, ...props }) => (
	<img
		{...props}
		data-sizes="auto"
		data-src={src}
		src={process.env.IMAGES.DEFAULT_IMAGE_SOURCE}
		alt={alt}
		className={className ? `${className} lazyload` : `lazyload`}
		onError={handleBrokenImage}
	/>
);

export default CustomImage;
