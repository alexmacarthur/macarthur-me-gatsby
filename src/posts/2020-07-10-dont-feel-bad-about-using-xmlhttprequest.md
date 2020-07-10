---
title: Don't Feel Bad About Using XMLHttpRequest
open_graph: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=100"
---

A while back, I was working with a small JavaScript library responsible for sending a POST request with some data to an endpoint. At the time, it used [axios](https://github.com/axios/axios) to make that request, and I wanted to simplify things by shedding a dependency. The obvious alternative was `fetch` -- modern, native, and ergonomic.

But in this case, the following bits of context made me wonder if the obvious choice was the _best_ choice:

* The package would be distributed amongst several teams.
* The package had a simple, single responsibility.
* The package needed to work for users on IE11.

## Where Fetch Held Me Up

The `fetch` API is a welcomed upgrade to making HTTP requests in JavaScript, but in order to leverage it here, I'd need to rely on two different polyfills: the `fetch` API itself, and the Promise object. And that would mean putting more of a burden on other teams and users that could otherwise be avoided. Things like:

* Asking other teams to set up additional dependencies, which would involve vetting which polyfills to use (there are many), and ensuring none are already being loaded. 
* Requiring that most users download polyfills they'll never need ([~94%+ are on browsers](https://caniuse.com/#feat=fetch) that support `fetch`).

For my simple needs, this just felt like too much.

## Making Prehistoric HTTP Requests

Then, I thought back to what our ancestors used to do such things: `XMLHttpRequest`. The O.G. of HTTP requests in JavaScript. I've heard rumors of this thing. The verbosity. The callback chaos. The insanity it's left in its wake.

Despite that reputation, I went for it. And as it turned out, for performing simple requests, most of those rumors were overblown. After the switch, my implementation went from something like this:

```js
try  {
    let response = await axios.post('http://localhost:4000', {
        name: 'Alex'
    }, {
        headers: { 
            'x-api-key': 'my-api-key'
        }
    });

    console.log(response.data);
} catch (e) {
    console.log('axios fail!');
}
```

To something more like this:

```js
const xhr = new XMLHttpRequest();
xhr.open('POST', "http://localhost:4000");
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('x-api-key', 'my-api-key');

xhr.onload = function () {
    if (this.status >= 200 && this.status < 400) {
        console.log(JSON.parse(this.responseText));
    } else {
        console.log('xml fail');
    }
};

xhr.send(JSON.stringify({ name: 'Alex' }));
```

That roughly the same amount of code for the exact same functionality.

## Why XMLHttpRequest Made Sense

Given all that aforementioned context, a few key perks surfaced as a result of switching to `XMLHttpRequest`.

### 1. Less code shipped.

Being so old-school in terms of making HTTP requests, [browser support](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Browser_compatibility) isn't even remotely a concern. By using it, I can avoid loading those aforementioned polyfills still required to use `fetch` in IE, saving me about ~4kb of bundled code (if you'd otherwise use these two pretty good polyfills I found):

|Polyfill|Size (minified)|Size (minified + gzipped)|
|---|---|---|
|[Promise Polyfill](https://bundlephobia.com/result?p=promise-polyfill@8.1.3)|2.9kb|1.1kb|
|[Fetch Polyfill](https://bundlephobia.com/result?p=unfetch@4.1.0)|1kb|554b|

Those savings aren't monumental, but they shouldn't be scoffed at either, especially considering the not-a-lot-work of work on my part, and the fact that those savings will be multipled throughout several different projects.

### 2. Simpler distribution.

Being polyfill-free, I don't need to ask consumers to deal with extra dependencies at all. No vetting process, no added documentation. Just grab the library & go.

### 3. Less risky implementation.

When pulling in the package, teams don't need to take extra care in making sure they're not potentially double-loading polyfills they might already using, and they don't need to work through any unexpected issues caused by introducing new global dependencies. Any risk in implementing the library is limited to the package code itself.

## Objections

Despite these good things, there are some common objections I've seen come up a few times: 

### 1. We should lean into writing modern JavaScript!

Not if that means doing so _for the sake of writing modern JavaScript_. If "modern" code introduces complexity unnecessarily, and if the alternative isn't _that_ much work, there's no shame in going old-school. There's a balance that needs to be found with every project, and more often than not, the "new" might win. But those not-so-modern solutions shouldn't be immediately dismissed _exclusively_ because there's a flashier (or just easier) option out there. Think through the implications, and make a pick no matter when the specification came out.

### 2. Isn't XMLHttpRequest deprecated?

No, just part of it is. The [ability to make synchronous HTTP requests](https://xhr.spec.whatwg.org/#synchronous-flag) is in the process of being removed from the platform due to the horrid performance issues that come along with it. But the core API itself isn't going anywhere, and even offers advantages `fetch`, like [being able to track progress](https://xhr.spec.whatwg.org/#interface-progressevent) on file uploads.

So no, by using `XMLHttpRequest`, you're not piling on tech debt you'll need to clean up a couple years from now. In fact, the move might actually set you up for _less_ work in the future, since you'd otherwise be removing polyfills when they're no longer needed. That doesn't amount to a lot of work saved, but it's `> 0`.

### 3. But that API is disgusting!

Admittedly, it is. That's why I'm leaving heavy emphasis on it being best for _simple_ requests. The instant the scope of a package goes beyond that, or as soon as you drop IE as a supported browser, `fetch`(or something else) might be a better way to go. Until then, at the very least, play with it for a while instead of dismissing it based off water cooler dev chatter. You'll likely discover (like I did) that it's not nearly as bad as people make it out to be.

### 4. I really like working with the Promise API!

Me too! But thankfully, it's easy enough to wrap an `XMLHttpRequest` implementation in a Promise and enjoy that nice interface. And this way, you still have to deal with one less polyfill than if you had gone with something like `fetch`. 

```js
const fire = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', "http://localhost:4000");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-api-key', 'my-api-key');

    return new Promise((resolve, reject) => {
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                return resolve(JSON.parse(this.responseText));
            } else {
                return reject('xml fail');
            }
        };

        xhr.send(JSON.stringify({ name: 'Alex' }));
    });
}
```

```js
(async () => {
    let result;

    try {
        result = await fire();
        console.log(result);
    } catch(e) {
        console.error(e);
    }
})();
```

## New Might Not Be Best

It's easy to get excited about advancements web APIs like `fetch`. But if we're not careful, it's just as easy to become nearly dogmatic about using newer technologies exclusively because they're new. So, as you wade these confusing, tumultuous waters, try as well as you can to keep the full scope your circumstances in mind -- the users, the needs, the environment, everything. More often than not, the best tool for the job might be the one that's been around for decades. 
