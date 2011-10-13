function GPXParser()
{
	this.trackpoints = [];
	this.minmax = {'maxlat':null, 'minlat':null, 'maxlon':null, 'minlon':null};
}

GPXParser.prototype.setXmlDoc = function(xmlDoc)
{
	this.xmlDoc = xmlDoc;
	this.parse();
}

GPXParser.prototype.getTrackPoints = function()
{
	return this.trackpoints;
}

GPXParser.prototype.getMinMaxTrackPoints = function()
{
	return this.minmax;
}

GPXParser.prototype.toRad = function(degree)
{
	return degree * Math.PI / 180;
}	


GPXParser.prototype.getDistance = function(startLat, startLon, endLat, endLon)
{
	var R = 6371; // km
	var dLat = this.toRad((endLat-startLat));
	var dLon = this.toRad((endLon-startLon));
	var startLat = this.toRad(startLat);
	var endLat = this.toRad(endLat)

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(startLat) * Math.cos(endLat); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}


GPXParser.prototype.parse = function()
{
	var xml = $(this.xmlDoc);
	var that = this;
	var last_trackpoint = null;
	xml.find('trk trkseg trkpt').each(function($i, $t) {
		$t = $($t);
		var trackpoint = {'lat': parseFloat($t.attr('lat'), 10),
			 'lon': parseFloat($t.attr('lon'), 10),
			 'time': $t.find('time').text(),
			 'ele': parseFloat($t.find('ele').text(), 10)}
		if (that.minmax['maxlat'] == null || that.minmax['maxlat'] < trackpoint['lat']) {
		    that.minmax['maxlat'] = trackpoint['lat'];
		}
		if (that.minmax['maxlon'] == null || that.minmax['maxlon'] < trackpoint['lon']) {
		    that.minmax['maxlon'] = trackpoint['lon'];
		}
		if (that.minmax['minlat'] == null || that.minmax['minlat'] > trackpoint['lat']) {
		    that.minmax['minlat'] = trackpoint['lat'];
		}
		if (that.minmax['minlon'] == null || that.minmax['minlon'] > trackpoint['lon']) {
		    that.minmax['minlon'] = trackpoint['lon'];
		}
		if(last_trackpoint == null) {
			trackpoint['dist'] = 0;
		} else {
			trackpoint['dist'] = last_trackpoint['dist'] + that.getDistance(last_trackpoint['lat'], last_trackpoint['lon'], trackpoint['lat'], trackpoint['lon']);
		}

		that.trackpoints.push(trackpoint);
		last_trackpoint = trackpoint;
	});
}




