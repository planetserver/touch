// CODE FOR MOBILE

function initMobileUI() {
  populateRegionSelector();
  $('#loadRegionBtn').click(function(e) {
    $('#loadRegionBtn').button('loading');
    setTimeout(function(){
      loadRegion(e);
    }, 50);    
    e.preventDefault();
  });

  $('#openBandSlider').click(function(e) {
    if (currentCollection != hsdataset.collection) {
      $('#largeModal .modal-body').html(templateBands());
      $('#largeModal .modal-title').html('Band Ratio Analysis');
      createBRClient();
      currentCollection = hsdataset.collection;
      $('#largeModal').modal('show');


      $('#largeModalConfirm').unbind('click').html('Run Query')
        .click(function (e) {
        BandRatioInstance.queryClick();
        $('#largeModal').modal('hide');
      });
    }
  });
}


function populateRegionSelector() {
  var html = '';
  for (region in regions) {
    html += ('<option value="' + region + '">' + regions[region].name + '</option>');
  }

  $('#regionSelector').html(html);
}

/*
*/
function loadRegion(e) {
  var region = $('#regionSelector').val();

  //Load region data
  data = regions[region];
  getODEfootprints('CRISM footprints', data.westernlon, data.easternlon, data.minlat, data.maxlat);

  // WMS
  // Remove previously loaded WMS layers
  for(var i = 0; i < WMSlayers.length; i++) {
    map.removeLayer(WMSlayers[i]);
  }

  //reset the TOC overlayes panel

  // Add new WMS layers
  wms = data['wms'];
  for(var i = 0; i < wms.length; i++) {
    temp = new OpenLayers.Layer.MapServer(wms[i].name,
      planetserver_ms_wms,
      {map: wms[i].map, layers: wms[i].layer, projection: wms[i].projection},
          {isBaseLayer: false, transitionEffect: 'resize'}
    );
    map.addLayers([temp]);
    WMSlayers[i] = temp;
    addCheckboxInOverlayesPanel(i, wms[i].name)
  }
  map.addLayers([footprints]);
  map.zoomToExtent(footprints.getDataExtent());

  //Load data to the secondary comboBox

  // DTM
  dtm = data['dtm'];
  var dtmData = [];
  //add a default value
  dtmData.push({'val': 'mola', 'name': 'MOLA'});
  //add the dtm values
  for(var i = 0; i < dtm.length; i++) {
    dtmData.push({'val': dtm[i].collection, 'name': dtm[i].name});
  }

  $('#loadRegionBtn').button('reset');

  e.preventDefault();
};

function addCheckboxInOverlayesPanel(idx, labelCheck) {
  var html_tmpl = [
    '<a href="javascript:void(0);" id="',
    'checkOverlay_',
    idx,
    '" class="btn btn-default btn-block active" role="button">',
    labelCheck,
    '</a>'
    ].join('');
  $('#tocModal .modal-body').first().append(html_tmpl);
  $('#checkOverlay_'+idx).click(function() {
    if ($(this).hasClass('active')) {
      WMSlayers[idx].setVisibility(false);
      $(this).removeClass('active');
    } else {
      WMSlayers[idx].setVisibility(true);
      $(this).addClass('active');
    }
  });
}

function addCheckbox(idx, labelCheck) {
  var html_tmpl = [
    '<a href="javascript:void(0);" id="',
    'checkImage_',
    idx,
    '" class="btn btn-default btn-block active" role="button">',
    labelCheck,
    '</a>'
    ].join('');
  $('#tocModal .modal-body').first().append(html_tmpl);
  $('#checkImage_'+idx).click(function() {
    if ($(this).hasClass('active')) {
      PNGimages[idx].setVisibility(false);
      $(this).removeClass('active');
    } else {
      PNGimages[idx].setVisibility(true);
      $(this).addClass('active');
    }
  });
}