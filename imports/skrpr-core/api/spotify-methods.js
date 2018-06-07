import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: Meteor.settings.spotify.apiKey,
  secret: Meteor.settings.spotify.secret
});

  Meteor.methods({
    /*
    * Search
    * Get Spotify catalog information about artists, albums, tracks or playlists that match a keyword string.
    * SAMPLE CALL: Meteor.call('getList', {keyword: "jay z", type: "track"}, function(e, r) {console.log(e); console.log(r)})
    */
    getList(data){
      var path = "q=" + data.keyword + "&type=" + data.type; //Valid types are: album, artist, playlist, and track.
      var url = Meteor.settings.spotify.url + '/search?' + path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Track
    * Get Spotify catalog information for a single track identified by its unique Spotify ID.
    */
    getTrackById(data){
      var path = data.id;
      var url = Meteor.settings.spotify.url + '/tracks/' + path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Get a detailed audio analysis for a single track identified by its unique Spotify ID.
    */
    getAudioAnalysisById(data){
      var path = data.id;
      var url = Meteor.settings.spotify.url + '/audio-analysis/' + path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Get audio feature information for a single track identified by its unique Spotify ID.
    */
    getAudioFeaturesById(data){
      var path = data.id;
      var url = Meteor.settings.spotify.url + '/audio-features/' + path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Get audio features for multiple tracks based on their Spotify IDs.
    */
    getAudioFeaturesByMultipleIds(data){
      var path = data.id;
      var url = Meteor.settings.spotify.url + '/audio-features/?ids=' + path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);

    },

    /*
    * Get Spotify catalog information for a single album.
    */
    getAlbumsById(data) {
      const findItem = {};
      var path = data.type + '/' + data.id;
      var url = Meteor.settings.spotify.url + '/' + path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Get Spotify catalog information for a single album.
    */
    getAlbumsById(data) {
      const findItem = {};
      var path = data.type + '/' + data.id;
      var url = Meteor.settings.spotify.url + '/' + path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Get Spotify catalog information about an album’s tracks.
    * Optional parameters can be used to limit the number of tracks returned.
    */
    getAlbumsIdTracks(data) {
      const findItem = {};
      var path = data.type + '/' + data.id + '/tracks';
      var url = Meteor.settings.spotify.url + '/' + path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Get Spotify catalog information for a single album.
    */
    getArtistsById(data) {
      const findItem = {};
      var path = data.type + '/' + data.id;
      var url = Meteor.settings.spotify.url + '/' + path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Get Spotify catalog information about an artist’s albums.
    * Optional parameters can be specified in the query string to filter and sort the response.
    */
    getAlbumsIdTracks(data) {
      const findItem = {};
      var path = data.type + '/' + data.id + '/albums';
      var url = Meteor.settings.spotify.url + '/' + path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Get Spotify catalog information about an artist’s top tracks.
    */
    getArtistsByIdTopTracks(data) {
      const findItem = {};
      var path = data.type + '/' + data.id;
      var url = Meteor.settings.spotify.url + '/' + path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Get Spotify catalog information about artists similar to a given artist.
    * Similarity is based on analysis of the Spotify community’s
    */
    getArtistsByIdRelatedArtists(data) {
      const findItem = {};
      var path = data.type + '/' + data.id + '/related-artists';
      var url = Meteor.settings.spotify.url + '/' + path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Browse
    * Get a list of Spotify featured playlists
    */
    getFeaturedPlaylists(data){
      var url = Meteor.settings.spotify.url + '/browse/featured-playlists'

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Get a list of new album releases featured in Spotify
    */
    getNewReleases(){
      var url = Meteor.settings.spotify.url + '/browse/new-releases'

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Get a list of categories used to tag items in Spotify
    */
    getCategories(){
      var url = Meteor.settings.spotify.url + '/browse/categories'

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Get a single category used to tag items in Spotify
    */
    getCategoryById(data){
      var url = Meteor.settings.spotify.url + '/browse/categories/'+data.id

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    * Get a list of Spotify playlists tagged with a particular category.
    */
    getCategoryByPlaylists(data){
      var path = data.id + "/playlists"
      var url = Meteor.settings.spotify.url + '/browse/categories/'+path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    },

    /*
    *
    */
    getRecommendations(){
      var url = Meteor.settings.spotify.url + '/recommendations' + path

      var spotifySync = Meteor.wrapAsync(spotifyAsync);
      return spotifySync(url);
    }
  })

/*
*
*/
var spotifyAsync = function(url, cb) {
  try {
    spotify.request(url)
      .then(function (data) {
        cb && cb(null, data);
      })
      .catch(function (err) {
        console.error('Error occurred: ' + err);
        cb && cb(new Meteor.Error(500, 'There was an error processing your request. (spotifyAsync)', err));
      });
  } catch (e) {

  }
}
