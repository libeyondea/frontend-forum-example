import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Maybe from './Maybe';
import { getRange, getPageInfo } from 'lib/utils/calculatePagination';

const lastIndexWithTotal = (postsCount) => {
	return postsCount > 480 ? Math.ceil(postsCount / 20) : Math.ceil(postsCount / 20) - 1;
};

const Pagination = ({ total, limit, pageCount = 10, asUrl }) => {
	if (total <= 20) return null;
	const router = useRouter();
	const {
		pathname,
		query: { page }
	} = router;
	let curPage = parseInt(page || 1);

	let currentPage = parseInt(curPage) - 1;

	const { firstPage, lastPage, hasPreviousPage, hasNextPage } = getPageInfo({
		limit,
		pageCount,
		total,
		page: currentPage
	});

	const lastIndex = lastIndexWithTotal(total);

	const pages = total > 0 ? getRange(firstPage, lastPage) : [];

	return (
		<div className="col-12">
			<nav>
				<ul className="pagination">
					<li className={`page-item ${currentPage === 0 && 'disabled'}`}>
						<Link href={`${pathname}?page=1`} as={`${asUrl}?page=1`} scroll={false} passHref>
							<a className="page-link">
								<i className="fa fa-angle-double-left" />
							</a>
						</Link>
					</li>
					<Maybe test={hasPreviousPage}>
						<li className="page-item">
							<Link
								href={`${pathname}?page=${curPage - 1}`}
								as={`${asUrl}?page=${curPage - 1}`}
								scroll={false}
								passHref
							>
								<a className="page-link">
									<i className="fa fa-angle-left" />
								</a>
							</Link>
						</li>
					</Maybe>
					{pages.map((page) => {
						const isCurrent = !currentPage ? page === 0 : page === currentPage;
						return (
							<li key={page.toString()} className={`page-item ${isCurrent && 'active'}`}>
								<Link href={`${pathname}?page=${page + 1}`} as={`${asUrl}?page=${page + 1}`} scroll={false} passHref>
									<a className="page-link">{page + 1}</a>
								</Link>
							</li>
						);
					})}
					<Maybe test={hasNextPage}>
						<li className="page-item">
							<Link
								href={`${pathname}?page=${curPage + 1}`}
								as={`${asUrl}?page=${curPage + 1}`}
								scroll={false}
								passHref
							>
								<a className="page-link">
									<i className="fa fa-angle-right" />
								</a>
							</Link>
						</li>
					</Maybe>
					<li className={`page-item ${currentPage === lastIndex && 'disabled'}`}>
						<Link
							href={`${pathname}?page=${lastIndex + 1}`}
							as={`${asUrl}?page=${lastIndex + 1}`}
							scroll={false}
							passHref
						>
							<a className="page-link">
								<i className="fa fa-angle-double-right" />
							</a>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Pagination;
