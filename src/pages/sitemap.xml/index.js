import { getServerSideSitemap } from 'next-sitemap';

import httpRequest from '@/common/utils/httpRequest';

export const getServerSideProps = async (ctx) => {
	let siteMap = [];

	const siteMapHome = [
		{
			loc: `${process.env.WEBSITE_URL}`,
			lastmod: new Date().toISOString()
		}
	];

	const resSiteMapPost = await httpRequest.get({
		url: `/sitemap`,
		params: {
			type: 'posts'
		}
	});

	const resSiteMapCategory = await httpRequest.get({
		url: `/sitemap`,
		params: {
			type: 'categories'
		}
	});

	const resSiteMapTag = await httpRequest.get({
		url: `/sitemap`,
		params: {
			type: 'tags'
		}
	});

	if (resSiteMapPost.data.success || resSiteMapCategory.data.success || resSiteMapTag.data.success) {
		const siteMapPost = resSiteMapPost.data.data.map((s) => {
			return {
				loc: `${process.env.WEBSITE_URL}/u/${s.user.user_name}/${s.slug}`,
				lastmod: s.updated_at
			};
		});

		const siteMapCategory = resSiteMapCategory.data.data.map((s) => {
			return {
				loc: `${process.env.WEBSITE_URL}/c/${s.slug}`,
				lastmod: s.updated_at
			};
		});

		const siteMapTag = resSiteMapTag.data.data.map((s) => {
			return {
				loc: `${process.env.WEBSITE_URL}/t/${s.slug}`,
				lastmod: s.updated_at
			};
		});

		siteMap = siteMapHome.concat(siteMapPost, siteMapCategory, siteMapTag);
	}

	return getServerSideSitemap(ctx, siteMap);
};

export default function SiteMap() {}
