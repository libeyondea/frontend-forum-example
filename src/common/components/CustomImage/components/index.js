import Image from 'next/image';

const CustomImageComponent = ({ src, alt, className, ...props }) =>
	props.width <= 40 || props.height <= 40 ? (
		<Image {...props} src={src} alt={alt} className={className} />
	) : (
		<Image {...props} src={src} alt={alt} className={className} blurDataURL={src} placeholder="blur" />
	);

export default CustomImageComponent;
