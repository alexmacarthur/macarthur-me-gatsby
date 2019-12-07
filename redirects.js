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
        fromPath: "/posts/test",
        toPath: "/posts/use-web-workers-for-your-event-listeners, 
        statusCode: 302
    }
];
