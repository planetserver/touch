function hyperspectral_load() {
  initmetadata(); //metadata.js

  vector_layer.setZIndex(1200);
  vector_layer2.setZIndex(1200);
  vector_layer3.setZIndex(1200);
  vector_layer4.setZIndex(1200);

  //****************      Load current CRISM data   *********************************
  if (usedCrism == 0) {
    // Load IR data and image
    loadIrData();
  }
  else {
    // Load VNIR data and image
    loadVnirData();
  }
  
  var numbers = [];
  numbers = hsdataset.numbers;
  // Load image on map
  loadImage();

  inithsmapevents(); //planetmap.events.js
  initsp(); //summaryproducts.js
}

function initloadhs() {
  $('#vnirorirselect').click(function(){
    // choose VNIR or IR
    toggleDisplay('vnirorir');
    try
    {
      footprints.setVisibility(false);
    } catch(err) {
      //
    }
      
    if($("#vnircheck").attr('checked') == "checked") {
      hsdataset.productid = hsdataset.productid.toLowerCase().replace("l_","s_");
    }
    
    if($("#ircheck").attr('checked') == "checked") {
      hsdataset.productid = hsdataset.productid.toLowerCase();
    }

    // Load hyperspectral
    hsdataset.collection = hsdataset.productid + "_" + pcversion + "_" + ptversion;
    hsdataset.nodata = 65535;
    hyperspectral_load();
  }); 
}

function loadIrData() {
  // Load IR data
  var bbox = new OpenLayers.Bounds(hsdataset.ir.xmin, hsdataset.ir.ymin, hsdataset.ir.xmax, hsdataset.ir.ymax);
  bbox.transform(new OpenLayers.Projection('PS:2?0'), new OpenLayers.Projection('PS:1'));
  hsdataset.ir.xmin = bbox.left;
  hsdataset.ir.ymin = bbox.bottom;
  hsdataset.ir.xmax = bbox.right;
  hsdataset.ir.ymax = bbox.top;
  hsdataset.ir.bbox = bbox;
  var irNumbers = [];
  for(var i = 0; i < hsdataset.ir.metadata.mean.length; i++){
    var wavelength = hsdataset.ir.metadata.wavelength[i];
    irNumbers.push([wavelength, hsdataset.ir.metadata.mean[i]]);
  }
  hsdataset.ir.numbers = irNumbers;

  // Assign IR dataset to hsdataset
  hsdataset.productid = hsdataset.ir.productid;
  hsdataset.collection = hsdataset.ir.collection;
  hsdataset.nodata = hsdataset.ir.nodata;

  hsdataset.metadata = hsdataset.ir.metadata;
  hsdataset.xmin = hsdataset.ir.xmin;
  hsdataset.xmax = hsdataset.ir.xmax;
  hsdataset.ymin = hsdataset.ir.ymin;
  hsdataset.ymax = hsdataset.ir.ymax;
  hsdataset.bbox = hsdataset.ir.bbox;
  hsdataset.width = hsdataset.ir.width;
  hsdataset.height = hsdataset.ir.height;
  hsdataset.bands = hsdataset.ir.bands;
  hsdataset.numbers = hsdataset.ir.numbers;
}

function loadVnirData() {
  // Load VNIR data
  var bbox = new OpenLayers.Bounds(hsdataset.vnir.xmin, hsdataset.vnir.ymin, hsdataset.vnir.xmax, hsdataset.vnir.ymax);
  bbox.transform(new OpenLayers.Projection('PS:2?0'), new OpenLayers.Projection('PS:1'));
  hsdataset.vnir.xmin = bbox.left;
  hsdataset.vnir.ymin = bbox.bottom;
  hsdataset.vnir.xmax = bbox.right;
  hsdataset.vnir.ymax = bbox.top;
  hsdataset.vnir.bbox = bbox;
  var vnirNumbers = [];
  for(var i = 0; i < hsdataset.vnir.metadata.mean.length; i++){
    var wavelength = hsdataset.vnir.metadata.wavelength[i];
    vnirNumbers.push([wavelength, hsdataset.vnir.metadata.mean[i]]);
  }
  hsdataset.vnir.numbers = vnirNumbers;

  // Assign VNIR dataset to hsdataset
  hsdataset.productid = hsdataset.vnir.productid;
  hsdataset.collection = hsdataset.vnir.collection;
  hsdataset.nodata = hsdataset.vnir.nodata;

  hsdataset.metadata = hsdataset.vnir.metadata;
  hsdataset.xmin = hsdataset.vnir.xmin;
  hsdataset.ymin = hsdataset.vnir.ymin;
  hsdataset.xmax = hsdataset.vnir.xmax;
  hsdataset.ymax = hsdataset.vnir.ymax;
  hsdataset.bbox = hsdataset.vnir.bbox;
  hsdataset.width = hsdataset.vnir.width;
  hsdataset.height = hsdataset.vnir.height;
  hsdataset.bands = hsdataset.vnir.bands;
  hsdataset.numbers = hsdataset.vnir.numbers;
}

function loadImage() {
  // similar code can be found in wcpsconsole: image() and rgbimage()
  var datastring = 'data.' + parseInt(hsdataset.bands/2);
  var max_value = maxstr(datastring);
  var min_value = minstr(datastring);
  var wcpsquery = 'for data in ( ' + hsdataset.collection + ' ) return encode( (char) (255 / (' + max_value + ' - ' + min_value + ')) * ((' + datastring + ') - ' + min_value + '), "png", "NODATA=255;" )';
  var pngurl = planetserver_wcps + '?query=' + wcpsquery;
  var temp = {};
  temp.type = "greyscale";
  temp.base64 = base64Encode(getBinary(pngurl));
  temp.wcps = wcpsquery;
  temp.string = hsdataset.collection;
  // Add image to PNGimages array 
  var i = PNGimages.length;
  imagedata[i] = temp;
  PNGimages[i] = new OpenLayers.Layer.Image(
    hsdataset.collection,
    'data:image/png;base64,' + temp.base64,
    hsdataset.bbox,
    new OpenLayers.Size(hsdataset.width, hsdataset.height),
    hsdataset.mapoptions
    );
  // Add image to map 
  map.addLayers([PNGimages[i]]);
  map.setCenter(new OpenLayers.LonLat((hsdataset.xmin + hsdataset.xmax) / 2, (hsdataset.ymin + hsdataset.ymax) / 2), 12);
}
