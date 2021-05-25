import Image from 'next/image';

const CustomImageComponent = ({ src, alt, className, ...props }) => (
	<Image {...props} src={src} alt={alt} className={className} />
);

export default CustomImageComponent;
