import CustomLink from 'components/Common/CustomLink';

const Breadcrumb = ({ items = [] }) => {
	let countArr = items.length - 1;
	return (
		<ol className="breadcrumb my-4 bg-light rounded-lg shadow-sm">
			{items.map((item) =>
				items.indexOf(item) !== countArr ? (
					<li className="breadcrumb-item">
						<CustomLink href={item.href}>{item.title}</CustomLink>
					</li>
				) : (
					<li className="breadcrumb-item active">{item.title}</li>
				)
			)}
		</ol>
	);
};

export default Breadcrumb;
