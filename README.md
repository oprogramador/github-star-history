# github-star-history

[![MIT License](https://img.shields.io/badge/license-mit-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.com/oprogramador/github-star-history.svg?branch=master)](https://travis-ci.com/oprogramador/github-star-history
)

[![NPM status](https://nodei.co/npm/github-star-history.png?downloads=true&stars=true)](https://npmjs.org/package/github-star-history
)

## install
`npm i --save github-star-history` or `yarn add github-star-history`

## usage
Export your GitHub token as `GITHUB_TOKEN` env.
```js
import countStars from 'github-star-history';
// or:
// const countStars = require('github-star-history').default;

const result = await countStars('visionmedia/debug', '2019-01-01T00:00:00Z');
expect(result).to.equal(7054);
```

## notes
- Due to GitHub API limits, if the past number of stars exceeds 39990, it returns 39990.
- The returned past number of stars can change if a user unstars a given repo because GitHub API returns only the current stargazers.
