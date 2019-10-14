import chai, { expect } from 'chai';
import sinon from  'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

global.fetch = require('node-fetch');

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album'

describe('Album', () => {
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {

    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(getAlbums).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });

  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL',() => {
      const album = getAlbum('0sNOF9WDwhWunNAHPD3Baj');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj');

      const album2 = getAlbum('0sNOF9WDwhWunNAHPD3Bak');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Bak');
    });

    it('should return the correct data from the promise', () => {
      const album = getAlbum('0sNOF9WDwhWunNAHPD3Bak');
      album.then((data) => {
        expect(data).to.be.eql({ album: 'name'});
      });
    });

  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL',() => {
      const albums = getAlbums(['0sNOF9WDwhWunNAHPD3Baj','0sNOF9WDwhWunNAHPD3Bak']);

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=0sNOF9WDwhWunNAHPD3Baj,0sNOF9WDwhWunNAHPD3Bak');
    });

    it('should return the correct data from the promise', () => {
      const albums = getAlbums(['0sNOF9WDwhWunNAHPD3Baj','0sNOF9WDwhWunNAHPD3Bak']);
      albums.then((data) => {
        expect(data).to.be.eql({ album: 'name'});
      });
    });
  });


  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const album = getAlbumTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL',() => {
      const album = getAlbumTracks('0sNOF9WDwhWunNAHPD3Baj');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj/tracks');

      const album2 = getAlbumTracks('0sNOF9WDwhWunNAHPD3Bak');

      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Bak/tracks');
    });

    it('should return the correct data from the promise', () => {
      const album = getAlbumTracks('0sNOF9WDwhWunNAHPD3Bak');
      album.then((data) => {
        expect(data).to.be.eql({ album: 'name'});
      });
    });

  });

});
