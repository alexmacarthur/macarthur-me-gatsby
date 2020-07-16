module.exports = [
    {
        fromPath: "/typeit",
        toPath: "https://typeitjs.com",
        statusCode: 301,
    }, 
    {
        fromPath: "/posts/lazy-load-images-in-wordpress-without-a-plugin",
        toPath: "/posts/build-your-own-simple-lazy-loading-functionality-in-wordpress",
        statusCode: 301,
    }, 
    {
        fromPath: "/bell",
        toPath: "https://alexmacarthur.github.io/bell",
        statusCode: 301,
    }, 
    {
        fromPath: "/notes/*",
        toPath: "/posts/:splat",
        statusCode: 301,
    }, 
    {
        fromPath: "/posts/cleaning-up-redux-store-listeners-when-component-state-updates",
        toPath: "/posts/clean-up-your-redux-store-listeners-when-component-state-updates",
        statusCode: 301
    }, 
    {
        fromPath: "/posts/blog-for-your-own-sake",
        toPath: "https://www.ramseyinhouse.com/blog/as-an-engineer-write",
        statusCode: 301
    }
];
