
module.exports = {
    globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,html,ttf,ico}',
        // '/assets/**/*'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
    maximumFileSizeToCacheInBytes: 1024 *1024 * 10,
    runtimeCaching: [
        {
            urlPattern: /(^assets\/|.*\/assets\/.*)/,
            handler: 'CacheFirst',
            options: {
            cacheName: 'assets',
            }
        },
        {
            urlPattern: /\.(html|htm)$/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'assets',
            }
        },
    ],
}