module.exports = {
	siteUrl: process.env.WEBSITE_URL,
	generateRobotsTxt: true,
	exclude: ['/sitemap.xml'],
	robotsTxtOptions: {
		additionalSitemaps: [`${process.env.WEBSITE_URL}/sitemap.xml`]
	}
};
