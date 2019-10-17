import chai, { expect } from 'chai';
import sinon from  'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

describe('Search', () => {
  let spotify;
  let fetchedStub;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo'
    });

    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {

    it('should exist the search method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('should exist the searchAlbuns', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('should exist the searchArtists', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('should exist the searchTracks', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('should exist the searchPlaylists', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.artists('Muse');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL',() => {
      const artists1 = spotify.search.artists('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');

      const artists2 = spotify.search.artists('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
    });

  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums('Muse');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL',() => {
      const albums = spotify.search.albums('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');

      const albums2 = spotify.search.albums('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
    });

  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const track = spotify.search.tracks('Muse');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL',() => {
      const track = spotify.search.tracks('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');

      const track2 = spotify.search.tracks('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlist =spotify.search.playlists('Muse');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL',() => {
      const playlist= spotify.search.playlists('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');

      const playlist2 = spotify.search.playlists('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');
    });
  });
});
