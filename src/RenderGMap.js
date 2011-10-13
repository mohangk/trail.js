function RenderMap(map)
{
	this.map = map;
	this.trackcolour = "#FF0000"; // red
	this.trackwidth = 5;
	this.mintrackpointdelta = 0.0001
}

// Set the colour of the track line segements.
RenderMap.prototype.SetTrackColour = function(colour)
{
	this.trackcolour = colour;
}

// Set the width of the track line segements
RenderMap.prototype.SetTrackWidth = function(width)
{
	this.trackwidth = width;
}

// Set the minimum distance between trackpoints.
// Used to cull unneeded trackpoints from map.
RenderMap.prototype.SetMinTrackPointDelta = function(delta)
{
	this.mintrackpointdelta = delta;
}


//DRAWING TRACKS RELATED CODE
RenderMap.prototype.drawTrackPoints = function(trackpoints)
{
	
    var latLngs = this.getLatLng(trackpoints);
    console.log("lat lng count - "+latLngs.length);
    var polyline = new google.maps.Polyline({
	    path: latLngs,
	    strokeColor: this.trackcolour, 
	    strokeOpacity: 1.0,
	    strokeWeight: this.trackwidth
	  });
    polyline.setMap(this.map);

}

RenderMap.prototype.getLatLng = function(trackpoints)
{
	if (trackpoints.length == 0)
	{
		return; 
	}

	var pointarray = [];

	// process first point
	var lastlat = trackpoints[0]['lat'];
	var lastlon = trackpoints[0]['lon'];
	var latlng = new google.maps.LatLng(lastlat,lastlon);
	pointarray.push(latlng);

	for (var i=1; i < trackpoints.length; i++)
	{
		var lon = trackpoints[i]['lon'];
		var lat = trackpoints[i]['lat'];

		// Verify that this is far enough away from the last point to be used.
		var latdiff = lat - lastlat;
		var londiff = lon - lastlon;
		
		if ( Math.sqrt(latdiff*latdiff + londiff*londiff) > this.mintrackpointdelta )
		{
			lastlon = lon;
			lastlat = lat;
			latlng = new google.maps.LatLng(lat,lon);
			pointarray.push(latlng);
		}

	}
	return pointarray;
}

RenderMap.prototype.getCenterLatLng = function(minmax){
       console.log(minmax);
       console.log('test');       
	var centerlon = (minmax['maxlon'] + minmax['minlon']) / 2;
	var centerlat = (minmax['maxlat'] + minmax['minlat']) / 2;
	return new google.maps.LatLng(centerlat, centerlon);

}

RenderMap.prototype.centerAndZoom = function (minmax)
{
	
	var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(minmax['minlat'], minmax['minlon']), new google.maps.LatLng(minmax['maxlat'], minmax['maxlon']));
	this.map.setCenter(this.getCenterLatLng(minmax));
	this.map.fitBounds(bounds);
}



/*
RenderMap.prototype.AddTrackpointsToMap = function ()
{
	var tracks = this.xmlDoc.documentElement.getElementsByTagName("trk");
	//var latlngbounds = new google.maps.LatLngBounds();

	for (var i=0; i < tracks.length; i++)
	{
		this.AddTrackToMap(tracks[i], this.trackcolour, this.trackwidth);
		//var tracklatlngbounds = this.AddTrackToMap(tracks[i], this.trackcolour, this.trackwidth);
		//latlngbounds.extend(tracklatlngbounds.getSouthWest());
		//latlngbounds.extend(tracklatlngbounds.getNorthEast());
	}

	// All methods that add items to the map return the bounding box of what they added.
	//return latlngbounds;
}
RenderMap.prototype.AddTrackToMap = function(track, colour, width)
{
	var segments = track.getElementsByTagName("trkseg");
	//var latlngbounds = new google.maps.LatLngBounds();
	for (var i=0; i < segments.length; i++)
	{
		var segmentlatlngbounds = this.AddTrackSegmentToMap(segments[i], colour, width);
		//this.AddTrackSegmentToMap(segments[i], colour, width);
		//latlngbounds.extend(segmentlatlngbounds.getSouthWest());
		//latlngbounds.extend(segmentlatlngbounds.getNorthEast());
	}

	// All methods that add items to the map return the bounding box of what they added.
	//return latlngbounds;
}
RenderMap.prototype.AddTrackSegmentToMap = function(trackSegment, colour, width)
{
	//var latlngbounds = new google.maps.LatLngBounds();

	var trackpoints = trackSegment.getElementsByTagName("trkpt");
	if (trackpoints.length == 0)
	{
		return; //latlngbounds;
	}

	var pointarray = [];

	// process first point
	var lastlon = parseFloat(trackpoints[0].getAttribute("lon"));
	var lastlat = parseFloat(trackpoints[0].getAttribute("lat"));
	var latlng = new google.maps.LatLng(lastlat,lastlon);
	pointarray.push(latlng);
	//latlngbounds.extend(latlng);

	// Create a marker at the begining of each track segment
	//this.CreateMarker(trackpoints[0]);

	for (var i=1; i < trackpoints.length; i++)
	{
		var lon = parseFloat(trackpoints[i].getAttribute("lon"));
		var lat = parseFloat(trackpoints[i].getAttribute("lat"));

		// Verify that this is far enough away from the last point to be used.
		var latdiff = lat - lastlat;
		var londiff = lon - lastlon;
		if ( Math.sqrt(latdiff*latdiff + londiff*londiff) > this.mintrackpointdelta )
		{
			lastlon = lon;
			lastlat = lat;
			latlng = new google.maps.LatLng(lat,lon);
			pointarray.push(latlng);
			//latlngbounds.extend(latlng);
		}

	}

	var polyline = new google.maps.Polyline(pointarray, colour, width);

	this.map.addOverlay(polyline);

	// All methods that add items to the map return the bounding box of what they added.
	//return latlngbounds;
}
*/


