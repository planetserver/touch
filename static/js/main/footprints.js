//var footprints;
var highlightCtrl;
var selectCtrl;
//var curiosity;

//var pcversion = '1';
//var ptversion = '01';

function populate_footprints()
    {
    name = "Footprints";
    searchlist = ['frt*07_if*l*trr3','hrs*07_if*l*trr3','hrl*07_if*l*trr3'];
    var westernlon = 135.5;
    var easternlon = 140;
    var minlat = -7.5;
    var maxlat = -3;

	//alert('footprints: chiamata alla funzione "getODEfootprints"');
        
    getODEfootprints(name,searchlist,westernlon,easternlon,minlat,maxlat);
    // footprintsjson = {
                // "type": "FeatureCollection","features": [{ "type": "Feature", "properties": { "CenterLat": -4.642, "CenterLon": 137.54, "MaxLat": -4.528, "MinLat": -4.756, "EastLon": 137.658, "WestLon": 137.421, "NPoleState": "F", "SPoleState": "F", "Target": "mars", "pdsid": "FRT0000C518_07_IF165L_TRR3", "DatasetId": "MRO-M-CRISM-3-RDR-TARGETED-V1.0", "InstHostId": "MRO", "InstId": "CRISM", "UTCstart": "2008-09-02T20:57:19.924", "UTCend": "2008-09-02T20:59:19.658", "PDSVolId": "MROCR_2103", "ProdType": "TRDR", "CreateDate": "2010-11-21T21:09:46.000", "ShpSource": "Corresponding DDR Footprint", "ExtURL": "http:\/\/crism-map.jhuapl.edu\/summary.php?obs=FRT0000C51807IF165L", "Ext2URL": null, "Ext3URL": null, "ProdURL": "http:\/\/ode.rsl.wustl.edu\/mars\/indexproductpage.aspx?product_id=FRT0000C518_07_IF165L_TRR3&product_idGeo=16870451", "FilesURL": "http:\/\/ode.rsl.wustl.edu\/mars\/productfiles.aspx?product_id=FRT0000C518_07_IF165L_TRR3&product_idGeo=16870451", "LabelURL": "ftp:\/\/pds-geosciences.wustl.edu\/mro\/mro-m-crism-3-rdr-targeted-v1\/mrocr_2103\/trdr\/2008\/2008_246\/frt0000c518\/frt0000c518_07_if165l_trr3.lbl", "PILOTURL": null, "ODEId": "16870451", "SubSiteTag": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 137.658, -4.756 ], [ 137.604, -4.751 ], [ 137.55, -4.748 ], [ 137.495, -4.747 ], [ 137.441, -4.748 ], [ 137.448, -4.683 ], [ 137.449, -4.648 ], [ 137.441, -4.616 ], [ 137.421, -4.559 ], [ 137.476, -4.552 ], [ 137.53, -4.545 ], [ 137.585, -4.537 ], [ 137.639, -4.528 ], [ 137.628, -4.59 ], [ 137.625, -4.627 ], [ 137.634, -4.669 ], [ 137.658, -4.756 ] ] ] } },{ "type": "Feature", "properties": { "CenterLat": -4.803, "CenterLon": 137.419, "MaxLat": -4.695, "MinLat": -4.91, "EastLon": 137.536, "WestLon": 137.301, "NPoleState": "F", "SPoleState": "F", "Target": "mars", "pdsid": "FRT0000B6F1_07_IF165L_TRR3", "DatasetId": "MRO-M-CRISM-3-RDR-TARGETED-V1.0", "InstHostId": "MRO", "InstId": "CRISM", "UTCstart": "2008-07-09T09:23:58.597", "UTCend": "2008-07-09T09:25:58.331", "PDSVolId": "MROCR_2102", "ProdType": "TRDR", "CreateDate": "2010-11-21T06:14:29.000", "ShpSource": "Corresponding DDR Footprint", "ExtURL": "http:\/\/crism-map.jhuapl.edu\/summary.php?obs=FRT0000B6F107IF165L", "Ext2URL": null, "Ext3URL": null, "ProdURL": "http:\/\/ode.rsl.wustl.edu\/mars\/indexproductpage.aspx?product_id=FRT0000B6F1_07_IF165L_TRR3&product_idGeo=17918411", "FilesURL": "http:\/\/ode.rsl.wustl.edu\/mars\/productfiles.aspx?product_id=FRT0000B6F1_07_IF165L_TRR3&product_idGeo=17918411", "LabelURL": "ftp:\/\/pds-geosciences.wustl.edu\/mro\/mro-m-crism-3-rdr-targeted-v1\/mrocr_2102\/trdr\/2008\/2008_191\/frt0000b6f1\/frt0000b6f1_07_if165l_trr3.lbl", "PILOTURL": null, "ODEId": "17918411", "SubSiteTag": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 137.536, -4.864 ], [ 137.482, -4.874 ], [ 137.428, -4.886 ], [ 137.374, -4.898 ], [ 137.321, -4.91 ], [ 137.329, -4.838 ], [ 137.331, -4.796 ], [ 137.322, -4.757 ], [ 137.301, -4.695 ], [ 137.359, -4.696 ], [ 137.417, -4.697 ], [ 137.475, -4.697 ], [ 137.532, -4.695 ], [ 137.519, -4.744 ], [ 137.513, -4.774 ], [ 137.519, -4.807 ], [ 137.536, -4.864 ] ] ] } } ] };
    // footprints = new OpenLayers.Layer.Vector("Footprints", {isBaseLayer: false, rendererOptions: { zIndexing: true }});

    // var geojson_format = new OpenLayers.Format.GeoJSON();
    // footprints.addFeatures(geojson_format.read(footprintsjson));
       
    highlightCtrl = new OpenLayers.Control.SelectFeature(footprints, {
        hover: true,
        highlightOnly: true,
        renderIntent: "temporary"
    });

    selectCtrl = new OpenLayers.Control.SelectFeature(footprints, {
        clickout: true,
        onSelect: function(feature) {
                hsdataset.productid = feature.data["pdsid"];
	    	hsdataset.productid = hsdataset.productid.toLowerCase();
		hsdataset.collection = hsdataset.productid + "_" + pcversion + "_" + ptversion;
		hsdataset.nodata = 65535;
		// New IR object
                hsdataset.ir.productid = feature.data["pdsid"];
	    	hsdataset.ir.productid = hsdataset.ir.productid.toLowerCase();
		hsdataset.ir.collection = hsdataset.ir.productid + "_" + pcversion + "_" + ptversion;
		hsdataset.ir.nodata = 65535;
		// New VNIR object
                hsdataset.vnir.productid = feature.data["pdsid"];
	    	hsdataset.vnir.productid = hsdataset.vnir.productid.toLowerCase().replace("l_","s_");
		hsdataset.vnir.collection = hsdataset.vnir.productid + "_" + pcversion + "_" + ptversion;
		hsdataset.vnir.nodata = 65535;
		
		//winChoiceVNIR.show();
                //toggleDisplay('vnirorir');
		footprints.setVisibility(false);
		curiosity.setVisibility(false);
		Ext.getCmp('footprintsId').setValue(false);
		Ext.getCmp('curiosityId').setValue(false);

		// reset
		usedCrism = -1;
			// Da rivedere se eliminare completamente dalla mappa????
		for (i=0; i<PNGimages.length; i++) {
			PNGimages[i].setVisibility(false);
		}
		PNGimages = [];
		imagedata = [];
		irImages = [];
		irImageData = [];
		vnirImages = [];
		vnirImageData = [];
		layersPanel = Ext.getCmp('layersPanelId');
		layersPanel.removeAll();
		layersPanel.setVisible(true);
		//var dataTabs = Ext.getCmp('dataTabsId');
		//dataTabs.setActiveTab(0);
		winToc.close();
		winDiagrams.close();

		// Load hyperspectral (loaddata.js)
		hyperspectral_load();

           },
        onUnselect: function(feature) {
                hsdataset.productid = "";
		// New IR object
                hsdataset.ir.productid = "";
		// New VNIR object
                hsdataset.vnir.productid = "";
            }
        }
    );
    map.addControl(highlightCtrl);
    map.addControl(selectCtrl);

    highlightCtrl.activate();
    selectCtrl.activate();
    map.addLayers([footprints]);
    footprints.setZIndex(1501);
    }

