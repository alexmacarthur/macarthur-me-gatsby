---
title: Building a Lambda Function with Netlify
date: "2018-02-12"
---
 
A few weeks ago, I wrote my first Lambda function with Firebase. Like every Lambda function tutorial on the web shows you how to do, my function processes a payment via Stripe when someone purchases a license for [TypeIt](https://typeitjs.com), the most versatile animated typing utility on the planet. The process was pretty straightforward -- Firebase's CLI, documentation, and support are all amazing. Even so, I had some reservations about the setup.

First off, TypeIt's site is hosted with Netlify, which I l-o-v-e, so development of the function felt detached. I couldn't just keep everything in the same repository, little conveniences like shared environment variables were out of the question, and I had to keep tabs on three different accounts to make this all happen -- Netlify, Firebase, and Stripe. 

Second, I'm a freaking cheapskate, and Firebase doesn't have a free tier that allows calls to external services like Stripe. 

With all that in mind, I nearly peed myself when I found out I'd been given access to Netlify's new Lambda function service (still in private beta, but you can [request access](https://app.netlify.com/functions-beta)), and I immediately dove into migrating my Firebase function to Netlify. 

It was so fun, I thought I'd share the experience. Hopefully, you'll get a sense of why Netlify Lambda functions are uniquely awesome, as we'll get to leverage some of the features that make Netlify great, in combination with the power of a Lambda function. 

I'll be using some pretty bare bones here, but you can implement the function with any type of static application you want -- Jekyll, Gatsby, whatever. _Just make sure you have some sort of static site you're able to host with Netlify, and that it uses webpack (we'll need its `DefinePlugin`, specifically)._ I'm starting with a package.json, and `index.html` file, some CSS, and JavaScript. You can see the setup [here](https://github.com/alexmacarthur/netlify-function-example). You'll also need a Stripe account, and access to Netlify Lambda functions (obviously).

Letz do dis.

## Creating Our Function

**First, let's create some essential directories where our function will be developed and deployed.**

`mkdir lambda lambda-src`

We'll be storing our pre-built code in `lambda-src`, and building it into `lambda`. More on why we set it up this way later. 

**Next, install the Netlify Lambda CLI in your project.** This will give us the ability to develop & test the function locally, ~~as well as build it for production when we're ready~~. Turns out, there's little need to use `netlify-lambda`'s build command locally because Netlify does that automatically on deployment.

`yarn add netlify-lambda --dev`

**Once that's installed, let's set up some actions in our package.json to make our work a little easier.** Aside from the normal webpack configuration stuff you'll need to do, I've created an action to serve our Lambda function as we're developing it locally, as well as a `dev` action to serve our site and function at the same time. Take note of the `concurrently` command, which allows us to run two commands at once. Install that with `yarn add concurrently --dev`.

```json
  "scripts": {
    "lambda-serve": "cp lambda-src/purchase.js lambda/purchase.js && netlify-lambda serve lambda",
    "build": "NODE_ENV=production webpack",
    "dev": "NODE_ENV=development concurrently \"webpack-dev-server --content-base src/\" \"yarn run lambda-serve\""
  }
```

Also, notice that in our `lambda-serve` action, I'm copying the function source from `lambda-src` to `lambda`. This is because when we run our local dev server, the contents of `lambda` will be built and overwritten. So, we want to keep our pre-built code in a separate directory for safekeeping. This is important.

**Next up, let's create our `netlify.toml` file,** which will contain all the configuration information for our Netlify deployment. 

`touch netlify.toml`

[The `netlify.toml` file](https://www.netlify.com/docs/continuous-deployment/#deploy-contexts) is responsible for defining things like build commands, our publish directory, environment variables, and most notably for this post, where our Lambda functions directory will be. It's worth noting that you can set up all these things in the admin as well, but that's significantly less cool.

Let's go ahead and define that information now. Again, feel free to glance at the repository for better context.  

```
# netlify.toml 

[build]
  command = "npm run build"
  publish = "src"
  functions = "lambda"

[context.base.environment]
  LAMBDA_ENDPOINT = "http://localhost:9000/"
  STRIPE_PUBLISHABLE_KEY = "pk_test_QNJ7Z7GtqgKm7xPp7WkkG5uM"
  STRIPE_SECRET_KEY = "sk_test_2USIa69ZqEGr9YkaUo4JsNGN"

[context.branch-deploy.environment]
  LAMBDA_ENDPOINT = "netlify-lambda"
  STRIPE_PUBLISHABLE_KEY = "pk_test_CmgAzI4lJOsVX3ls4n6g1bDy"
  STRIPE_SECRET_KEY = "sk_test_2USIa69ZqEGr9YkaUo4JsNGN"

[context.deploy-preview.environment]
  # your variables...

[context.production.environment]
  # your production variables...
```

I wanna call out a special trick here that'll help us develop locally later on. The lines that look like `context.[SOMETHING].environment` are how we define variables for each Netlify environment. And as Node builds out our site  when we deploy, each of these variables is available using `process.env.VAR_NAME` in whatever Node is triggering via JavaScript. There's just one problem: as we develop on our local machine, those variables aren't  accessible because Netlify isn't triggering the build -- we are. We usually just need to bite the bullet and duplicate variable values where we need them, and only reference them in `netify.toml` when they're in Netlify's hands. 

NOT THIS TIME. As a way around this, I've added a 'context.base.enviromnent` section that we'll parse manually (using a .toml parser) and access when we're developing locally, or if the other variables aren't available. Think of it as a set of fallback variable values. This will all be done when webpack builds our code, so they'll be easily accessible right within our JavaScript, without having to deploy first. More on this magic later. For now, feel free to drop in Stripe publishable and secret keys that'll you want to use per environment. You can find these keys in your [Stripe dashboard](https://dashboard.stripe.com/).

### Neat. Now, let's write some Lambda code.

**Create a `purchase.js` file inside `lambda-src`.** When we're ready to post to our function, the name of the file inside of the `lambda` directory will become our endpoint. For us, when running in development mode, this will be `http://localhost:9000/purchase`. After we deploy, it'll look more like `https://your-site-name.netlify.com/.netlify/functions/purchase`. We already have these values in our `netlify.toml` as `LAMBDA_ENDPOINT`.

**Parse the environment variables from our `netlify.toml` and set up Stripe.** This is where that `context.base.environment` stuff starts.

Run `yarn add toml --dev`. This package will allow us to turn .toml contents into a JavaScript object. After that, parse it and save it to a `config` variable.  

```js
const fs = require("fs");
const toml = require('toml');
const config = toml.parse(fs.readFileSync('netlify.toml'));
```

Now, we need to use that config data, but _only if_ those respective environment variables aren't already available from `process.env`, which will be the case when we deploy.

```js
//-- purchase.js

const fs = require("fs");
const toml = require('toml');
const config = toml.parse(fs.readFileSync('netlify.toml'));

const SECRET_KEY = process.env.STRIPE_SECRET_KEY !== undefined
  ? process.env.STRIPE_SECRET_KEY
  : config.context.base.environment.STRIPE_SECRET_KEY;

const stripe = require('stripe')(SECRET_KEY);
```

Good job. You're locally parsing a `netlify.toml` file -- no need to locally hard code variables, and you can access still access the right values during a Netlify deployment!

**Now, let's set appropriate headers.** We'll want to make sure we're allowing access to our function via AJAX, as well as that we can pass data to our function successfully. For now, I'm just gonna open it up to requests from any domain, but you'll want to change that to your specific domain when you deploy. Because I want to later leverage JavaScript's enhanced object literals, I also saved a default status code: 

```js
//-- purchase.js

const stripe = require('stripe')(SECRET_KEY);

const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};
```

**Next up, create a Lambda function handler.** This is where the magic happens. Just to make sure things are working as they should, I'm gonna throw in an immediate callback that returns a string in the response body. By the way, if you've built Lambda functions with AWS and this looks vaguely familiar, there's a reason for that. [Netlify deploys your function to AWS](https://functions-beta--www.netlify.com/docs/lambda-functions/).

```js
//-- purchase.js

  "Access-Control-Allow-Headers": "Content-Type"
};

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

*token* - This is the unique payment token that will be generated by our checkout form on the front end. In it, the user's email address is also included, which comes in handy to trigger email receipts.  
*amount* - This is the price of the widget, measured in cents. So, 1000 is actually $10.00.
*idempotency_key* - This is a good idea to pass to better [prevent the same operation from being performed twice accidentally](https://stripe.com/docs/api?lang=curl#idempotent_requests). We're dealing with money here. If this happens, people gonna be mad. It doesn't necessarily matter what that value actually is, just that it's unique.

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

## Setting up the Front End

At this point, we're ready to start work on the front end, which will consist of generating a Stripe token and then posting it via AJAX to our function. To keep it simple, we're going to be using Stripe Checkout to do this. Basically just drop it in and you're ready to go.

**Add the checkout form script to the bottom of the body in your `index.html` file, and add a button that'll be used to open the checkout form.**

```html
<button>Click to Buy! <strong>$10</strong></button>
```

```js
<script src="https://checkout.stripe.com/checkout.js"></script>
```

**Configure webpack to make our environment variables available on the front end.** Much like we did before, we're gonna parse our `netlify.toml` file so we can access environment variables locally. In our `webpack.config.js` file, let's add this: 

```js
const webpack = require('webpack');
const fs = require("fs");
const toml = require('toml');
const config = toml.parse(fs.readFileSync('./netlify.toml'));

const LAMBDA_ENDPOINT = process.env.LAMBDA_ENDPOINT !== undefined
  ? process.env.LAMBDA_ENDPOINT
  : config.context.base.environment.LAMBDA_ENDPOINT;
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY !== undefined
  ? process.env.STRIPE_PUBLISHABLE_KEY
  : config.context.base.environment.STRIPE_PUBLISHABLE_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY !== undefined
  ? process.env.STRIPE_SECRET_KEY
  : config.context.base.environment.STRIPE_SECRET_KEY;
```

In a sentence, when webpack builds, we're setting variables based on if they're available through `process.env`. If they're not (meaning, we're building locally), pull them from our parsed `netlify.toml` file. Below that, we expose those variables to our JavaScript using webpack's `DefinePlugin`.

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
      LAMBDA_ENDPOINT: JSON.stringify(LAMBDA_ENDPOINT),
      STRIPE_PUBLISHABLE_KEY: JSON.stringify(STRIPE_PUBLISHABLE_KEY),
      STRIPE_SECRET_KEY: JSON.stringify(STRIPE_SECRET_KEY)
    })
  ]
}
```

**Excellent. Now, let's create a Stripe Checkout handler in our scripts.js file, and include that bundled `bundle.js` file at the bottom of `index.html`. ** 

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

// Stripe handles pricing in cents, so this is actually $10.00.
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

To generate our `idempotency_key`, I'm using the [uuid](https://www.npmjs.com/package/uuid) package. It's really unique (lol). Run `yarn add uuid` and include it at the top of your file.

```js
//-- scripts.js

import uuid from 'uuid/v4';
```

Great, we've thrown a bunch of code together. Now... 

**Let's spin it up locally!** If you recall the actions we set up, using `yarn run dev` will spin up a webpack dev server, as well as trigger `netlify-lambda` to serve our function locally for testing. Run that command now, and our application should be available at `http://localhost:8080`. Click the button, enter your payment information (use 4242424242424242 for the card number in dev mode), and you *should* see a successful response in the console. Of course, this is web development we're doing here, where nothing goes right the first time, so have some patience as you work out any issues you have spinning it up. 

## Time to Deploy!

**Let's get this sucka live.** Put all this into a repo, log into your account, and hook a new Netlify site up to your repository. Because of our `netlify.toml` file, a lot of the configuration should already be set to go. Once that's done, you should see our `purchase.js` function listed on the 'Functions' page, where logging will be available to view, should you need it.

## Resources

If you want to check into this particular example more yourself, check out [the repo on Github](https://github.com/alexmacarthur/netlify-function-example).

If you're ready to explore Lambda functions with Netlify yourself, [request access here](https://app.netlify.com/functions-beta).

If you're interested in learning more about how it works and how to configure it, [read the docs here](https://functions-beta--www.netlify.com/docs/lambda-functions/).

## Make Sense? 

I hope this process was generally easy to follow without a whole lot of frustration. If you do have any questions, corrections, or tips for improving it, reach out!
