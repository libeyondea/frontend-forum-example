import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import LayoutComponent from '@/modules/layout/components';
import SearchComponent from '@/modules/search/components';

const Search = () => {
	return (
		<>
			<MetaWebsite title="Search" />
			<LayoutComponent>
				<SearchComponent />
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ query }) {
	try {
		return {
			props: {
				query: query
			}
		};
	} catch (error) {
		return {
			notFound: true
		};
	}
}

export default Search;