function add_curiosity_location()
    {
    // CURIOSITY LANDING SITE
    // features (http://openlayers.org/dev/examples/vector-features-with-text.html)
    // allow testing of specific renderers via "?renderer=Canvas", etc
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
    
    curiosity = new OpenLayers.Layer.Vector("Curiosity", {
        styleMap: new OpenLayers.StyleMap({'default':{
            strokeColor: "black",
            strokeOpacity: 1,
            strokeWidth: 1,
            fillColor: "red",
            fillOpacity: 1,
            pointRadius: 5,
            pointerEvents: "visiblePainted",
            
            // externalGraphic: "images/curiosity.png",
            // graphicXOffset :  -10, 
            // graphicYOffset :  -8, 
            // graphicWidth   : 20, 
            // graphicHeight  : 16, 
            // rotation:0,
            
            label : "${name}",
            
            fontColor: "${favColor}",
            fontSize: "12px",
            fontFamily: "Verdana",
            fontWeight: "bold",
            labelAlign: "${align}",
            labelXOffset: "${xOffset}",
            labelYOffset: "${yOffset}",
            labelOutlineColor: "black",
            labelOutlineWidth: 1
        }}),
        renderers: renderer
    });
    // create points feature
    var curiosity_point = new OpenLayers.Geometry.Point(137.44,-4.59);
    var curiosity_feature = new OpenLayers.Feature.Vector(curiosity_point);
    curiosity_feature.attributes = {
        name: "Curiosity\nlanding site",
        favColor: 'white',
        align: "cm",
        xOffset: 0,
        yOffset: 100
    };
    
    curiosity.addFeatures([curiosity_feature]);
    map.addLayers([curiosity]);
    curiosity.setZIndex(1500);
    }

