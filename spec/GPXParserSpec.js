describe("GPXParser", function() {
  var parser = new GPXParser();
  var xml = false;
    
  it("should be able to accept an xml representation of a gpxfile", function() {
    $.get('data/gpx_test2.xml', null, function(data) {
	                            xml = data;
				    });
    waitsFor(function(){return xml}, "not set in 500 mils", 500);
    runs(function(){
      parser.setXmlDoc(xml);
      expect(parser.xmlDoc).toEqual(xml);
    });
  });
  
  it("should be able to return an array of trackpoints", function() {
    var expected_output = [];
    expected_output[0] = {'lat':37.772323, 'lon':-122.214897, 'ele':32.822265625, 'time': '2011-09-10T22:51:54Z', 'dist':0};
    expected_output[1] = {'lat':21.291982, 'lon':-157.821856, 'ele':32.822265625, 'time': '2011-09-10T22:52:23Z', 'dist':3868.8553161459868};
    expected_output[2] = {'lat':-18.142599, 'lon':178.431, 'ele':32.822265625, 'time': '2011-09-10T22:52:44Z', 'dist':8959.64447317187};
    expected_output[3] = {'lat':-27.46758, 'lon':153.027892, 'ele':32.822265625, 'time': '2011-09-10T22:52:44Z', 'dist':11755.246547969808};

    expect(parser.getTrackPoints()).toEqual(expected_output);
  });
  
  it("should be able to return  the max min lat lon", function() {
    
     var expected_output = {'maxlat':37.772323, 'minlat':-27.46758, 'maxlon':178.431, 'minlon':-157.821856};
     //expected_output = {'maxlat': 37.772323, 'minlat': -27.46758, 'maxlon': 153.027892 ,'minlon': -157.8218:52:44Z};
     expect(parser.getMinMaxTrackPoints()).toEqual(expected_output);
  });
 
  /**
   * lat="5.480051748454571" lon="100.252688638865948"
   * lat="5.407569408416748" lon="100.332577228546143"
   * distance 11.96km
   * */
  it("should be able to calculate the distance between 2 lat lons", function() {
     var lat1 = "5.480051748454571"; 
     var lon1 = "100.252688638865948";
     var lat2 = "5.407569408416748";
     var lon2 = "100.332577228546143";

     //expected_output = {'maxlat': 37.772323, 'minlat': -27.46758, 'maxlon': 153.027892 ,'minlon': -157.8218:52:44Z};
     expect(parser.getDistance(lat1, lon1, lat2, lon2)).toEqual(11.964922550832927);
  });

 /*describe("when song has been paused", function() {
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
