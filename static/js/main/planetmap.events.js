var zoomBox;
var navHistory = new OpenLayers.Control.NavigationHistory();
var zoomToContextExtent;
var featureInfo;
var featureInfo1;
var featureInfo2;
var featureInfo3;
var featureInfo4;
var measureControls;

//**************  New client
var zoomBoxIn = new OpenLayers.Control.ZoomBox({out: false});
var zoomBoxOut = new OpenLayers.Control.ZoomBox({out: true});
var queryEventHandler1; // Spectrum
var queryEventHandler2; // Spectral ratio
var queryEventHandler3; // Cross section
var queryEventHandler4; // Elevation Point

var loadedProduct = false;

// execute maximum zoom
function mapZoomMaximum() {
	map.zoomToExtent(maxextent); // maxextent initialized in planetmap.js
}

// zoom map in and zoom map out
/*function mapZoomInOut(inout) {
	switch(inout) {
		case 'in': map.zoomIn(); break;
		case 'out': map.zoomOut(); break;
	}
}*/
//***************  End - New client

function handleMeasurements(event) {
	//var geometry = event.geometry;
	var units = event.units;
	var order = event.order;
	var measure = event.measure;

	/*** Commented by swingit ***
	var element = document.getElementById('mapOutput');
	var out = "";
	// vincenty constants modified to use mars constants, OpenLayers.js line 242
	if(order == 1) {
		out += "Distance: " + measure.toFixed(3) + " " + units; // distance can be fixed simply by using geodesic: true
	} else {
	    	out += "<span class='mapAreaOutput'>Area: " + measure.toFixed(3) + " " + units + "<sup style='font-size:6px'>2</" + "sup></span>"; // area fix inside OpenLayers.js line 870, replaced earth radius by mars radius
	}
	element.innerHTML = out;
	*** Commented by swingit (end) ***/

	// added on 23-09-2013
	if(order == 1) {
		Ext.getCmp('labelShowStatus').setText("Distance: " + measure.toFixed(3) + " " + units);
	} else {
		Ext.getCmp('labelShowStatus').update("Area: " + measure.toFixed(3) + " " + units + "<sup>2</sup>");
	}
}

function toggleQueryMode1() {             
	if(featureInfo1.active) {
	 	queryEventHandler1.activate();
	}
	else {
		queryEventHandler1.deactivate();
	}
}

function toggleQueryMode2() {             
	if(featureInfo2.active) {
	 	queryEventHandler2.activate();
	}
	else {
	 	queryEventHandler2.deactivate();
	}
}

function toggleQueryMode3() {             
	if(featureInfo3.active) {
		queryEventHandler3.activate();
	}
	else {
		queryEventHandler3.deactivate();
	}
}

function toggleQueryMode4() {             
	if(featureInfo4.active) {
	 	queryEventHandler4.activate();
	}
	else {
	 	queryEventHandler4.deactivate();
	}
}

function setLocationHashFromPixel(pixel)
    {
        lonlat = map.getLonLatFromPixel(pixel);
        hashKeys['lat'] = lonlat.lat;
        hashKeys['lon'] = lonlat.lon;
        hashKeys['region'] =  getRegion(lonlat);
        hashKeys['productid'] = getProduct(lonlat);
    }

function isZoomEvent() 
    {
    return (map.getZoom() != hashKeys['zoomlevel']);
    }
