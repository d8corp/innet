<br>
<p align="center">
  <a href="https://github.com/d8corp/innet">
    <img width="200" height="200" src="https://raw.githubusercontent.com/d8corp/innet/main/logo.svg" alt="innet logo by Mikhail Lysikov">
  </a>
</p>

<h1 align="center">innet</h1>

<p align="center">CANT inc. application build ecosystem.</p>

<div align="center">
  <a href="https://www.npmjs.com/package/innet" target="_blank">
    <img src="https://img.shields.io/npm/v/innet.svg" alt="innet npm">
  </a>
  <a href="https://bundlephobia.com/result?p=innet" target="_blank">
    <img src="https://img.shields.io/bundlephobia/minzip/innet" alt="innet minzipped size">
  </a>
  <a href="https://www.npmtrends.com/innet" target="_blank">
    <img src="https://img.shields.io/npm/dm/innet.svg" alt="innet minzipped size">
  </a>
  <a href="https://github.com/d8corp/innet/blob/master/LICENSE" target="_blank">
    <img src="https://img.shields.io/npm/l/innet" alt="innet license">
  </a>
  <a href="https://changelogs.xyz/innet" target="_blank">
    <img src="https://img.shields.io/badge/Changelog-⋮-brightgreen" alt="innet minzipped size">
  </a>
  <a href="https://d8corp.github.io/innet/coverage/lcov-report" target="_blank">
    <img src="https://github.com/d8corp/innet/actions/workflows/tests.yml/badge.svg" alt="innet test coverage">
  </a>
</div>
<br>

## Abstract
The main mission is simplifying and standardizing application development.

`innet` includes all the best features of famous libraries and frameworks.
`innet` looks like all you've seen but at the same time it's completely different.
`innet` is an ecosystem for JavaScript, but the same time it's just a function.
This is a ready-mode solution, at last, going to be.
`innet` provides you any tools you need to build any JavaScript application:

- Web Site
- API Server
- Browser Plugin
- Native Application

### JSX Everywhere
`JSX` provides the best experience of compositing and here you can take maximum of that.
`innet` includes `JSX` by default.
Check [@innet/jsx](https://www.npmjs.com/package/@innet/jsx) to get more.

> **YOU CAN USE `JSX` ON THE SERVER SIDE!**

### Split By Plugins
Include only that code you need, whole functional split by plugins you can connect.
From `refs`, `portals`, `context`, `life cycle`, `state management` on frontend side
to `router`, `components`, `proxy`, `async`, `html` on server side and more.

> **YOU CAN USE THE SAME PLUGINS ON BOTH SIDES!**

### Components
The component approach is a powerful technology `innet` supports.
You can reuse a piece of an application, and that's awesome.

> **YOU CAN USE THE SAME COMPONENTS ON BOTH SIDES!**

There are a lot of features you can see below, welcome!

[![stars](https://img.shields.io/github/stars/d8corp/innet?style=social)](https://github.com/d8corp/innet/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/innet?style=social)](https://github.com/d8corp/innet/watchers)

## Install
npm
```bash
npm i innet
```
yarn
```bash
yarn add innet
```

Or you can include the script into the `head`.
```html
<!-- Target (innet) -->
<script defer src="https://unpkg.com/innet/innet.min.js"></script>
```

## Usage
> You can start learning of `innet` from [@innet/dom](https://www.npmjs.com/package/@innet/dom), for the front-end side,
> or [@innet/server](https://www.npmjs.com/package/@innet/server) for the back-end.

`innet` is a function which gets 2 arguments.
The first one is an application and the second one is a handler of the application.
Like you can say **what** to do and **how**.
```typescript
import innet from 'innet'

import app from './app' // what to do
import handler from './handler' // how to do

innet(app, handler)
```

`app` can be any type, but `handler` should be a `Handler` instance. You can create the handler with `createHandler` function.
```typescript
import { createHandler } from 'innet'

export default createHandler([])
```

By default, the handler does nothing, but you can set functionality by plugins.

```typescript
const sum = () => ([a, b]) => a + b
// sum is a plugin

const plugins = [
  sum,
]

const handler = createHandler(plugins)

innet([1, 2], handler)
// returns 3
```

### Plugins
A plugin is a function which runs during a handler creation and returns `PluginHandler`.

For example here is a logger plugin
```typescript
import { PluginHandler } from 'innet'

function logger (): PluginHandler {
  console.log('logger: initialisation')
  
  return (app, next) => {
    console.log('logger: app', app)
    
    return next()
  }
}
```

`PluginHandler` is a function with the first argument equals a peace of application,
the second is a next plugin runner and the last one is a handler.

As another example, let's look at a plugin of `async` which allows promises handling.
```typescript
import innet, { PluginHandler } from 'innet'

function async (): PluginHandler {
  return (app, next, handler) => {
    if (app instanceof Promise) {
      // if the application is a promise then we wait for the promise and handle it's result
      return app.then(data => innet(data, handler))
    }

    // if not then run next plugins
    return next()
  }
}
```

Let's try those plugins
```typescript
const app = new Promise(resolve => resolve('test'))

const handler = createHandler([
  logger,
  async,
])
// > 'logger: initialisation'

const result = innet(app, handler)
// > 'logger: app', Promise

await result
// > 'logger: app', 'test'
```

More plugins [here](https://www.npmjs.com/search?q=%40innet)

### Extend a handler
You can extend a handler with `createHandler`,
just provide to the second argument it.

```typescript
const handler1 = createHandler([
  async,
  sum,
])

const handler2 = createHandler([
  logger,
], handler1)
```

Check out [@innet/utils](https://www.npmjs.com/package/@innet/utils), there you can find the most general plugins and utils.

## Issues
If you find a bug or have a suggestion, please file an issue on [GitHub](https://github.com/d8corp/innet/issues).

[![issues](https://img.shields.io/github/issues-raw/d8corp/innet)](https://github.com/d8corp/innet/issues)
