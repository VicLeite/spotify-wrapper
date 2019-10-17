import chai, { expect } from 'chai';
import sinon from  'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

describe('SpotifyWrapper Library', () => {
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  it('should create an instance of SpotifyWrapper', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceOf(SpotifyWrapper);
  });

  it('should recive apiURL as an option', () => {
    let spotify = new SpotifyWrapper({
      apiURL: 'bla'
    });
    expect(spotify.apiURL).to.be.equal('bla');
  });

  it('should use the default apiURL as an optionif not provided', () => {
    let spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should recive token as an option', () => {
    let spotify = new SpotifyWrapper({
      token: 'bla'
    });
    expect(spotify.token).to.be.equal('bla');
  });

  describe('request method', () => {

    it('should have request method', () => {
      let spotify = new SpotifyWrapper({});

      expect(spotify.request).to.exist;
    });

    it('should call fetch when request', () =>{
      let spotify = new SpotifyWrapper({
        token: 'foo'
      });
      spotify.request('url');

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL',() => {
      let spotify = new SpotifyWrapper({
        token: 'foo'
      });

      spotify.request('url');

      expect(fetchedStub).to.have.been.calledWith('url');
    });

    it('should call fetch with the correct headers passed',() => {
      let spotify = new SpotifyWrapper({
        token: 'foo'
      });

      const headers = {
        headers: {
        Authorization: `'Bearer foo'`,
        },
      };

      spotify.request('url');
      expect(fetchedStub).to.have.been.calledWith('url', headers);
    });
  });
});
