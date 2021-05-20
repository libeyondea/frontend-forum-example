import Image from 'next/image';

const CustomImage = ({ src, alt, className, ...props }) => (
	<Image {...props} src={src} alt={alt} className={className} />
);

export default CustomImage;
