import bluebird from 'bluebird';
import request from 'superagent';

const token = process.env.GITHUB_TOKEN;

function fetchPage(name, page) {
  return request(`https://api.github.com/repos/${name}/stargazers`)
    .set('Authorization', `token ${token}`)
    .set('user-agent', 'script')
    .set('Accept', 'application/vnd.github.v3.star+json')
    .query({ page })
    .then(({ body }) => body.map(x => x.starred_at))
    .catch(async (error) => {
      console.error(error);
      await bluebird.delay(3000);

      return fetchPage(name, page);
    });
}

export default fetchPage;
