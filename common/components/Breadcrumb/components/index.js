import CustomLink from '@/common/components/CustomLink/components';

const BreadcrumbComponent = ({ items = [] }) => {
	let countArr = items.length - 1;
	return (
		<ol className="breadcrumb mb-4 bg-light rounded-lg shadow-sm">
			{items.map((item, index) =>
				items.indexOf(item) !== countArr ? (
					<li key={index} className="breadcrumb-item">
						<CustomLink className="text-decoration-none" href={item.href}>
							{item.title}
						</CustomLink>
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

export default BreadcrumbComponent;
