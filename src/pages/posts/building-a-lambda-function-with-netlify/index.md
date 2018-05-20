---
title: Building a Lambda Function with Netlify
date: "2018-02-12"
open_graph: "https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb"
---
 
Some time ago, I wrote my first Lambda function with Firebase. Like every Lambda function tutorial on the web shows you how to do, mine processes a payment via Stripe when someone purchases a license for [TypeIt](https://typeitjs.com), a JavaScript utility for making typewriter effects. The process was pretty straightforward -- Firebase's CLI, documentation, and support are all great. Even so, I had some reservations about the setup.

First off, TypeIt's site is hosted with Netlify, with which I am madly in love, so development of the function felt... detached. I couldn't just keep everything in the same repository, and I had to keep tabs on three different services to make this all happen -- Netlify, Firebase, and Stripe. 

Second, I'm a freaking cheapskate, and at the time, Firebase didn't have a free tier that allowed calls to external services like Stripe. Maybe that's changed, I haven't really followed up on that. 

With all that in mind, I nearly peed myself when I found out I'd been given access to Netlify's new Lambda function service (still in private beta, but you can [request access](https://app.netlify.com/functions-beta)), and I immediately dove into migrating my Firebase function to Netlify.

<aside>
  <p>
UPDATE: It's been <a href="https://www.netlify.com/blog/2018/03/20/netlifys-aws-lambda-functions-bring-the-backend-to-your-frontend-workflow/">officially launched! No more private beta!</a>
  </p>
</aside>

It was so fun, I thought I'd share the experience. I'll quickly (and probably imperfectly) take you through how to leverage some of the features that make Netlify great, in combination with the power of a Lambda function. Hopefully, you'll get a sense of why a service like this with a provider like this is uniquely awesome.

I'll be using some pretty bare bones here, but you can implement the function with any type of static application you want -- Jekyll, Gatsby, whatever. _Just make sure you have a static site you're able to host with Netlify, and that it uses webpack (we'll need its `DefinePlugin`, specifically)._ I'm starting with a package.json, and `index.html` file, some CSS, and JavaScript. You can see the full setup [here](https://github.com/alexmacarthur/netlify-function-example). You'll also need a Stripe account, and access to Netlify Lambda functions (obviously).

Letz do dis.

## Setting Up Our Function

**First, let's create two directories where our function will be developed and deployed.** We'll be storing our pre-built code in `lambda-src`, and building it into `lambda`.

`mkdir lambda lambda-src`

**Next, install the Netlify Lambda CLI in your project.** This will give us the ability to develop & test the function locally, as well as build it for production when we're ready.

`yarn add netlify-lambda --dev`

**Once that's installed, let's set up some actions in our package.json to make our work a little easier.** Aside from the normal webpack configuration stuff you'll need to do, I've created an action to serve our Lambda function as we're developing it locally, as well as a `dev` action to serve our site and function at the same time. Take note of the `concurrently` command, which allows us to run two commands at once. Install that with `yarn add concurrently --dev`.

```json
"scripts": {
  "lambda-serve": "netlify-lambda serve lambda-src",
  "build": "NODE_ENV=production webpack && netlify-lambda build lambda-src",
  "dev": "NODE_ENV=development concurrently \"webpack-dev-server --content-base src/\" \"yarn run lambda-serve\""
}
```

Notice that even though we've created a `lambda` directory to contain our compiled function's code, we're _not_ actually targeting it with any of these commands. Instead, `netlify-lambda` will handle that itself, when it automatically transfers the contents of our target directory (`lambda-src`) to the destination directory we'll define in the next step using a `netlify.toml` file.

**Speaking of, the next important step is creating a `netlify.toml` file,** which will contain the required configuration information for our function's deployment. 

`touch netlify.toml`

[The `netlify.toml` file](https://www.netlify.com/docs/continuous-deployment/#deploy-contexts) is responsible for defining things like build commands, our publish directory, environment variables, and most notably for this post, where our Lambda function directory will be. It's worth noting that you can also set this directory in the admin, but that's a little less cool.

After defining that directory as well as a couple other nice-to-haves, we're left with this, which sits in the root of our project.

```
# netlify.toml 

[build]
  command = "npm run build"
  publish = "src"
  functions = "lambda"
```

Translation: On build, Netlify will build our stuff, serve our site from the `src` directory, and serve our function from the `lambda` directory.

**Next up, let's define some variables we'll need.** Specifically, we're talking Stripe publishable and secret keys, which are 1) pieces of sensitive information we don't want to commit to our repository, and 2) not the same between our development and production environments.

It is possible to define things like this in a `netlify.toml` file, but because of those sensitivity concerns (we _are_ dealing with money), we're going to set these values in Netlify's admin under the "Build & deploy" section. This will prevent us from having to commit them to version control. You can get these keys from your Stripe dashboard. 

![Define Our Environment Variables](environment-variables.jpg)

You'll notice I also threw our `LAMBDA_ENDPOINT` in there too. More on that in a second.

We'll be writing our code to reference these variables the same way despite different environments, but because we won't be able to access these environment variables as they're defined in Netlify when working locally, we'll be using the [dotenv](https://github.com/motdotla/dotenv) package to fill in the gaps (thanks to [Phil Hawksworth](https://www.hawksworx.com/) for that tip!). What it does is pretty simple: when we reference a variable that isn't defined (like when we're working locally), fill it in by referring to a `.env` file we'll have in our project. This file _won't_ be committed to the repository, and will only contain test keys.

Run `yarn add dotenv` to install that package, and create a `.env` file in your project root with variables like below. You can go ahead and fill in those values right away, but ignore the `LAMBDA_ENDPOINT` variable until the next section. Also, add this file to your `.gitignore`.

```
STRIPE_PUBLISHABLE_KEY="XXXXXX"
STRIPE_SECRET_KEY="XXXXXX"
LAMBDA_ENDPOINT="https://netlify-lambda.netlify.com/.netlify/functions/"
```

### Actually Writing Some Lambda Code.

**Create a `purchase.js` file inside `lambda-src`.** When we're ready to post to our function, the name of the file inside of the `lambda` directory will become our endpoint. For us, when running in development mode, this will be `http://localhost:9000/purchase`. After we deploy, it'll look more like `https://your-site-name.netlify.com/.netlify/functions/purchase`. You saw me already set this for each of our enviornments using the `LAMBDA_ENDPOINT` variable in the Netlify admin and our local `.env` file.

Kick off our function's code by initializing `dotenv` and authenticating with Stripe. This will load any variables in our `.env` file into `process.env`, unless those variables are already set. Because of this, code is pretty flexible regardless of our environment.

```js
//-- purchase.js

require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
```

**Now, let's set appropriate headers.** We'll want to make sure we're allowing access to our function via AJAX, and also ensure that we can pass data to our function successfully. For now, I'm just going to open it up to requests from any domain, but you'll want to change that when you deploy. Because I want to later leverage JavaScript's enhanced object literals, I also saved a default status code: 

```js
//-- purchase.js

require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};
```

**Next up, create a Lambda function handler.** This is where the magic happens. Just to make sure things are working as they should, I'm gonna throw in an immediate callback that returns a string in the response body. By the way, if you've built Lambda functions with AWS and this looks vaguely familiar, there's a reason for that. [Netlify deploys your function to AWS](https://functions-beta--www.netlify.com/docs/lambda-functions/).

```js
//-- purchase.js

exports.handler = function(event, context, callback) {
    callback(null, {
      statusCode,
      headers,
      body: 'Let there be light!'
    });
}
```

Now, if we run `yarn run lambda-serve` and head to `localhost:9000/purchase`, we should see 'Let there be light!' in the browser. Good sign! 

**Add a small check to make sure we're only dealing with POST requests.** For the longest time, I was having an issue correctly parsing data from a request, only to discover it was because it wasn't the data from my POST request I was trying to parse -- it was from a preflight OPTIONS request that comes in to ensure the CORS protocol is understood. To prevent this from happening, use this:

```js
//-- purchase.js

exports.handler = function(event, context, callback) {

  //-- We only care to do anything if this is our POST request.
  if(event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: {}
    });
  }
}
```

**Rad. Now we can reliably parse the body and make sure we have everything we need.** If we don't, execute the callback with a message of some sort.

```js
//-- purchase.js

exports.handler = function(event, context, callback) {

  //-- We only care to do anything if this is our POST request.
  if(event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: ''
    });
  }

  //-- Parse the body contents into an object.
  const data = JSON.parse(event.body);

  //-- Make sure we have all required data. Otherwise, escape.
  if(
    !data.token ||
    !data.amount ||
    !data.idempotency_key
  ) {

    console.error('Required information is missing.');

    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({status: 'missing-information'})
    });

    return;
  }
}
```

Let's break this body payload down a bit. 

**token**: This is the unique payment token that will be generated by our checkout form on the front end. In it, the user's email address is also included, which comes in handy to trigger email receipts.  

**amount**: This is the price of the widget, measured in cents. So, 1000 is actually $10.00.

**idempotency_key**: This is a good idea to pass to better [prevent the same operation from being accidentally performed twice](https://stripe.com/docs/api?lang=curl#idempotent_requests). It doesn't necessarily matter what that value actually is, just that it's unique.

**If the body has everything we require, pass it to Stripe to create a charge.** After we get a response back, we're returning the status of that charge back to the browser. Feel free to elaborate on this as you see fit. Create customers, trigger emails following a successful charge, whatever you like. The point is we create a charge and immediately let the browser know if it was successful or not. 

```js
//-- purchase.js

stripe.charges.create(
  {
    currency: 'usd',
    amount: data.amount,
    source: data.token.id,
    receipt_email: data.token.email,
    description: `charge for a widget`
  },
  {
    idempotency_key: data.idempotency_key
  }, (err, charge) => {

    if(err !== null) {
      console.log(err);
    }

    let status = (charge === null || charge.status !== 'succeeded')
      ? 'failed'
      : charge.status;

    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({status})
    });
  }
);
```

## Setting Up the Front End

At this point, we're ready to start work on the front end, which will consist of generating a Stripe token and then posting it via AJAX to our function. To keep it simple, we're going to be using Stripe Checkout to do this. Basically, just drop it in and you're ready to go.

**Add the checkout form script to the bottom of the body in your `index.html` file, and add a button that'll be used to open the checkout form.**

```html
<button>Click to Buy! <strong>$10</strong></button>
```

```js
<script src="https://checkout.stripe.com/checkout.js"></script>
```

**Configure webpack to make our environment variables available on the front end.** Much like we did before, we're gonna initialize `dotenv` so we can access environment variables locally. At the top of our `webpack.config.js` file, let's add this: 

```js
require('dotenv').config();

const webpack = require('webpack');

module.exports = { //-- webpack configuration... }
```

Same as before, we're letting `dotenv` fill in the `process.env` gaps if a particular variable isn't already defined. Below that, we expose those variables to our JavaScript using webpack's `DefinePlugin`.

```js
//-- webpack.config.js

module.exports = {
  entry: './src/scripts.js',
  output: {
    path: __dirname + '/src',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      LAMBDA_ENDPOINT: JSON.stringify(process.env.LAMBDA_ENDPOINT),
      STRIPE_PUBLISHABLE_KEY: JSON.stringify(process.env.STRIPE_PUBLISHABLE_KEY),
    })
  ]
}
```

**Excellent. Now, let's create a Stripe Checkout handler in our scripts.js file, and include that bundled `bundle.js` file at the bottom of `index.html`.** 

```js
//-- script.js

const handler = StripeCheckout.configure({
  key: STRIPE_PUBLISHABLE_KEY,
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  token: (token) => {
    // We'll fill this out in a second.
  }
});
```

**Let's open our checkout from when someone clicks the button.**

```js
//-- scripts.js

//-- Stripe handles pricing in cents, so this is actually $10.00.
const amount = 1000;

document.querySelector('button').addEventListener('click', () => {
  handler.open({
    amount,
    name: 'Test Shop',
    description: 'A Fantastic New Widget'
  });
});
```

At this point, when a user clicks the button on our page, a beautiful Stripe checkout form should pop up, ready to collect that user's payment information. Once that form is submitted, we send that information to our function.

**Send the generated token to our Lambda function using `fetch` (or using whatever you like).** Add this to your `scripts.js` file, right after our token is generated. 

```js
//-- scripts.js

token: (token) => {

    fetch(`${LAMBDA_ENDPOINT}purchase`, {
      method: 'POST',
      body: JSON.stringify({
        token,
        amount,
        idempotency_key: uuid()
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log(response));

}
```

To generate our `idempotency_key`, I'm using the [uuid](https://www.npmjs.com/package/uuid) package. It's really unique (lol). Run `yarn add uuid` and import it at the top of your file.

```js
//-- scripts.js

import uuid from 'uuid/v4';
```

Great, we've thrown a bunch of code together. Now... 

**Let's spin it up locally!** If you recall the actions we set up, using `yarn run dev` will spin up a webpack dev server, as well as trigger `netlify-lambda` to serve our function locally. Run that command now, and our application should be available at `http://localhost:8080`. Click the button, enter your payment information (use `4242424242424242` for the card number in development mode), and you *should* see a successful response in the console. Of course, this is web development we're doing here, where very little goes right the first time, so have some patience as you work out any issues you have standing it up. 

## Time to Deploy!

**Let's get this sucka live.** Put all this into a repository, log into your Netlify account, hook up the tubes, and set your environment variables if you haven't already. Because of our `netlify.toml` file, Netlify should already know from where to serve your function. Once that's done, you should see our `purchase.js` function listed on the 'Functions' page, where logging will be available to view, should you need it. When you're debugging, you can dump logs into this window by using `console.log()`.

## Resources

If you want to dig into this particular example more yourself, check out [the repo on Github](https://github.com/alexmacarthur/netlify-function-example). There, I have a simple working demo that actually submits a fake payment to Stripe.

If you're ready to explore Lambda functions with Netlify yourself, [request access here](https://app.netlify.com/functions-beta). 

<aside>
  <p>
    UPDATE: Again, it's live! No more private beta!
  </p>
</aside>

If you're interested in learning more about how it works and how to configure it, [read the docs here](https://www.netlify.com/docs/functions/).

## Make Sense?

I hope this process was generally easy to follow without a whole lot of frustration. If you do have any questions, corrections, or tips for improving it, reach out!
