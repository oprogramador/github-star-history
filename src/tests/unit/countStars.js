import countStars, { clearCache } from 'github-stars/countStars';
import expect from 'github-stars/tests/expect';
import sinon from 'sinon';

describe('countStars', () => {
  beforeEach(() => {
    clearCache();
  });

  it('counts stars if it equals 0', async () => {
    const fetchPage = sinon.stub().resolves([]);
    fetchPage.withArgs('repo', 1).resolves([
      '2018-12-01T00:00:00Z',
      '2018-12-15T00:00:00Z',
      '2019-01-01T00:00:00Z',
      '2019-01-02T00:00:00Z',
      '2019-01-03T00:00:00Z',
    ]);

    const result = await countStars('repo', '2018-01-01', fetchPage);

    expect(result).to.equal(0);
    expect(fetchPage.callCount).to.be.at.most(2);
  });

  it('counts stars for a single page', async () => {
    const fetchPage = sinon.stub().resolves([]);
    fetchPage.withArgs('repo', 1).resolves([
      '2018-12-01T00:00:00Z',
      '2018-12-15T00:00:00Z',
      '2019-01-01T00:00:00Z',
      '2019-01-02T00:00:00Z',
      '2019-01-03T00:00:00Z',
    ]);

    const result = await countStars('repo', '2019-01-01', fetchPage);

    expect(result).to.equal(2);
    expect(fetchPage.callCount).to.be.at.most(2);
  });

  it('counts stars for an entire page minus 1', async () => {
    const fetchPage = sinon.stub().resolves([]);
    fetchPage.withArgs('repo', 1).resolves([
      '2018-12-01T00:00:00Z',
      '2018-12-15T00:00:00Z',
      '2019-01-01T00:00:00Z',
      '2019-01-02T00:00:00Z',
      '2019-01-05T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 2).resolves([
      '2019-01-08T00:00:00Z',
      '2019-01-09T00:00:00Z',
      '2019-01-12T00:00:00Z',
      '2019-02-02T00:00:00Z',
      '2019-02-05T00:00:00Z',
    ]);

    const result = await countStars('repo', '2019-01-04', fetchPage);

    expect(result).to.equal(4);
    expect(fetchPage.callCount).to.be.at.most(3);
  });

  it('counts stars for an entire page plus 1', async () => {
    const fetchPage = sinon.stub().resolves([]);
    fetchPage.withArgs('repo', 1).resolves([
      '2018-12-01T00:00:00Z',
      '2018-12-15T00:00:00Z',
      '2019-01-01T00:00:00Z',
      '2019-01-02T00:00:00Z',
      '2019-01-03T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 2).resolves([
      '2019-01-08T00:00:00Z',
      '2019-01-11T00:00:00Z',
      '2019-01-12T00:00:00Z',
      '2019-02-02T00:00:00Z',
      '2019-02-05T00:00:00Z',
    ]);

    const result = await countStars('repo', '2019-01-09', fetchPage);

    expect(result).to.equal(6);
    expect(fetchPage.callCount).to.be.at.most(4);
  });

  it('counts stars for an entire page', async () => {
    const fetchPage = sinon.stub().resolves([]);
    fetchPage.withArgs('repo', 1).resolves([
      '2018-12-01T00:00:00Z',
      '2018-12-15T00:00:00Z',
      '2019-01-01T00:00:00Z',
      '2019-01-02T00:00:00Z',
      '2019-01-03T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 2).resolves([
      '2019-01-08T00:00:00Z',
      '2019-01-09T00:00:00Z',
      '2019-01-12T00:00:00Z',
      '2019-02-02T00:00:00Z',
      '2019-02-05T00:00:00Z',
    ]);

    const result = await countStars('repo', '2019-01-05', fetchPage);

    expect(result).to.equal(5);
    expect(fetchPage.callCount).to.be.at.most(4);
  });

  it('counts stars for two pages', async () => {
    const fetchPage = sinon.stub().resolves([]);
    fetchPage.withArgs('repo', 1).resolves([
      '2018-12-01T00:00:00Z',
      '2018-12-15T00:00:00Z',
      '2019-01-01T00:00:00Z',
      '2019-01-02T00:00:00Z',
      '2019-01-03T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 2).resolves([
      '2019-01-08T00:00:00Z',
      '2019-01-09T00:00:00Z',
      '2019-01-12T00:00:00Z',
      '2019-02-02T00:00:00Z',
      '2019-02-05T00:00:00Z',
    ]);

    const result = await countStars('repo', '2019-02-01', fetchPage);

    expect(result).to.equal(8);
    expect(fetchPage.callCount).to.be.at.most(4);
  });

  it('counts stars for three pages', async () => {
    const fetchPage = sinon.stub().resolves([]);
    fetchPage.withArgs('repo', 1).resolves([
      '2018-12-01T00:00:00Z',
      '2018-12-15T00:00:00Z',
      '2019-01-01T00:00:00Z',
      '2019-01-02T00:00:00Z',
      '2019-01-03T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 2).resolves([
      '2019-01-08T00:00:00Z',
      '2019-01-09T00:00:00Z',
      '2019-01-12T00:00:00Z',
      '2019-02-02T00:00:00Z',
      '2019-02-05T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 3).resolves([
      '2019-03-05T00:00:00Z',
      '2019-03-06T00:00:00Z',
      '2019-03-07T00:00:00Z',
      '2019-03-10T00:00:00Z',
      '2019-03-15T00:00:00Z',
    ]);

    const result = await countStars('repo', '2019-03-09', fetchPage);

    expect(result).to.equal(13);
    expect(fetchPage.callCount).to.be.at.most(4);
  });

  it('counts stars for two pages plus one page after date', async () => {
    const fetchPage = sinon.stub().resolves([]);
    fetchPage.withArgs('repo', 1).resolves([
      '2018-12-01T00:00:00Z',
      '2018-12-15T00:00:00Z',
      '2019-01-01T00:00:00Z',
      '2019-01-02T00:00:00Z',
      '2019-01-03T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 2).resolves([
      '2019-01-08T00:00:00Z',
      '2019-01-09T00:00:00Z',
      '2019-01-12T00:00:00Z',
      '2019-02-02T00:00:00Z',
      '2019-02-05T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 3).resolves([
      '2019-03-05T00:00:00Z',
      '2019-03-06T00:00:00Z',
      '2019-03-07T00:00:00Z',
      '2019-03-10T00:00:00Z',
      '2019-03-15T00:00:00Z',
    ]);

    const result = await countStars('repo', '2019-02-01', fetchPage);

    expect(result).to.equal(8);
    expect(fetchPage.callCount).to.be.at.most(4);
  });

  it('counts stars for 10 pages', async () => {
    const fetchPage = sinon.stub().resolves([]);
    fetchPage.withArgs('repo', 1).resolves([
      '2018-12-01T00:00:00Z',
      '2018-12-15T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 2).resolves([
      '2019-01-08T00:00:00Z',
      '2019-01-09T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 3).resolves([
      '2019-03-05T00:00:00Z',
      '2019-03-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 4).resolves([
      '2019-04-05T00:00:00Z',
      '2019-04-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 5).resolves([
      '2019-05-05T00:00:00Z',
      '2019-05-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 6).resolves([
      '2019-06-05T00:00:00Z',
      '2019-06-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 7).resolves([
      '2019-07-05T00:00:00Z',
      '2019-07-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 8).resolves([
      '2019-08-05T00:00:00Z',
      '2019-08-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 9).resolves([
      '2019-09-05T00:00:00Z',
      '2019-09-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 10).resolves([
      '2019-10-05T00:00:00Z',
      '2019-10-08T00:00:00Z',
    ]);

    const result = await countStars('repo', '2019-10-06', fetchPage);

    expect(result).to.equal(19);
    expect(fetchPage.callCount).to.be.at.most(8);
  });

  it('counts stars for 30 pages', async () => {
    const fetchPage = sinon.stub().resolves([]);
    fetchPage.withArgs('repo', 1).resolves([
      '2017-01-08T00:00:00Z',
      '2017-01-09T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 2).resolves([
      '2017-02-08T00:00:00Z',
      '2017-02-09T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 3).resolves([
      '2017-03-05T00:00:00Z',
      '2017-03-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 4).resolves([
      '2017-04-05T00:00:00Z',
      '2017-04-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 5).resolves([
      '2017-05-05T00:00:00Z',
      '2017-05-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 6).resolves([
      '2017-06-05T00:00:00Z',
      '2017-06-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 7).resolves([
      '2017-07-05T00:00:00Z',
      '2017-07-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 8).resolves([
      '2017-08-05T00:00:00Z',
      '2017-08-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 9).resolves([
      '2017-09-05T00:00:00Z',
      '2017-09-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 10).resolves([
      '2017-10-05T00:00:00Z',
      '2017-10-08T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 11).resolves([
      '2018-01-08T00:00:00Z',
      '2018-01-09T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 12).resolves([
      '2018-02-08T00:00:00Z',
      '2018-02-09T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 13).resolves([
      '2018-03-05T00:00:00Z',
      '2018-03-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 14).resolves([
      '2018-04-05T00:00:00Z',
      '2018-04-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 15).resolves([
      '2018-05-05T00:00:00Z',
      '2018-05-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 16).resolves([
      '2018-06-05T00:00:00Z',
      '2018-06-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 17).resolves([
      '2018-07-05T00:00:00Z',
      '2018-07-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 18).resolves([
      '2018-08-05T00:00:00Z',
      '2018-08-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 19).resolves([
      '2018-09-05T00:00:00Z',
      '2018-09-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 20).resolves([
      '2018-10-05T00:00:00Z',
      '2018-10-08T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 21).resolves([
      '2019-01-08T00:00:00Z',
      '2019-01-09T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 22).resolves([
      '2019-02-08T00:00:00Z',
      '2019-02-09T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 23).resolves([
      '2019-03-05T00:00:00Z',
      '2019-03-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 24).resolves([
      '2019-04-05T00:00:00Z',
      '2019-04-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 25).resolves([
      '2019-05-05T00:00:00Z',
      '2019-05-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 26).resolves([
      '2019-06-05T00:00:00Z',
      '2019-06-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 27).resolves([
      '2019-07-05T00:00:00Z',
      '2019-07-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 28).resolves([
      '2019-08-05T00:00:00Z',
      '2019-08-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 29).resolves([
      '2019-09-05T00:00:00Z',
      '2019-09-06T00:00:00Z',
    ]);
    fetchPage.withArgs('repo', 30).resolves([
      '2019-10-05T00:00:00Z',
      '2019-10-08T00:00:00Z',
    ]);

    const result = await countStars('repo', '2019-10-06', fetchPage);

    expect(result).to.equal(59);
    expect(fetchPage.callCount).to.be.at.most(10);
  });
});
