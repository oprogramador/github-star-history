import countStars from 'github-stars';
import expect from 'github-stars/tests/expect';

// these tests are skipped because:
// - their execution time is a bit long
// - there's a limit for GitHub API requests per given period of time, even for authenticated users
describe.skip('countStars - integration', () => {
  it('counts stars for visionmedia/debug, 2019-01-01', async () => {
    const result = await countStars('visionmedia/debug', '2019-01-01T00:00:00Z');

    expect(result).to.equal(7054);
  });

  it('counts stars for visionmedia/debug, 2019-07-01', async () => {
    const result = await countStars('visionmedia/debug', '2019-07-01T00:00:00Z');

    expect(result).to.equal(7704);
  });

  it('counts stars for bvaughn/progress-estimator, 2019-01-01', async () => {
    const result = await countStars('bvaughn/progress-estimator', '2019-01-01T00:00:00Z');

    expect(result).to.equal(1555);
  });

  it('counts stars for mafintosh/hypercore, 2019-01-01', async () => {
    const result = await countStars('mafintosh/hypercore', '2019-01-01T00:00:00Z');

    expect(result).to.equal(896);
  });

  it('counts stars for baryon/tracer, 2019-01-01', async () => {
    const result = await countStars('baryon/tracer', '2019-01-01T00:00:00Z');

    expect(result).to.equal(829);
  });
});
