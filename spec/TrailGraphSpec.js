describe("TrailGraph", function() {
  var graph = {};
  var tg = new TrailGraph(graph);
  describe('when rendering a graph from trackpoints', function() { 
    it("should be able to accept an array of trackpoints", function() {
      var trackpoints = [];
      trackpoints[0] = {'lat':37.772323, 'lon':-122.214897, 'ele':32.82, 'time': '2011-09-10T22:51:54Z'};
      trackpoints[1] = {'lat':21.291982, 'lon':-157.821856, 'ele':33.82, 'time': '2011-09-10T23:52:23Z'};
      trackpoints[2] = {'lat':-18.142599, 'lon':178.431, 'ele':34.82, 'time': '2011-09-11T00:52:44Z'};
      trackpoints[3] = {'lat':-27.46758, 'lon':153.027892, 'ele':35.82, 'time': '2011-09-11T01:52:44Z'};
      tg.setTrackPoints(trackpoints);
    });

    it("should be able to return time ticks", function() {
        expect(tg.getTimeTicks()).toEqual(['2011-09-10T22:51:54Z', '2011-09-10T23:52:23Z', '2011-09-11T00:52:44Z', '2011-09-11T01:52:44Z']);
    });

    it("should be able to return elevation ticks", function() {
        expect(tg.getElevationTicks()).toEqual([32.82, 33.82, 34.82, 35.82]);
    });

  });
});
