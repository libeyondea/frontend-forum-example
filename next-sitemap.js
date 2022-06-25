module.exports = {
	siteUrl: process.env.WEBSITE_URL || 'https://frontend-forum-example.vercel.app',
	generateRobotsTxt: true,
	exclude: ['/sitemap.xml'],
	robotsTxtOptions: {
		additionalSitemaps: [`${process.env.WEBSITE_URL || 'https://frontend-forum-example.vercel.app'}/sitemap.xml`]
	}
};
