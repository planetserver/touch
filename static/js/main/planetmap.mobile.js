var map;
var GlobalMOLARGB;
var GlobalTHEMISIRday;
var GaleCTXWms;
var GaleHRSCWms;
var fake;
var vector_layer;
var vector_layer2;
var vector_layer3;
var vector_layer4;
var mousePosition;  //pixel

// OpenLayers
OpenLayers.Util.VincentyConstants={a:3396190,b:3396190,f:0}
OpenLayers.IMAGE_RELOAD_ATTEMPTS = 2;
OpenLayers.Util.onImageLoadErrorColor = "transparent";

//OpenLayers.ImgPath = "js/OpenLayers/img/"
OpenLayers.ImgPath = "/static/images/"

OpenLayers.Feature.Vector.style['default']['strokeWidth'] = '2';
var maxextent = new OpenLayers.Bounds(-180,-90,180,90);
//

function initmap() {
  map = new OpenLayers.Map( 'map' , {
    controls: [
      new OpenLayers.Control.Navigation(),
      new OpenLayers.Control.Panel(),
      new OpenLayers.Control.TouchNavigation({
        dragPanOptions: {
          enableKinetic: true
        }
      }),
      // new OpenLayers.Control.PinchZoom(),
      // new OpenLayers.Control.PanZoomBar(),
      //new OpenLayers.Control.LayerSwitcher({'ascending':false}),
      //new OpenLayers.Control.Permalink(),
      //new OpenLayers.Control.ScaleLine(),

      //new OpenLayers.Control.Permalink('permalink'),

      //new OpenLayers.Control.MousePosition()  //it's possible to eliminate if you want only the the ExtJS point rapresentation

      //new OpenLayers.Control.OverviewMap(),
      //new OpenLayers.Control.KeyboardDefaults()
    ],
    numZoomLevels: 20, // How can you set the max zoomlevels to HiRISE max?
    projection: 'PS:1', 
    displayProjection: new OpenLayers.Projection("PS:1"), 
    units: 'degrees',
    maxExtent: maxextent
  });

  /** ENABLE CACHE **/

  var cacheWrite = new OpenLayers.Control.CacheWrite({
    autoActivate: true,
    imageFormat: "image/jpeg",
    eventListeners: {
      cachefull: function() { 
        if (console && console.log) {
          console.log('Cache full');
        }
      }
    }
  });
  map.addControl(cacheWrite);

  var cacheRead = new OpenLayers.Control.CacheRead();
  map.addControl(cacheRead);

  /** END ENABLE CACHE **/

  $("#zoom-out").live('click', function(){
    map.zoomOut();
  });

  $("#zoom-in").live('click', function(){
      map.zoomIn();
  });

  // A fake base layer
  var baseLayerOptions = {
    isBaseLayer: true, 
    displayInLayerSwitcher: false
  };

  fake = new OpenLayers.Layer('fake', baseLayerOptions);
    
  GlobalMOLARGB = new OpenLayers.Layer.MapServer("MOLA RGB",
    planetserver_ms_wms,
    { map: "mola.map", layers: 'molargb', projection: 'PS:1'},
    {isBaseLayer: false, transitionEffect: 'resize', wrapDateLine: true}
  );
              
  GlobalTHEMISIRday = new OpenLayers.Layer.MapServer("THEMIS IR day",
    planetserver_ms_wms,
    { map: "themisirday.map", layers: 'themisirday', projection: 'PS:2?0', transparent: 'true'},
    {isBaseLayer: false, opacity: 0.5, transitionEffect: 'resize', wrapDateLine: true}
  );

 
  map.addLayers([fake, GlobalMOLARGB, GlobalTHEMISIRday]); //, GaleHRSCWms, GaleCTXWms]);
  map.zoomTo(3);

  // var editor = new OpenLayers.Editor(map, {
  //   activeControls: [
  //     'Navigation', 
  //     'SnappingSettings', 
  //     'CADTools', 
  //     'TransformFeature', 
  //     'Separator', 
  //     'DeleteFeature', 
  //     'DragFeature', 
  //     'SelectFeature', 
  //     'Separator', 
  //     'DrawHole', 
  //     'ModifyFeature', 
  //     'Separator'],
  //   featureTypes: [
  //     'regular', 
  //     'polygon', 
  //     'path', 
  //     'point'],
  // });
  // editor.startEditMode();

}

