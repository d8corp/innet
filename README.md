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

## Overview

`innet` is designed to simplify and standardize application development with a flexible and modern ecosystem.

It combines the best features from popular libraries and frameworks, offering a familiar yet uniquely powerful experience.

`innet` is a JavaScript ecosystem built around a single function-based core, offering an out-of-the-box solution for a variety of application types:

- [x] API Server
- [x] Website
- [ ] Browser plugin (planned)
- [x] Native application (in work)

### JSX Everywhere

`innet` comes with built-in support for JSX, providing a smooth developer experience for writing components.

You can use JSX not only on the client side but also on the server side.

Check out [@innet/jsx](https://www.npmjs.com/package/@innet/jsx) for more details.

> **JSX works seamlessly on both client and server!**

### Modular Plugin Architecture

`innet`'s functionality is split across modular plugins. Include only what you need:

- Frontend plugins: refs, portals, context, lifecycle, state management
- Server-side plugins: api, components, proxy, async, endpoints
- Shared plugins usable on both sides

> **You can use the same plugins on client and server!**

### Component-Based Approach

`innet` fully supports components as a powerful way to build reusable parts of your application.

> **Same components can be used on server and client!**

Explore the many features below to get started!

[![stars](https://img.shields.io/github/stars/d8corp/innet?style=social)](https://github.com/d8corp/innet/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/innet?style=social)](https://github.com/d8corp/innet/watchers)

## Installation

Using npm:

```bash
npm i innet
```

Using yarn:
```bash
yarn add innet
```

## Getting Started

You can start working with innet using [@innet/dom](https://www.npmjs.com/package/@innet/dom) for frontend apps,
[@innet/server](https://www.npmjs.com/package/@innet/server) for backend apps,
or [@innet/native](https://www.npmjs.com/package/@innet/native) for native mobile development.

The main innet function accepts two required parameters and one optional:
- The first parameter is the application description ("what" to do).
- The second is a handler defining "how" to execute the application.
- The third (optional) parameter sets task priority.

Example usage:

```typescript
import innet from 'innet'

import app from './app' // what to do
import handler from './handler' // how to do it

innet(app, handler)
```

The `app` can be any type, while the `handler` must be a `Handler` object. Create a `handler` using the `createHandler` function:

```typescript
import { createHandler } from 'innet'

export default createHandler([])
```

By default, the handler does nothing until you add plugins to define functionality.

```typescript
const sum = () => ([a, b]) => {
  console.log(a + b)
}
// sum is a plugin

const plugins = [
  sum,
]

const handler = createHandler(plugins)

innet([1, 2], handler) // Outputs: 3
```

### Task Priority

Control the execution priority of innet tasks with the optional third argument. Possible values:
- 0 - add to the start of high priority queue
- 1 - default, add to the end of high priority queue
- 2 - add to the start of low priority queue
- 3 - add to the end of low priority queue

> Runs from the left to the right <br/>
> `[0, ...,  1] > [2, ..., 3]` <br/>
> `^   high   ^   ^   low   ^`

### Plugins

Plugins are functions that run during handler creation and return a `HandlerPlugin`.

Example: a logger plugin
```typescript
import { HandlerPlugin, NEXT, useApp } from 'innet'

function logger(): HandlerPlugin {
  console.log('logger: initialization')

  return () => {
    console.log('logger: app', useApp())

    return NEXT
  }
}
```

`HandlerPlugin` functions have access to two hooks: `useApp` and `useHandler`.

Example of an async plugin to handle promises:
```typescript
import innet, { HandlerPlugin, NEXT, useApp, useHandler } from 'innet'

function async(): HandlerPlugin {
  return () => {
    const app = useApp()

    if (!(app instanceof Promise)) return NEXT

    const handler = useHandler()

    app.then(data => innet(data, handler))
  }
}
```

Try using both plugins together:
```typescript
const app = new Promise(resolve => resolve('test'))

const handler = createHandler([
  logger,
  async,
])
// > 'logger: initialisation'

innet(app, handler)
// > 'logger: app', Promise

await app
// > 'logger: app', 'test'
```

Plugin order matters:
```typescript
const app = new Promise(resolve => resolve('test'))

const handler = createHandler([
  async, // change order
  logger,
])
// > 'logger: initialisation'

innet(app, handler)
// nothing happens

await app
// > 'logger: app', 'test'
```

### Extending a Handler

You can extend handlers using `createHandler` by passing plugins and an existing handler to build on:

```typescript
const handler1 = createHandler([
  async,
  sum,
])

const handler2 = createHandler([
  logger,
], handler1)
```


Explore more general plugins and utilities in [@innet/utils](https://www.npmjs.com/package/@innet/utils)

## Issues & Contributions

If you find bugs or want to suggest features, please open an issue on [GitHub](https://github.com/d8corp/innet/issues).

[![issues](https://img.shields.io/github/issues-raw/d8corp/innet)](https://github.com/d8corp/innet/issues)
