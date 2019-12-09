# github-star-history

[![MIT License](https://img.shields.io/badge/license-mit-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/oprogramador/github-star-history.svg?branch=master)](https://travis-ci.org/oprogramador/github-star-history
)

[![NPM status](https://nodei.co/npm/github-star-history.png?downloads=true&stars=true)](https://npmjs.org/package/github-star-history
)

## install
`npm i --save github-star-history` or `yarn add github-star-history`

## usage
```js
import countStars from 'github-star-history';
// or:
// const countStars = require('github-star-history').default;

const result = await countStars('visionmedia/debug', '2019-01-01T00:00:00Z');
expect(result).to.equal(7054);
```
