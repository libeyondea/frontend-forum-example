import { useRouter } from 'next/router';
import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ total, limit }) => {
	const router = useRouter();
	const {
		asPath,
		query: { page: pageInitial }
	} = router;

	let page = Number.isInteger(parseInt(pageInitial)) && pageInitial >= 1 ? pageInitial : 1;

	const pageCount = Math.ceil(total / limit);

	if (!total || total <= limit) return null;

	if (page > pageCount || page < 1) return null;

	const handlePageClick = (data) => {
		router.push(`${asPath.split('?')[0]}?page=${data.selected + 1}`);
	};

	const initialPage = page ? page - 1 : 0;

	return (
		<div className="col-12">
			<nav>
				<ReactPaginate
					previousLabel={'Previous'}
					nextLabel={'Next'}
					breakLabel={'...'}
					pageCount={pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={5}
					initialPage={initialPage}
					forcePage={initialPage}
					disableInitialCallback={true}
					onPageChange={handlePageClick}
					containerClassName={'pagination flex-wrap'}
					activeClassName={'active'}
					pageClassName={'page-item'}
					pageLinkClassName={'page-link'}
					previousClassName={'page-item'}
					nextClassName={'page-item'}
					previousLinkClassName={'page-link'}
					nextLinkClassName={'page-link'}
					breakClassName={'page-item'}
					breakLinkClassName={'page-link'}
				/>
			</nav>
		</div>
	);
};

export default Pagination;
