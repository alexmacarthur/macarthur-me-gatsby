---
title: Preloading JavaScript Assets in WordPress
date: "2018-04-05"
open_graph: "https://images.pexels.com/photos/8775/traffic-car-vehicle-black.jpg?cs=srgb&dl=automobile-boost-car-8775.jpg&fm=jpg"
---

Squeezing every last drop of performance out of your website on any platform is an always-changing, never-ending, often addictive battle.

Among the several tactics you can employ in this fight, optimizing your site's [resource hints](https://www.w3.org/TR/resource-hints) is a modern approach that can yield some significant ROI. And specifically, asset preloading is a particularly impactful place to start. [It's a topic worth learning about in more depth yourself](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/), but in short, preloading involves a web page starting to load a particular asset as soon as possible in the background, so it's ready to be used when the page calls for it. Because it's all done asyncronously, it won't block anything else from coming in the view during load. This is different from using an attribute like `async` on your `script` tags, because preloaded JavaScript won't automatically execute after it's loaded -- it's effectively inert until it's needed on your page. So, while the _amount_ of data being loaded by your page won't change, the start-to-end process of it all will go much quicker. This all translates into a better experience for your users, and more of da dolla billz for you. 

You can preload just about anything, but often, the easiest way to see quick wins is to start with your JavaScript files, which are often loaded toward the bottom of the page (to prevent render blocking), but nevertheless essential for your page or application to function. It looks something like this: 

```html
<html>
	<head>
		<link rel="preload" href="https://my-script.js" as="script" />
	</head>
	<body>
		<!-- a bunch o' content -->
		<script src="https://my-script.js"></script>
	</body>
</html>
```

When this page is loaded, the browser first hits `<link rel="preload" ... />`, which indicates that "this resource is really important -- I'm gonna start loading that in the background now so it's ready sooner by the time I need it." And by the time `<script src="" ... />` is discovered, the browser _won't_ have to start that download from scratch. As a result, metrics like time to interactive and overall page load time improve.

## Automate JavaScript Preloading in WordPress

In WordPress, it's easy enough to manually spit out a `link ref="preload"` tag for each file you'd like to preload, but it's kind of a pain to set up if you're managing a site with a lot of different scripts being enqueued by several different plugins, some of which are in the `head`, and others toward the bottom of your page. You want this automated, and you want that automation to be smart about which scripts are chosen to be preloaded. 

So, a solution! **Loop over our footer-enqueued scripts and preload them in the header.** This can be achieved by simply running the following few lines of code in your application. You _could_ drop them in your theme's functions.php file, but don't. Instead, just [make a really simple plugin](https://macarthur.me/posts/creating-the-simplest-wordpress-plugin). It's almost always a better option.

```php
add_action('wp_head', function () {

    global $wp_scripts;

    foreach($wp_scripts->queue as $handle) {
        $script = $wp_scripts->registered[$handle];

        //-- Weird way to check if script is being enqueued in the footer.
        if($script->extra['group'] === 1) {

            //-- If version is set, append to end of source.
            $source = $script->src . ($script->ver ? "?ver={$script->ver}" : "");

            //-- Spit out the tag.
            echo "<link rel='preload' href='{$source}' as='script'/>\n";
        }
    }
}, 1);

```
Here's what's going on: On the `wp_head` hook (which fires after our scripts have been enqueued), we're looping through our registered scripts and printing out a `link` tag in our `head` for each resource that's enqueued in the footer of our page. In the end, every JavaScript file that's loaded toward the bottom of your page will have a `<head>` start (LOL) as the page loads for the user.

Three notes about this setup: 

**1. We're hooking into `wp_head` with an early priority to spit out our `link` tags.** We're choosing this hook because it fires after our scripts have been enqueued, and it allows us to get as close to the top of the page as possible, meaning our stuff can start loading ASAP. The priority of `1` means it'll fire early on -- before most other stuff gets printed in the head. The `wp_print_scripts` or `wp_print_styles` hooks would also work just fine -- it'd just mean we preload things a little farther down on the page. 

**2. We're not preloading scripts enqueued in the header.** This is for two reasons. 

* First, there's little benefit in preloading any files already being loaded in the header. Remember, preloading is great for resources that are important but loaded late in the page. We can start downloading these files while the rest of the page renders and have a head start for when they're explicitly loaded by a `script` tag. You're not getting much of a head start if you preload a file, only to have that file loaded anyway two lines down.

* Second, it's just probably not good practice to preload everything. Depending on network conditions, the number assets your page loads, and other variables, preloading everything and anything could potentially clog a user's bandwidth and negate the benefit we'd get by only preloading the essential, late-discovered assets on our page. This is isn't a hard and fast rule, but [it's what people like Addy Osmani suggest](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf), so I'm on board with it. 

**3. We're making sure the URLs of these assets match _exactly_, including the version.** You'll notice that if a version isn't set on an asset we're looping over, not even the `?` is attached to our source URL, because if the `href` in your `link` tag doesn't match the `src` attribute of your `script` tag, the browser will think these are two different resources, and you'll have gained nothing. 

## Verify It's Working 

Open the source on your page. You should see tags for each one of your footer-enqueued JavaScript files that look like this in your header: 

```html
<link rel='preload' href='https://whatever-source.js?v=123' as='script'/>
```

Now, look for the `script` tag in your footer that loads each respective file, and verify that the sources match exactly. 

```html
<script src='https://whatever-source.js?v=123'></script>
```

Next, if you're using Chrome, go into your developer tools, select the "Network" tab and refresh your page. Filter by JS files only, and you should see something like this: 

![Preloading in WordPress](preloading.jpg)

Each of those files at the top should have a priority of "High" in the order you preloaded them. 

## Measure Your Performance Results!

Obviously, all of this is pointless unless there are measurable performance gains that come out of it. When I was testing a specific WordPress application with a great deal of plugin-enqueued scripts, I saw some pretty encouraging numbers. By nature of the a local development environment, these results varied, but were consistently positive.

Lighthouse Performance Results: 

---

**Overall Score:** 2-5 point improvement 

**First Meaningful Paint:** As high as ~20% improvement 

**First Interactive:** As high as ~15% improvement 

**Perceptual Speed Index:** As high as ~20% improvement 

---

This is for a very specific JavaScript-heavy use case, running on my local machine using Chrome's built-in Lighthouse auditing tool. I did some quick testing with a less script-heavy marketing site, and those improvements fell down to the 3-5% range. Regardless of the actual numbers, it's hard to deny those are some significant improvements. And for such a quick, low-impact win, you'd be a fool to turn those savings down.

Did you see similar improvements? Share your results when you measure them!

## This _Should_ Be Safe, but Test Thoroughly

All this snippet is doing is preloading scripts that are already being loaded on your page. It doesn't rearrange load or execution order, mess with `async` or `defer`, or anything else. So, like leveraging any other resource hints responsibly, it **should** be relatively safe. Even so, be a good developer and test before deploying to production.

Hope this tip leads you to some notable performance gains! As always, shoot any feedback, corrections, or improvements my way!
