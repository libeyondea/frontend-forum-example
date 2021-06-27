module.exports = {
	siteUrl: process.env.WEBSITE_URL || 'https://de4thzone.com',
	generateRobotsTxt: true,
	exclude: ['/sitemap.xml'],
	robotsTxtOptions: {
		additionalSitemaps: [`${process.env.WEBSITE_URL || 'https://de4thzone.com'}/sitemap.xml`]
	}
};