RenderMap.prototype.CenterAndZoomToLatLngBounds = function (latlngboundsarray)
{
	var boundingbox = new google.maps.LatLngBounds();
	for (var i=0; i<latlngboundsarray.length; i++)
	{
		if (!latlngboundsarray[i].isEmpty())
		{
			boundingbox.extend(latlngboundsarray[i].getSouthWest());
			boundingbox.extend(latlngboundsarray[i].getNorthEast());
		}
	}

	var centerlat = (boundingbox.getNorthEast().lat() + boundingbox.getSouthWest().lat()) / 2;
	var centerlng = (boundingbox.getNorthEast().lng() + boundingbox.getSouthWest().lng()) / 2;
	this.map.setCenter(new google.maps.LatLng(centerlat, centerlng), this.map.getBoundsZoomLevel(boundingbox));
}



//WAYPOINT RELATED CODE
RenderMap.prototype.AddWaypointsToMap = function ()
{
	var waypoints = this.xmlDoc.documentElement.getElementsByTagName("wpt");
	//var latlngbounds = new google.maps.LatLngBounds();

	for (var i=0; i < waypoints.length; i++)
	{
		this.CreateMarker(waypoints[i]);
		//var waypointlatlngbounds = this.CreateMarker(waypoints[i]);
		//latlngbounds.extend(waypointlatlngbounds.getSouthWest());
		//latlngbounds.extend(waypointlatlngbounds.getNorthEast());
	}

	// All methods that add items to the map return the bounding box of what they added.
	//return latlngbounds;
}

RenderMap.prototype.CreateMarker = function(point)
{
	var lon = parseFloat(point.getAttribute("lon"));
	var lat = parseFloat(point.getAttribute("lat"));
	var html = "";

	if (point.getElementsByTagName("html").length > 0)
	{
		for (i=0; i<point.getElementsByTagName("html").item(0).childNodes.length; i++)
		{
			html += point.getElementsByTagName("html").item(0).childNodes[i].nodeValue;
		}
	}
	else
	{
		// Create the html if it does not exist in the point.
		html = "<b>" + this.TranslateName(point.nodeName) + "</b><br>";
		var attributes = point.attributes;
		var attrlen = attributes.length;
		for (i=0; i<attrlen; i++)
		{
			html += attributes.item(i).name + " = " + attributes.item(i).nodeValue + "<br>";
		}

		if (point.hasChildNodes)
		{
			var children = point.childNodes;
			var childrenlen = children.length;
			for (i=0; i<childrenlen; i++)
			{
				// Ignore empty nodes
				if (children[i].nodeType != 1) continue;
				if (children[i].firstChild == null) continue;
				html += children[i].nodeName + " = " + children[i].firstChild.nodeValue + "<br>";
			}
		}
	}

	var marker = new GMarker(new google.maps.LatLng(lat,lon));
	GEvent.addListener(marker, "click",
		function()
		{
			marker.openInfoWindowHtml(html);
		}
	);

	this.map.addOverlay(marker);


	// All methods that add items to the map return the bounding box of what they added.
	//var latlng = new google.maps.LatLng(lat,lon);
	//return new google.maps.LatLngBounds(latlng,latlng);
}




