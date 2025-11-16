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

The main `innet` function accepts one required parameter and two optional:
- The first parameter is a task represented by a function that will be executed within the task queue.
- The second (optional) parameter sets the task priority, with a default value of 0.
- The third (optional) parameter determines the queue order, where LIFO is used if true; otherwise, FIFO by default.

If innet is executed outside the context of another innet call, the code is executed immediately during the call.

```typescript
import innet from 'innet'

const log: any[] = []

innet(() => log.push(42))
// log: [42]
```

### Task Priority

Control the execution priority of innet tasks with the second and the third optional argument.

- The third argument, when true, switches the order of the queue from the default FIFO to LIFO.
- Lower priority values are executed before higher priority values.
- Tasks with the same priority are ordered based on FIFO or LIFO, depending on the third parameter.

```typescript
import innet from 'innet'

const log: any[] = []

const logger = (value: any) => () => {
  log.push(value)
}

innet(() => {
  innet(logger('Mounted'), 2)
  innet(logger('Mounting'), 1)
  innet(logger('Rendering'), 0)
  innet(logger('WillMount'), 1, true)
})
// log: ['Rendering', 'WillMount', 'Mounting', 'Mounted']
```

In the example, 'Rendering' (priority 0) executes first, followed by 'WillMount' (priority 1, LIFO), then 'Mounting' (priority 1, FIFO), and finally 'Mounted' (priority 2).

> Runs from the left to the right <br/>
> `[true, ...,  false] > [true, ..., false] > ...` <br/>
> `^        0        ^   ^       1        ^`

Explore more general plugins and utilities in [@innet/utils](https://www.npmjs.com/package/@innet/utils)

## Issues & Contributions

If you find bugs or want to suggest features, please open an issue on [GitHub](https://github.com/d8corp/innet/issues).

[![issues](https://img.shields.io/github/issues-raw/d8corp/innet)](https://github.com/d8corp/innet/issues)
