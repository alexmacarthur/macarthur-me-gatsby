---
title: Automatically Preloading JavaScript Assets in WordPress
date: "2018-04-05"
open_graph: "https://cdn.pixabay.com/photo/2016/12/04/17/25/wordpress-1882120_1280.png"
---

Squeezing every last drop of performance out of your website on any platform is an always-changing, never-ending, often addictive battle.

Among the several tactics you can (and should) employ in this fight, asset preloading is a hot one right now. [It's a topic worth learning about in more depth yourself](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/), but in short, preloading involves a web page starting to load a particular asset as soon as possible in the background, so it's ready to be used when the page calls for it. Because it's all done background, it won't block anything else from coming in the view. Furthermore, this asset is effectively inert until it's explicitly referenced on the page. If it's completely downloaded before the page calls for it, the script won't execute or block the page's `unload` event, which makes it differ from putting an `async` attribute on a `script` tag. So, while the _amount_ of data being loaded by your page won't change, the start-to-end process of it all will go much quicker. This all translates into a better experience for your users, and more of da dolla billz for you. 

You can preload just about anything, but often, the easiest way to see quick wins is start with your JavaScript files, which are often loaded toward the bottom of the page (to prevent render blocking), but nevertheless essential for your page or application to function. It looks something like this: 

```html
<html>
	<head>
		<link ref="preload" href="https://my-script.js" as="script" />
	</head>
	<body>
		<!-- a bunch o' content -->
		<script src="https://my-script.js" />
	</body>
</html>
```

When this page is loaded, the browser first hits `<link rel="preload" ... />`, which indicates that "this resource is really important -- I'm gonna start loading that in the background now so it's ready sooner by the time I need it." And by the time `<script src="" ... />` is discovered, the browser _won't_ have to start that download from scratch. As a result, metrics like time to interactive and overall page load time benefit. 

## Automatically Preloading Your WordPress JavaScript Files

That's all nice, but it's kind of a pain to set up if you're managing a site with a lot of different scripts being loaded and there's not a way to do it without picking out scripts one by one. If you're running a WordPress application with several different enqueued assets from multiple plugins, this is especially a concern for you. You want this automated, and you want that automation to be smart about which scripts are chosen to be preloaded. 

So, a solution! **Loop over our footer-enqueued scripts and preload them in the header.**

```php
add_action('wp_print_styles', function () {

    global $wp_scripts;

    foreach($wp_scripts->queue as $handle) {
        $script = $wp_scripts->registered[$handle];

        //-- If enqueued in the footer, preload in header...
        if($script->extra['group'] === 1) {

            //-- If version is set, append to end of source.
            $source = $script->src . ($script->ver ? "?ver={$script->ver}" : "");

            //-- Output tag.
            echo "<link rel='preload' href='{$source}' as='script'/>\n";
        }
    }
});

```
Here's what's going on: On the `wp_print_styles` hook (which fires after our scripts have been enqueued), we're looping through our registered scripts and printing out a `link` tag for each resource that's enqueued in the footer of our page. In the end, every JavaScript file that's loaded toward the bottom of your page will be automatically preloaded in your `<head>`. And on every future page load, each of them will have a `<head>` start (I'm clever.) as the page loads for the user. 

Three notes about this setup: 

**We're hooking into `wp_print_styles` to spit out our `link` tags.** Why not `wp_print_scripts`, since we're preloading, you know, scripts? We're choosing this hook because this allows us to get as close to the top of the page as possible, meaning our stuff can start loading as soon as possible.  The `wp_print_scripts` hook would also work just fine -- it'd just mean we preload things a little farther down on the page. 

**We're not preloading scripts enqueued in the header.** This is for two reasons. 

* First, there's little benefit in preloading any files already being loaded in the header. Remember, preloading is great for resources that are important but loaded late in the page. We can start downloading these files while the rest of the page renders and have a head start for when they're explicitly loaded via a `<script />` tag. You're not getting much of a head start if you preload a file, only to have that file loaded anyway two lines down.

* Second, it's just probably not good practice to preload everything. Depending on network conditions, the number assets your page loads, and other variables, preloading everything and anything could potentially clog a user's bandwidth and negate the benefit we'd get by only preloading the essential, late-discovered assets on our page. This is isn't a hard and fast rule, but [it's what people like you Osmani suggest](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf), so I'm on board with it. 

**We're making sure the URLs of these assets match exactly, including the version.** You'll notice that if a version isn't set on an asset we're looping over, not even the `?` is attached to our source URL, because if the `href` in your `link` tag doesn't match the `src` attribute of your `script` tag, the browser will think these are two different resources, and you'll have gained nothing. 

## Verify It's Working 

First off, open put the source on your page. You should see a tags for each one of your footer-enqueued JavaScript files that look like this in your header: 

```html
<link rel='preload' href='https://whatever-source.js' as='script'/>
```

Now, look for the `script` tag in your footer that loads each respective file, and verify that the sources match exactly. 

Next, if you're using Chrome, go into your developer tools, select the "Network" tab and refresh your page. Filter by JS files only, and you should see something like this: 

![Preloading in WordPress](preloading.jpg)

Each of those files at the top should have a priority of "High," in the order you preloaded them. 

## This _Should_ Be Safe, but Test Thoroughly

All this snippet is doing is preloading scripts that are already being loaded on your page. It doesn't rearrange load or execution order, mess with `async` or `defer`, or anything else. So, it **should** be relatively safe. Even so, be a responsible developer and test before deploying to production. 

## Share your performance results!

Obviously, all of this is pointless unless there are measurable performance gains that come out of it. When I was testing a specific WordPress application with a great deal of plugin-enqueued scripts, I saw some pretty encouraging numbers: 

Lighthouse Performance Results: 

---

**Overall Score:** 2-5 point improvement 

**First Meaningful Paint:** ~20% improvement 

**First Interactive:** ~15% improvement 

**Perceptual Speed Index:** ~20% improvement 

---

This is for a very specific use case, running on my local machine using Chrome's built-in Lighthouse auditing tool. It's not out in the wild, but it's _significant_. Were they the same for you? Let me know!

