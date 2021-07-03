import { isEmpty, pickBy } from 'lodash';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';

import Item from '@/common/components/Pagination/components/Item';
import Link from '@/common/components/Pagination/components/Link';
import List from '@/common/components/Pagination/components/List';
import pageNumber from '@/common/utils/pageNumber';

const getPageNumbers = ({ currentPage, limit, total, pageNumbersToShow = 3 }) => {
	const lastPageNumber = Math.ceil(total / limit);
	const currentPageNumber = currentPage <= lastPageNumber ? currentPage : lastPageNumber;
	const maxPagesBeforeCurrentPage = Math.floor(pageNumbersToShow / 2);
	const maxPagesAfterCurrentPage = Math.ceil(pageNumbersToShow / 2) - 1;
	let startPage = 1;
	let endPage = lastPageNumber;

	if (lastPageNumber <= 1) {
		return []; // Don't show numbers if there's only 1 page
	}

	if (currentPageNumber <= maxPagesBeforeCurrentPage) {
		// near the start
		startPage = 1;
		endPage = pageNumbersToShow;
	} else if (currentPageNumber + maxPagesAfterCurrentPage >= lastPageNumber) {
		// near the end
		startPage = lastPageNumber - pageNumbersToShow + 1;
	} else {
		// somewhere in the middle
		startPage = currentPageNumber - maxPagesBeforeCurrentPage;
		endPage = currentPageNumber + maxPagesAfterCurrentPage;
	}

	let pageNumbers = Array.from(Array(endPage + 1 - startPage).keys())
		.map((pageNumber) => startPage + pageNumber)
		.filter((pageNumber) => pageNumber <= lastPageNumber && pageNumber > 0);

	if (pageNumbers[0] > 1) {
		if (pageNumbers[0] <= 2) {
			pageNumbers = [1, ...pageNumbers];
		} else {
			const ellipsis = pageNumbers[0] > 3 ? '...' : 2;
			pageNumbers = [1, ellipsis, ...pageNumbers];
		}
	}

	if (pageNumbers[pageNumbers.length - 1] !== lastPageNumber) {
		if (pageNumbers[pageNumbers.length - 1] === lastPageNumber - 1) {
			pageNumbers = [...pageNumbers, lastPageNumber];
		} else {
			const ellipsis = pageNumbers[pageNumbers.length - 1] < lastPageNumber - 2 ? '...' : lastPageNumber - 1;
			pageNumbers = [...pageNumbers, ellipsis, lastPageNumber];
		}
	}

	return pageNumbers;
};

const Pagination = ({ total, limit }) => {
	const router = useRouter();

	if (total <= limit) return null;

	const query = pickBy({ ...(router.query || {}) }, (q) => !isEmpty(q));

	const currentPage = pageNumber(query.page);

	const isLastPage = currentPage * limit >= total;

	const pageNumbers = getPageNumbers({ currentPage, limit, total });

	const url = (page) =>
		`?${queryString.stringify({
			...query,
			page
		})}`;

	return (
		<div className="row">
			<div className="col">
				<nav aria-label="pagination">
					<List>
						{currentPage !== 1 ? (
							<Item>
								<NextLink href={url(currentPage - 1)} passHref scroll={false}>
									<Link label="Previous page">&lsaquo;</Link>
								</NextLink>
							</Item>
						) : (
							<Item disabled>
								<Link label="No previous page available" disabled>
									&lsaquo;
								</Link>
							</Item>
						)}
						{pageNumbers.map((pageNumber, i) =>
							pageNumber === '...' ? (
								<Item disabled key={`${pageNumber}${i}`} hellip>
									<Link label="ellipsis">&hellip;</Link>
								</Item>
							) : pageNumber === currentPage ? (
								<Item current key={pageNumber}>
									<Link label={`Page ${pageNumber}`} current="Page">
										{pageNumber}
									</Link>
								</Item>
							) : (
								<Item key={pageNumber}>
									<NextLink href={url(pageNumber)} passHref scroll={false}>
										<Link label={`Page ${pageNumber}`}>{pageNumber}</Link>
									</NextLink>
								</Item>
							)
						)}
						{!isLastPage ? (
							<Item>
								<NextLink href={url(currentPage + 1)} passHref scroll={false}>
									<Link label="Next page">&rsaquo;</Link>
								</NextLink>
							</Item>
						) : (
							<Item disabled>
								<Link label="No next page available" disabled>
									&rsaquo;
								</Link>
							</Item>
						)}
					</List>
				</nav>
			</div>
		</div>
	);
};

Pagination.propTypes = {
	total: PropTypes.number.isRequired,
	limit: PropTypes.number.isRequired
};

Pagination.defaultProps = {
	total: 0
};

export default Pagination;
