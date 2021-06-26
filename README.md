<br>
<p align="center">
  <a href="https://github.com/d8corp/innet">
    <img width="200" height="200" src="https://raw.githubusercontent.com/d8corp/innet/main/logo.svg" alt="innet logo by Mikhail Lysikov">
  </a>
</p>

<h1 align="center">innet</h1>

<p align="center">CANT inc. web application builder.</p>

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

**innet** is a library for web application building with no virtual DOM rendering,
that gives more performance and less RAM using.

This is a light library, use it even on small projects.
But the same time this is a powerful library,
many modern features are available to use like:
component approach, state management, context, fragment, portals, etc.

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

Or you can include the scripts into the `head`.
```html
<!-- Dependencies (watchState) -->
<script defer src="https://unpkg.com/watch-state/watch-state.min.js"></script>

<!-- Target (innet) -->
<script defer src="https://unpkg.com/innet/innet.min.js"></script>
```

## Framework
[innet](#) is a **library**.  
You can include it into any project and start using without rocket science.

[innetjs](https://www.npmjs.com/package/innetjs) is a **framework**.  
Run the next commands, and get all you need to develop with
`Hot Reload`, `SCSS Modules`, `TypesScript`, `JSX`, `Jest`, `Proxy` and other features.
```bash
npx innet my-app
cd my-app
npm start
```
*change `my-app` to your application name*

You can learn more [here](https://www.npmjs.com/package/innetjs).
## Hello, World!
When you use `init` command of [innetjs](https://www.npmjs.com/package/innetjs), you get "Hello, World" example.
If you don't, create `index.html` with the next content.
```html
<!doctype html>
<html>
  <head>
    <script defer src="https://unpkg.com/watch-state/watch-state.min.js"></script>
    <script defer src="https://unpkg.com/innet/innet.min.js"></script>
    <script defer src="index.js"></script>
  </head>
  <body>
  </body>
</html>
```
Put `index.js` near the `index.html` and add the next content:
```javascript
innet('Hello, World!')
```

That's it. Open the HTML file in your browser to see "Hello, World!".

## Parent
`innet` works with `body` by default. If you want to use another parent, put it to the second argument.

`index.html`
```html
<!doctype html>
<html>
  <head>
    <script defer src="https://unpkg.com/watch-state/watch-state.min.js"></script>
    <script defer src="https://unpkg.com/innet/innet.min.js"></script>
    <script defer src="index.js"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
`index.js`
```javascript
innet('Hello, World!', document.getElementById('app'))
```
## Content
`Content` is the first argument of `innet` function.  
Above, in the "Hello World!" example, you've seen `string` as `Content`.

You can put to the first argument: 
### Number
Any type of numbers can be used.
```typescript
innet(42)
```
*`NaN` shows as is*
### Array of Content
Array is like Document Fragment, you can make a content without root element.
```typescript
innet(['Hello ', 42])
```
*array of array of another one, it doesn't matter*
### HTML Element
You can provide an HTML Element as a content. It works in any piece of the application.
```typescript
const div = document.createElement('div')
div.innerText = 'Hello, World!'

innet(div)
```
*You can combine `Content` as you wish `innet([div]), innet([42, div])`*
### JSX Element
You can rewrite above example this way:
```typescript
innet({
  type: 'div',
  children: ['Hello, World!']
})
```
> `JSX Element` is an object with 3 optional fields (`type`, `props` and `children`).

`children` equals an array of `Content` everytime.

*If `JSX Element` does not contain `type` field, the `children` will be used as `Content`.*
```javascript
innet({children: ['Hello', 42]})

// the same

innet(['Hello', 42])
```
`props` equals an object.
You can provide `props` to add attributes to `HTML Element`.
```typescript
innet({
  type: 'button',
  props: {
    id: 'clickMe',
    onclick () {
      alert('Hello, World!')
    }
  },
  children: ['Click Me']
})
```
You will get.
```html
<button id="clickMe">Click Me</button>
```
If you click on the button, you get "Hello, World" popup message.
> Any prop which starts from `on` will be set as a method of the `HTML Element`
>
> `<div onclick={onclick} />`  
> means   
> `div.onclick = onclick`
>
> ---
>
> If a prop does not start with `_` or `$` then the value be set as an attribute  
> 
> `<div id='clickMe' />`  
> means  
> `element.setAttribute('id', 'clickMe')`
>
> ---
>
> If a prop starts with `_` then the value be set as a field of HTML element, for example you can set className by `_className` prop
> 
> `<div _className='test' />`  
> means  
> `div.className = 'test'`
>
> ---
>
> If a prop starts with `$` then it should be set as an attribute and a field, the same time.
>
> `<input $value='test' />`  
> means   
> `input.value = 'test'`  
> `input.setAttribute('value', 'test')`

*this rules related to `HTML JSX Elements` only*.

`type` can be a string that equals an element tag as you've seen earlier.

`type` can be a `Template`, a `Component` or a `string` from `plugins`.

### Template
Template is a function that should return Content.
```typescript jsx
function Page () {
  return 'Hello, World!'
}

innet({type: Page})
```

Template gets **props** in the first argument as is.
```typescript jsx
function Sum ({a, b}) {
  return `${a} + ${b} = ${a + b}`
}

innet({
  type: Sum,
  props: {a: 1, b: 2}
})
```
The second argument of template is **children**.

```typescript jsx
function Panel (props, children) {
  return {
    type: 'div',
    props: {...props, class: 'panel'},
    children
  }
}

innet({
  type: Panel,
  props: {id: 'myPanel'},
  children: ['Hello, World!']
})
```
You will get.
```html
<div id="myPanel" class="panel">
  Hello, World!
</div>
```

### Component
Component is a `class` which has `render` method, the method should return `Content`.
```javascript
class MyComponent {
  render () {
    return 'Hello, World!'
  }
}

innet({type: MyComponent})
```
You can get `props` and `children` from arguments of the method.
```javascript
class Panel {
  render (props, children) {
    return {
      type: 'div',
      props: {...props, class: 'panel'},
      children
    }
  }
}
```
Also, `Component` gets `props` and `children` in `constructor` method.
```javascript
class Component {
  constructor (props, children) {
    this.props = props
    this.children = children
  }
}

class MyComponent extends Component {
  render () {
    console.log(this.props)
    return this.children
  }
}
```

## State Management
`innet` uses [watch-state](https://www.npmjs.com/package/watch-state) for the state management.
`watch-state` was specially developed for `innet`.

For the minified files:
```javascript
const {State} = watchState
// or watchState.State
```
With the boilerplate:
```javascript
import {State} from 'watch-state'
// const {State} = require('watch-state')
```

### Props Watcher
Use a function as a props watcher.
```javascript
const show = new State(true)

innet({
  type: 'button',
  props: {
    class () {
      return show.value ? 'show' : 'hide'
    },
    onclick () {
      show.value = !show.value
    }
  },
  children: ['Click Me']
})
```

### Content Watcher
Use a function as a `Content`.
```javascript
const show = new State(true)

innet({
  type: 'button',
  props: {
    onclick () {
      show.value = !show.value
    }
  },
  children: [
    () => show.value ? 'hide' : 'show'
  ]
})
```
You can use `State` inside or outside `Template`.
```javascript
function Test () {
  const loading = new State(true)
  setTimeout(() => loading.value = false, 1000)

  return {
    type: 'div',
    children: [
      () => loading.value ? 'Loading...' : 'Done'
    ]
  }
}

innet({type: Test})
```
Also, with `Component`.
```javascript
class Test {
  loading = new State(true)

  render () {
    setTimeout(() => this.loading.value = false, 1000)

    return {
      type: 'div',
      children: [
        () => this.loading.value ? 'Loading...' : 'Done'
      ]
    }
  }
}
```
`Template` and `Component` can return a function as a `Content Watcher`.
```javascript
function Test (props, children) {
  const loading = new State(true)

  setTimeout(() => loading.value = false, 1000)

  return () => loading.value ? 'Loading...' : children
}
```

## Context
You can pass a value from a parent element through any children to the place you need.

Vanilla:
```javascript
const {Context} = innet
```
Node:
```javascript
import {Context} from 'innet'
```
The first and the last argument of `Context` constructor is a default value.
```javascript
const color = new Context('red')

color.value // red
```

An instance of `Context` has a method `provide`, the method returns `Content`.
The first argument of the method is a value of the context, and the second is children.
```javascript
function Theme (props, children) {
  return color.provide(props.color, children)
}

function Color () {
  return color.value
}

innet({
  type: Theme,
  props: {
    color: 'blue'
  },
  children: [
    'Color is ',
    {type: Color},
    {type: 'br'}
  ]
})

innet([
  'Color is ',
  {type: Color}
])
```

## Life Cycle
Each `Template` and `Component` renders only once. They have 3 steps of life cycle:
- **render** (DOM elements are not created)
- **mounted** (DOM elements are created)
- **destructor** (elements will be removed from the DOM)

`Component` can have **mounted** and **destructor** methods.
```javascript
const show = new State(true)

class Test {
  mounted () {
    console.log(document.getElementById('test'))
  }
  destructor () {
    console.log('destructor')
  }
  render () {
    return {
      type: 'button',
      props: {
        id: 'test',
        onclick () {
          show.value = false
        }
      },
      children: ['click me']
    }
  }
}

innet(() => show.value ? {type: Test} : undefined)
```

## Ref
You can get an `HTML Element` from `JSX Element` by `ref` prop and `Ref` class from `innet`.
```javascript
const button = new Ref()

innet({
  type: 'button',
  props: {
    ref: button
  }
})

console.log(button.value)
```
One `Ref` equals one `HTML Element`. You can create `Ref` inside `Template` or `Component`.
```javascript
function Test () {
  const ref = new Ref()
  
  onMounted(() => {
    console.log(ref.value)
  })

  return {
    type: 'div',
    props: {ref}
  }
}
```
## Typescript
`innet` has developed on `TypeScript`.  
`TypeScript` helps to predict a bug, for example, you cannot use a class without render method as a Component.
```typescript
class Test {}

inne({type: Test})
// Property 'render' is missing in type 'Test'
```
To predict this on creation step, you can use `Component` interface.
```typescript
import {Component} from 'innet'

class Test implements Component {
  render () {
    // Property 'render' in type 'Test' is not assignable to the same property in base type
    // means you should return a Content
  }
}
```
The same with `Template`.
```typescript
import {Template} from 'innet'

const Test: Template = () => 'test'
```
You can use generic of `Ref`.
```typescript
const button = new Ref<HTMLButtonElement>()
```
Use generic of `Context`.
```typescript
const color = new Context<string|number>('red')
```
## JSX
You can comfortably create `JSX Elements` with `JSX`.
```typescript jsx
const button = (
  <button
    id='clickMe'
    onclick={() => alert('Hello, World!')}>
    Click Me
  </button>
)
```
The same to:
```javascript
const button = {
  type: 'button',
  props: {
    id: 'clickMe',
    onclick () {
      alert('Hello, World!')
    }
  },
  children: [
    'Click Me'
  ]
}
```
To use jsx with TypeScript just change `tsconfig.json` options:
```json
{
  ...,
  "jsx": "react",
  "jsxFactory": "innet.create",
  "jsxFragmentFactory": "undefined"
}
```
and import `innet` when you use JSX.
## New Way of JSX
The old way converts JSX to JS like React does. When you open `JSXElement` you run a function from a library.
```typescript jsx
(<div id='hello'>Hello</div>);

// converts to

(innet.create('div', {id: 'hello'}, 'Hello'));
```
With new way it transpile to an object.
```typescript jsx
(<div id='hello'>Hello</div>);

// converts to

({type: 'div', props: {id: 'hello'}, children: ['Hello']});
```
To get it use [innetjs](https://www.npmjs.com/package/innetjs) framework.

Also, you can use [Rollup](https://www.npmjs.com/package/rollup) with [rollup-plugin-innet-jsx](https://www.npmjs.com/package/rollup-plugin-innet-jsx).  
If you use `TypeScript` setup `jsx` option of `tsconfig.json` to `preserve`.
## Decorators
You can use `state`, `cache`, `event` and other decorators from [@watch-state/decorators](https://www.npmjs.com/package/@watch-state/decorators).
```typescript jsx
import {state} from '@watch-state/decorators'

class App {
  @state name = 'World'

  render () {
    return (
      <>
        <h1>
          Hello{() => this.name ? `, ${this.name}` : ''}!
        </h1>
        <input
          oninput={e => this.name = e.target.value}
          placeholder='Enter your name'
        />
      </>
    )
  }
}
```
You can use the decorators outside of `Component` or `Template`.
```typescript jsx
class AppState {
  @state name = 'World'
}
// const state = new AppState()
// here

function App () {
  // or here
  const state = new AppState()
  
  return (
    <>
      <h1>
        Hello{() => state.name ? ` ${state.name}` : ''}!
      </h1>
      <input
        oninput={e => state.name = e.target.value}
        placeholder='Enter your name'
      />
    </>
  )
}
```
## Code Splitting
You can create a logic of `Component`.
```typescript jsx
class User {
  @state name
  @state surname

  @cache get fullName () {
    return `${this.surname} ${this.name[0]}.`
  }

  constructor ({name, surname}) {
    this.name = name
    this.surname = surname
  }
}
```
Then you can extend the logic to create a component.
```typescript jsx
class Profile extends User {
  render () {
    return (
      <>
        <h2>Hello {() => this.fullName}!</h2>
        <div>
          Name:
          <input
            value={() => this.name}
            oninput={e => this.name = e.target.value}
          />
        </div>
        <div>
          Surname:
          <input
            value={() => this.surname}
            oninput={e => this.surname = e.target.value}
          />
        </div>
      </>
    )
  }
}

innet(<Profile name='Mike' surname='Deight' />)
```
Or just use as a field.
```typescript
class Profile {
  constructor (props) {
    this.user = new User(props)
  }
  render () {...}
}
```
So you can split logic and view to different files and reuse them.
## Plugins
You can extend new features by plugins. You need to provide an object of plugins to the third argument of `innet`.
```javascript
import innet from 'innet'
import portal from '@innet/portal'

const div = document.createElement('div')

innet((
  <div>
    test1
    <portal parent={div}>
      test2
    </portal>
  </div>
), undefined, {portal})

console.log(div.innerHTML)
```
A key of the object is a JSX Element type string you will use.
```javascript
innet((
  <div>
    test1
    <port parent={div}>
      test2
    </port>
  </div>
), undefined, {port: portal})
```
You can find more plugins [here](https://www.npmjs.com/search?q=%40innet).

## Performance
I prepared a small benchmark, this is an app with 10 000 buttons that calculate clicks.
You can find this in the [folder](https://github.com/d8corp/innet/tree/main/docs) and check by self.
#### [React](https://d8corp.github.io/innet/react/)
[![react](https://d8corp.github.io/innet/results/react.png)](https://d8corp.github.io/innet/react/)
#### [Vue](https://d8corp.github.io/innet/vue/)
[![vue](https://d8corp.github.io/innet/results/vue.png)](https://d8corp.github.io/innet/vue/)
#### [Svelte](https://d8corp.github.io/innet/svelte/)
[![svelte](https://d8corp.github.io/innet/results/svelte.png)](https://d8corp.github.io/innet/svelte/)
#### [innet](https://d8corp.github.io/innet/innet/)
[![innet](https://d8corp.github.io/innet/results/innet.png)](https://d8corp.github.io/innet/innet/)

## Best Practices
Use [@innet/for](https://github.com/d8corp/innet-for) plugin to render arrays or any iterable object.
```typescript jsx
import innet from 'innet'
import fp from '@innet/for'

const names = new Set(['Mike', 'Michael'])

innet((
  <for of={names}>
    {name => (
      <div>
        name: {name}
      </div>
    )}
  </for>
), undefined, {for: fp})
```

## Issues
Now we have Document Fragment dissolution issue (so you can find comments in the DOM).

If you find a bug or have a suggestion, please file an issue on [GitHub](https://github.com/d8corp/innet/issues).

[![issues](https://img.shields.io/github/issues-raw/d8corp/innet)](https://github.com/d8corp/innet/issues)
