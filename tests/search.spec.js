import chai, { expect } from 'chai';
import sinon from  'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists} from '../src/search';

describe('Search', () => {
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbuns', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fecth with the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Muse', 'artist');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');

        const albums = search('Muse', 'album');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');

      });

      context('passing more than one type', () => {
        const artitsAndAlbums = search('Muse', ['artist', 'album']);

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist,album');
      });
    });

    it('should return the JSON data from the promise', () => {
      const artists = search('Muse', 'artist');
      artists.then((data) => {
        expect(data).to.be.eql({ album: 'name'});
      });
    });

  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Muse');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL',() => {
      const artists1 = searchArtists('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');

      const artists2 = searchArtists('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
    });

  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Muse');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL',() => {
      const albums = searchAlbums('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');

      const albums2 = searchAlbums('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
    });

  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const track =searchTracks('Muse');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL',() => {
      const track = searchTracks('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');

      const track2 = searchTracks('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlist =searchPlaylists('Muse');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL',() => {
      const playlist= searchPlaylists('Muse');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');

      const playlist2 = searchPlaylists('Incubus');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');
    });
  });
});
