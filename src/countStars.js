import _ from 'lodash';

const cache = new Map();

const fetchPageWithCache = async (name, page, fetchPage) => {
  if (page === 0) {
    return [];
  }
  const key = JSON.stringify({ name, page });
  if (cache.get(key)) {
    return cache.get(key);
  }
  const value = await fetchPage(name, page);
  cache.set(key, value);

  return value;
};

const clearCache = () => {
  cache.clear();
};

async function countStars(name, date, fetchPage) {
  let pageSize = null;
  let offset = 1;
  let currentPage = 1;
  let offsetMultiplicator = 2;
  let page;
  while (true) {
    page = await fetchPageWithCache(name, currentPage, fetchPage);
    if (pageSize === null) {
      pageSize = page.length;
    }
    const isAfter = !page.length || _.last(page) > date;
    const newDirection = isAfter ? -1 : 1;
    const currentDirection = Math.abs(offset) / offset;
    offsetMultiplicator = offsetMultiplicator > 1 && !isAfter ? 2 : 0.5;
    offset *= offsetMultiplicator;
    offset *= newDirection * currentDirection;
    if (Math.abs(offset) <= 1) {
      break;
    }
    currentPage += offset;
    console.log({
      currentDirection,
      currentPage,
      date,
      isAfter,
      last: _.last(page),
      length: page.length,
      newDirection,
      offset,
      offsetMultiplicator,
    });
  }
  const edgePages = await Promise.all([
    fetchPageWithCache(name, currentPage - 1, fetchPage),
    fetchPageWithCache(name, currentPage, fetchPage),
    fetchPageWithCache(name, currentPage + 1, fetchPage),
  ]);
  console.log('edgePages', edgePages);

  return Math.max(0, currentPage - 2) * pageSize + _.flatten(edgePages).filter(d => d < date).length;
}

export default countStars;

export {
  clearCache,
};
