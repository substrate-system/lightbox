# Lightbox
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/lightbox/nodejs.yml?style=flat-square)](https://github.com/substrate-system/lightbox/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/lightbox?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/lightbox?cache-control=no-cache)](https://packagephobia.com/result?p=@substrate-system/lightbox)
[![GZip size](https://img.badgesize.io/https%3A%2F%2Fesm.sh%2F%40substrate-system%2Flightbox%2Fes2022%2Ffile.mjs?style=flat-square&compression=gzip)](https://esm.sh/@substrate-system/lightbox/es2022/lightbox.mjs)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)


Lightbox web component.

[See a live demo](https://substrate-system.github.io/lightbox/)

<details><summary><h2>Contents</h2></summary>

<!-- toc -->

- [Install](#install)
- [API](#api)
  * [ESM](#esm)
  * [Common JS](#common-js)
- [CSS](#css)
  * [Import CSS](#import-css)
- [Example](#example)
  * [JS](#js)
  * [HTML](#html)
  * [pre-built](#pre-built)

<!-- tocstop -->

</details>

## Install

```sh
npm i -S @substrate-system/lightbox
```

## API

This exposes ESM and common JS via
[package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM
```js
import '@substrate-system/lightbox'
```

### Common JS
```js
require('@substrate-system/lightbox')
```

## CSS

### Import CSS

```js
import '@substrate-system/lightbox/css'
```

Or minified:
```js
import '@substrate-system/lightbox/min/css'
```

## Example

This calls the global function `customElements.define`. Just import, then use
the tag in your HTML. See [./example](./example/).

### JS

```js
import '@substrate-system/lightbox'
```

### HTML

```html
<light-box>
    <div>
        <img src="./100.jpg" alt="Bullet cat" />
    </div>
    <div>
        <img src="./20190814_102301.jpg" alt="llamas" />
    </div>
    <div>
        <img src="./cinnamon-roll.jpg" alt="Cinnamon roll cat" />
    </div>
    <div>
        <img src="./raccoons.jpg" alt="3 raccoons looking out of a storm drain" />
    </div>
</light-box>
```

## pre-built

This package exposes minified JS and CSS files too. Copy them to a location
that is accessible to your web server, then link to them in HTML.

### copy

```sh
cp ./node_modules/@substrate-system/lightbox/dist/index.min.js ./public/light-box.min.js
cp ./node_modules/@substrate-system/lightbox/dist/style.min.css ./public/light-box.css
```

### HTML

```html
<head>
    <link rel="stylesheet" href="./light-box.css">
</head>
<body>
    <!-- ... -->
    <script type="module" src="./light-box.min.js"></script>
</body>
```

## Test

```sh
npm test
```

### a11y Tests

```sh
npm run test:a11y
```
