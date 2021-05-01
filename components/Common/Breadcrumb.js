import CustomLink from '@/components/Common/CustomLink';

const Breadcrumb = ({ items = [] }) => {
	let countArr = items.length - 1;
	return (
		<ol className="breadcrumb mb-4 bg-light rounded-lg shadow-sm">
			{items.map((item, index) =>
				items.indexOf(item) !== countArr ? (
					<li key={index} className="breadcrumb-item">
						<CustomLink href={item.href}>{item.title}</CustomLink>
					</li>
				) : (
					<li key={index} className="breadcrumb-item active">
						{item.title}
					</li>
				)
			)}
		</ol>
	);
};

export default Breadcrumb;
