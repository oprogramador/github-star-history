import _ from 'lodash';

async function countStars(name, date, fetchPage) {
  const pageSize = (await fetchPage(name, 1)).length;
  let offset = 1;
  let currentPage = 1;
  let offsetMultiplicator = 2;
  let page;
  while (true) {
    page = await fetchPage(name, currentPage);
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
    fetchPage(name, currentPage - 1),
    fetchPage(name, currentPage),
    fetchPage(name, currentPage + 1),
  ]);
  console.log('edgePages', edgePages);

  return Math.max(0, currentPage - 2) * pageSize + _.flatten(edgePages).filter(d => d < date).length;
}

export default countStars;