function initmapevents() {

    map.events.register("mousemove", map, function(e)
        {
        setLocationHashFromPixel(new OpenLayers.Pixel(e.xy.x,e.xy.y));
        setLocationHash();
        });

    map.events.register("mouseout", map, function(e)
        {
            location.hash = "";
        });

    map.events.register("move", map, function(e)
        {
        if (isZoomEvent()) // zoom 
            {
            hashKeys['zoomlevel'] = map.getZoom(); 
            var productid = hashKeys['productid'];
            if (productid == "")
                {
                loadedProduct = false;
                setLocationHash();
                }
            else if (!iscodezoomevent && !loadedProduct)
                {
                loadmrdr(productid);    
                loadedProduct = true;
                }
            }
        });

	map.addControl(zoomBoxIn);
	map.addControl(zoomBoxOut);
    zoomBox = new OpenLayers.Control.ZoomBox({ title: "Zoom in box" });
    /*navHistory = new OpenLayers.Control.NavigationHistory();  
    navHistory.previous.title = "View history backward";
    navHistory.next.title = "View history forward";*/      
    map.addControl(navHistory);

    // build the Select functionality
    featureInfo = new OpenLayers.Control({
        displayClass: "olControlFeatureInfo",
        title: "Select"
    });
	/*
    // register events to the featureInfo tool
    featureInfo.events.register("activate", featureInfo, function() {     
        highlightCtrl.activate();
        selectCtrl.activate();
    });                
    featureInfo.events.register("deactivate", featureInfo, function() {
        highlightCtrl.deactivate();
        selectCtrl.deactivate();
    });
	*/
    // build the Spectrum functionality
    featureInfo1 = new OpenLayers.Control({
        displayClass: "olControlFeatureInfo1",
        title: "Spectrum"
    });

    // register events to the spectrum tool
    featureInfo1.events.register("activate", featureInfo1, function() { toggleQueryMode1(); });                
    featureInfo1.events.register("deactivate", featureInfo1, function() { toggleQueryMode1(); });                            

    // build the spectral ratio functionality
    featureInfo2 = new OpenLayers.Control({
        displayClass: "olControlFeatureInfo2",
        title: "Spectral ratio"
    });

    // register events to the Spectral ratio tool
    featureInfo2.events.register("activate", featureInfo2, function() { toggleQueryMode2(); });                
    featureInfo2.events.register("deactivate", featureInfo2, function() { toggleQueryMode2(); });
    
    // build the cross functionality
    featureInfo3 = new OpenLayers.Control({
        displayClass: "olControlFeatureInfo3",
        title: "Cross section"
    });

    // register events to the cross tool
    featureInfo3.events.register("activate", featureInfo3, function() { toggleQueryMode3(); });                
    featureInfo3.events.register("deactivate", featureInfo3, function() { toggleQueryMode3(); });
    
    // build the cross functionality
    featureInfo4 = new OpenLayers.Control({
        displayClass: "olControlFeatureInfo4",
        title: "Elevation point"
    });

    // register events to the cross tool
    featureInfo4.events.register("activate", featureInfo4, function() { toggleQueryMode4(); });                
    featureInfo4.events.register("deactivate", featureInfo4, function() { toggleQueryMode4(); }); 
     
    zoomToContextExtent = new OpenLayers.Control.Button({
        title: "Full scale", displayClass: "olControlZoomToMaxExtent", trigger: function(){ map.zoomToExtent(maxextent); }
    });              
     
    // build the measure controls
    var optionsLine = {
        handlerOptions: {
            persist: true
        },
        displayClass: "olControlMeasureDistance",
        title: "Measure Distance"
    };

    var optionsPolygon = {
        handlerOptions: {
            persist: true
        },
        displayClass: "olControlMeasureArea",
        title: "Measure Area"
    };

    measureControls = {
        line: new OpenLayers.Control.Measure(
            OpenLayers.Handler.Path, 
            optionsLine 
        ),
        polygon: new OpenLayers.Control.Measure(
            OpenLayers.Handler.Polygon, 
            optionsPolygon
        )
     };
     
    for(var key in measureControls) {
        control = measureControls[key];
        control.geodesic = true; // set true to use geodesic coordinates
        //control.setImmediate(true); // set true to immediately compute the area/length as soon as the mouse is moved
        control.events.on({
            "measure": handleMeasurements,
            "measurepartial": handleMeasurements
        });
    }
 
	//**************  New client
	map.addControl(measureControls.line);
 	map.addControl(measureControls.polygon);
 
 	// DragPan control
 	var optionsNavigation = {
  		dragPan: new OpenLayers.Control.DragPan(),
 	};
 	dragControls = {
        	dragger: new OpenLayers.Control.Navigation(optionsNavigation),
 	};
 	map.addControl(dragControls.dragger);
	//**************   End -  New client
   
    // create a new event handler for single click query
    queryEventHandler1 = new OpenLayers.Handler.Click({ 'map': map }, { 'click': function(e){ 
        fire(e);//Spectrum
    }});
    queryEventHandler2 = new OpenLayers.Handler.Click({ 'map': map }, { 'click': function(e){ 
        fire2(e);//Spectral Ratio
    }});
    queryEventHandler3 = new OpenLayers.Handler.Click({ 'map': map }, { 'click': function(e){ 
        fire3(e);//Cross Section
    }});
    queryEventHandler4 = new OpenLayers.Handler.Click({ 'map': map }, { 'click': function(e){ 
        fire4(e);//Elevation
    }});

function fire(e)
        {
        // draw spectra
        var lonlat = map.getLonLatFromPixel(e.xy);
        var lon = lonlat.lon;
        var lat = lonlat.lat;
        vector_layer2.destroyFeatures(); // destroy the points from spectral ratio
        if(addspectrum(lon,lat))
            {
            var origin = {x:lon, y:lat}; 
            var circleout = new OpenLayers.Geometry.Polygon.createRegularPolygon(origin, pointsize, 50);
            var circle = new OpenLayers.Feature.Vector(circleout, {fcolor: colors[pos]});
            vector_layer.addFeatures(circle);
            pos++;
            if (pos == nrclicks) {
                pos = 0; // wrap around
            }
            }
}

function fire2(e)
        {
        // ratio
        var lonlat = map.getLonLatFromPixel(e.xy);
        var lon = lonlat.lon;
        var lat = lonlat.lat;
        vector_layer.destroyFeatures(); // destroy the points from the series
        if(ratiospectra(lon,lat))
            {
            var origin = {x:lon, y:lat}; 
            var circleout = new OpenLayers.Geometry.Polygon.createRegularPolygon(origin, pointsize, 50);
            vector_layer2.addFeatures(new OpenLayers.Feature.Vector(circleout)); 
            }
}

function fire3(e)
        {
        // destroy the points from other functions
        vector_layer.destroyFeatures();
        vector_layer2.destroyFeatures();
        vector_layer4.destroyFeatures();

        var lonlat = map.getLonLatFromPixel(e.xy);        
        var xmin = dtmdataset.xmin;
        var xmax = dtmdataset.xmax;
        var ymin = dtmdataset.ymin;
        var ymax = dtmdataset.ymax;
        // if you click within the extent of the imagedtm layer:
        if((lonlat.lon >= xmin) && (lonlat.lon <= xmax) && (lonlat.lat >= ymin) && (lonlat.lat <= ymax))
            {
            var origin = {x:lonlat.lon, y:lonlat.lat}; 
            var circleout = new OpenLayers.Geometry.Polygon.createRegularPolygon(origin, pointsize, 50);
            vector_layer3.addFeatures(new OpenLayers.Feature.Vector(circleout));
            if (crossturn == 1) { // this is our second set of data needed for the cross
                // add a line joining the two points
                var points = new Array(
                    new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat),
                    new OpenLayers.Geometry.Point(dtmdataset.templonlat.lon, dtmdataset.templonlat.lat)
                );
                var line = new OpenLayers.Geometry.LineString(points);
                vector_layer3.addFeatures(new OpenLayers.Feature.Vector(line));
                var lon1 = dtmdataset.templonlat.lon;
                var lat1 = dtmdataset.templonlat.lat;
                var lon2 = lonlat.lon;
                var lat2 = lonlat.lat;

		//New function to show a Cross Section diagram
		showCrossSectionDiagram(lon1, lat1, lon2, lat2);

		/*** Commented by swingit ***
                $('#loader').show();
                crosssection(lon1,lat1,lon2,lat2);
		*** Commented by swingit ***/
                crossturn = 0; // reset turn to 0
            }
            else { // crossturn is equal to 0
                crossturn++; // increase turn count
                dtmdataset.templonlat = lonlat; // to keep track of the first set of data
            }
            return true;
            }
        else
            {
            return false;
            }
        }

    function fire4(e)
        {
        // destroy the points from other functions
        //vector_layer.destroyFeatures();
        //vector_layer2.destroyFeatures();
        //vector_layer3.destroyFeatures();
        var lonlat = map.getLonLatFromPixel(e.xy);
        var xmin = dtmdataset.xmin;
        var xmax = dtmdataset.xmax;
        var ymin = dtmdataset.ymin;
        var ymax = dtmdataset.ymax;
        // if you click within the extent of the imagedtm layer:
        if((lonlat.lon >= xmin) && (lonlat.lon <= xmax) && (lonlat.lat >= ymin) && (lonlat.lat <= ymax))
            {
            //var origin = {x:lonlat.lon, y:lonlat.lat}; 
            //var circleout = new OpenLayers.Geometry.Polygon.createRegularPolygon(origin, pointsize, 50);
            //vector_layer4.addFeatures(new OpenLayers.Feature.Vector(circleout));
            //$('#loader').show();
            getz(lonlat.lon,lonlat.lat);
            }
        }
    }

function inithsmapevents()
    {
    OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
        defaultHandlerOptions: {
            'single': true,
            'double': false,
            'pixelTolerance': 0,
            'stopSingle': false,
            'stopDouble': false
        },

        initialize: function(options) {
            this.handlerOptions = OpenLayers.Util.extend(
                {}, this.defaultHandlerOptions
            );
            OpenLayers.Control.prototype.initialize.apply(
                this, arguments
            );
        },
        
    });
    click = new OpenLayers.Control.Click();
    map.addControl(click);
    click.activate();
    }