function getODEfootprints(name,searchlist,westernlon,easternlon,minlat,maxlat)
    {
    if(westernlon < 0)
        {
        westernlon = westernlon + 360;
        }
    if(easternlon < 0)
        {
        easternlon = easternlon + 360;
        }
    footprints = new OpenLayers.Layer.Vector(name, {isBaseLayer: false, rendererOptions: { zIndexing: true }});
    wkt = new OpenLayers.Format.WKT();
	//alert('footprints.getODEfootprints: dopo wkt');

    for(var k = 0; k < searchlist.length; k++)
        {
        searchstring = searchlist[k];
	//alert('footprints.getODEfootprints: prima della richiesta');

        //Francesco's code
        var strRequest = 'http://oderest.rsl.wustl.edu/live/?query=product&results=x$proj=c0&output=JSON&limit=1000&loc=f';
        strRequest += '&westernlon=' + westernlon;
        strRequest += '&easternlon=' + easternlon;
        strRequest += '&minlat=' + minlat;
        strRequest += '&maxlat=' + maxlat;
        strRequest += '&pdsid=' + searchstring;
        //alert(strRequest);
        objHTTP = getXMLHttp();
        //Passo 1
        objHTTP.open('GET', strRequest, false);
        //Passo 2
        //objHTTP.onreadystatechange = function() {elaboraRisposta()}
       	//alert('footprints.getODEfootprints: prima del send');
        //Passo 3
        objHTTP.send(null)
       	//alert('footprints.getODEfootprints: dopo il send');

        var txtOderest = null;
        if (objHTTP.readyState == 4) {
            txtOderest = objHTTP.responseText;
            //alert('txtOderestNEW:\n\n' + txtOderest);
        }
        var jsonOderest = JSON.parse(txtOderest);
        //alert('jsonOderest:\n\n' + jsonOderest + '\n\nLENGTH = ' + jsonOderest.ODEResults.Products.Product.length);
        ////oderest = JSON.parse(getBinary('oderest.php?westernlon=' + westernlon.toString() + '&easternlon=' + easternlon.toString() + '&minlat=' + minlat.toString() + '&maxlat=' + maxlat.toString() + '&pdsid=' + searchstring));
	//alert('footprints.getODEfootprints: dopo oderest.php');
        ////alert(oderest);
        ////var products = oderest.ODEResults.Products.Product;
        var products = jsonOderest.ODEResults.Products.Product;

	//alert('footprints.getODEfootprints: dopo oderest.php\n products.length = ' + products.length);
        for(var i = 0; i < products.length; i++)
            {
            // Only show when data is in rasdaman, currently using inrasdaman list in inrasdaman.js
            // This will need to work using GetCapabilities: http://fuzzytolerance.info/blog/parsing-wms-getcapabilities-with-jquery/
            var pdsid = products[i].pdsid;
            var showfootprint = 0;
            for(var j = 0; j < inrasdaman.length; j++)
                {
                var coll = pdsid.toLowerCase() + "_" + pcversion + "_" + ptversion;
                if(inrasdaman[j] == coll)
                    {
                    showfootprint = 1;
                    }
                }
            if(showfootprint == 1)
                {
                wktstring = products[i].Footprint_geometry
                var polygonFeature = wkt.read(wktstring);
                //polygonFeature.data['ProductId'] = products[i].pdsid
                polygonFeature.data = products[i]
                //polygonFeature.geometry.transform(map.displayProjection, map.getProjectionObject());         
                footprints.addFeatures([polygonFeature]);
                }
            }
        }
    }

function getXMLHttp() {
    var xmlhttp = null;
    if (window.ActiveXObject) {
        if (navigator.userAgent.toLowerCase().indexOf('msie 5') != -1) {
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        } else {
            xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
        }
    }
    if (!xmlhttp && typeof(XMLHttpRequest) != 'undefined') {
        xmlhttp = new XMLHttpRequest()
    }
    return xmlhttp
}



