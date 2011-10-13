describe("RenderMap", function() {
  var mockGMap = {};
  var mapRenderer = new RenderMap(mockGMap);
  console.log(mapRenderer); 
  it("should be able to convert an array of trackpoints into google latlng", function() {
    gps_data = [];
    gps_data[0] = {'lat':37.772323, 'lon':-122.214897, 'ele':32.822265625, 'time': '2011-09-10T22:51:54Z'}
    gps_data[1] = {'lat':21.291982, 'lon':-157.821856, 'ele':32.822265625, 'time': '2011-09-10T22:52:23Z'}
    gps_data[2] = {'lat':-18.142599, 'lon':178.431, 'ele':32.822265625, 'time': '2011-09-10T22:52:44Z'}
    gps_data[3] = {'lat':-27.46758, 'lon':153.027892, 'ele':32.822265625, 'time': '2011-09-10T22:52:44Z'}

    var expected_output = [
        new google.maps.LatLng(37.772323, -122.214897),
        new google.maps.LatLng(21.291982, -157.821856),
        new google.maps.LatLng(-18.142599, 178.431),
        new google.maps.LatLng(-27.46758, 153.027892)
    ];
    expect(mapRenderer.getLatLng(gps_data)).toEqual(expected_output);
  });
  
  it("should be able to return the center google latlng give the minmax trackpoints", function() {
       var minmax = {'maxlat':37.772323, 'minlat':-27.46758, 'maxlon':178.431, 'minlon':-157.821856};
       var expected_output = new google.maps.LatLng((minmax['maxlat']+minmax['minlat'])/2, (minmax['maxlon']+minmax['minlon'])/2);
        expect(mapRenderer.getCenterLatLng(minmax)).toEqual(expected_output);
  });
  /*
  describe("when song has been paused", function() {
    beforeEach(function() {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function() {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function() {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function() {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      player.play(song);

      expect(function() {
        player.resume();
      }).toThrow("song is already playing");
    });
  });*/
});