function initpanels() {
  var container = document.getElementById("panel");
  var panel = new OpenLayers.Control.Panel({ defaultControl: featureInfo, div: container });
  /* The buttons to show/hide windows heve been moved into the extjs toolbar
  var container2 = document.getElementById("panel2");
  var panel2 = new OpenLayers.Control.Panel({ div: container2 });
  */
  var container3 = document.getElementById("panel3");
  var panel3 = new OpenLayers.Control.Panel({ div: container3 });

  panel.addControls([
    featureInfo,
    featureInfo1,
    featureInfo2,
    featureInfo3,
    featureInfo4,
    zoomBox,
    new OpenLayers.Control.ZoomBox({title:"Zoom out box", displayClass: 'olControlZoomOutBox', out: true}),
    new OpenLayers.Control.DragPan({title:'Drag map', displayClass: 'olControlPanMap'}),
    zoomToContextExtent,
    navHistory.previous,
    navHistory.next,
    measureControls.line,
    measureControls.polygon
  ]); 
  /* The buttons to show/hide windows heve been moved into the extjs toolbar
  panel2.addControls([
    toggleBands,
    toggleQuery,
    toggleSpectrum,
    toggleX3d
  ]);
  */
  panel3.addControls([
    //toggleTutorial,
    //toggleAbout,
    permalink
  ]);
  // add the panel to the map
  map.addControl(panel);
  //map.addControl(panel2);
  map.addControl(panel3);
}

function initvectors() {
  var my_style = new OpenLayers.StyleMap({ 
    "default": new OpenLayers.Style( 
    { 
        fillColor: "${fcolor}"
    }) 
  });
  var my_style2 = new OpenLayers.StyleMap({ 
    "default": new OpenLayers.Style( 
    { 
        fillColor: "#4bb2c5"
    }) 
  });
  var my_style3 = new OpenLayers.StyleMap({ 
    "default": new OpenLayers.Style( 
    { 
        fillColor: "#ee9900",
        strokeWidth: 2,
        strokeColor: "#ee9900"
    }) 
  });
  // Create vector layers to record clicks
  vector_layer = new OpenLayers.Layer.Vector("Series", {
    styleMap: my_style,
    rendererOptions: { zIndexing: true, extractAttributes: true },
    displayInLayerSwitcher: false
  });
  vector_layer2 = new OpenLayers.Layer.Vector("Spectral ratio", {
    styleMap: my_style2,
    rendererOptions: { zIndexing: true },
    displayInLayerSwitcher: false
  });
  vector_layer3 = new OpenLayers.Layer.Vector("Elevation point", {
    styleMap: my_style3,
    rendererOptions: { zIndexing: true },
    displayInLayerSwitcher: false
  });
  vector_layer4 = new OpenLayers.Layer.Vector("Cross", {
    styleMap: my_style2,
    rendererOptions: { zIndexing: true },
    displayInLayerSwitcher: false
  });
  // Limit the number of features that can be added to each
  vector_layer.events.on({"beforefeatureadded": function() {
    var len = vector_layer.features.length;
        if (len == nrclicks) vector_layer.removeFeatures(vector_layer.features[0]);
    } 
  });
  vector_layer2.events.on({"beforefeatureadded": function() {
        if (vector_layer2.features.length == 2) vector_layer2.destroyFeatures();
    } 
  });
  vector_layer3.events.on({"beforefeatureadded": function() {
        if (vector_layer3.features.length == 3) vector_layer3.destroyFeatures();
    } 
  });
  vector_layer4.events.on({"beforefeatureadded": function() {
        if (vector_layer4.features.length == 1) vector_layer4.destroyFeatures();
    } 
  });

  //Add layers to the map
  map.addLayers([vector_layer,vector_layer2,vector_layer3,vector_layer4]);

  /* A simple way to fix the bug to show color points and line above the map
  vector_layer.setZIndex(1200);
  vector_layer2.setZIndex(1200);
  vector_layer3.setZIndex(1200);
  vector_layer4.setZIndex(1200);
  */
}
