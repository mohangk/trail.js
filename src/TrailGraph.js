function TrailGraph(graph)
{
	this.graph = graph;
	this.trackpoints = null;
	this.time_ticks = null;
	this.ele_ticks = null;
	this.dist_ticks = null;
}

TrailGraph.prototype.setTrackPoints = function(trackpoints)
{
	this.trackpoints = trackpoints;
	this.setTicks();
}

TrailGraph.prototype.setTicks = function()
{
	var time_ticks = [];
	var ele_ticks = [];
	var dist_ticks = [];
	$.each(this.trackpoints, function(i, trackpoint){ 
		time_ticks.push(trackpoint['time']);
		ele_ticks.push(trackpoint['ele']);
		dist_ticks.push(trackpoint['dist']);
	});
	this.dist_ticks = dist_ticks;
	this.time_ticks = time_ticks;
	this.ele_ticks = ele_ticks;
}

TrailGraph.prototype.getTimeTicks = function()
{
	return this.time_ticks;
}

TrailGraph.prototype.getDistanceTicks = function()
{
	return this.dist_ticks;
}

TrailGraph.prototype.getElevationTicks = function()
{
	return this.ele_ticks;
}
