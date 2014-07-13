function initSpectralAnalysis () {
  var spectralHandler = new OpenLayers.Handler.Click({'map': map}, {'click': handleSpectralClick})
  var $toggle = $('#toggleSpectral');
  $toggle.click(function(e) {
    if ($toggle.hasClass('active')) {
      spectralHandler.deactivate();
      $toggle.removeClass('active');
    } else {
      spectralHandler.activate();
      $toggle.addClass('active');
    }
  });

  $('#spectraModal').on('shown.bs.modal', function (e) {
    if (spectra && (typeof spectra.replot) === 'function') {
      spectra.replot();
    }
  });

  $('#openSpectra').click(function (e) {
    $('#spectraModal').modal('show');
  });
}

function handleSpectralClick (e) {
  pos = pos || 0;
  var lonlat = map.getLonLatFromPixel(e.xy);
  var lon = lonlat.lon;
  var lat = lonlat.lat;

  if (getSpectrum(lon, lat)) {
    var origin = {
      x: lon,
      y: lat
    };

    var circleout = new OpenLayers.Geometry.Polygon.createRegularPolygon(origin, pointsize, 50);
    var circle = new OpenLayers.Feature.Vector(circleout, {fcolor: colors[pos]});
    vector_layer.addFeatures(circle);
    pos++;
    if (pos == nrclicks) {
      pos = 0;
    }
  }
}

function getSpectrum (lon, lat) {
  var collection = hsdataset[hstype].collection;
  var xmin = hsdataset[hstype].left;
  var xmax = hsdataset[hstype].right;
  var ymin = hsdataset[hstype].bottom;
  var ymax = hsdataset[hstype].top;
  // if you click within the extent of the WCPS PNG:
  if ((lon >= xmin) && (lon <= xmax) && (lat >= ymin) && (lat <= ymax)) {
    xy = lltoimagecrs(lon,lat);
    imagex = xy[0];
    imagey = xy[1];
    var i = Math.floor(binvalue/2);
    xplus = (imagex + i).toString();
    xmin = (imagex - i).toString();
    yplus = (imagey + i).toString();
    ymin = (imagey - i).toString();
    var response = getBinary(planetserver_wcps + '?query=for data in ( ' + hsdataset[hstype].collection + ' ) return encode(  (data[E:"CRS:1"(' + xmin + ':' + xplus + '),N:"CRS:1"(' + ymin + ':' + yplus + ')]), "csv")');
    var spectrabin = getbin(response);
    
    if (spectrabin == -1) 
      return false;
    
    if (pos == (nrclicks -1))
      full = 1;
    
    var avgspectrum = avgbin(spectrabin);
    var values = [];
    if (hsdataset.ratio_divisor === undefined) {
      for (var i = 0; i < avgspectrum.length; i++) {
        var wavelength = hsdataset[hstype].metadata.wavelength[i];
        if (avgspectrum[i] != hsdataset.nodata) {
          values.push([wavelength, avgspectrum[i]]);
        } else {
          values.push([wavelength, null]);
        }
      }
    } else {
      for (var i = 0; i < avgspectrum.length; i++) {
        var wavelength = hsdataset[hstype].metadata.wavelength[i];
        if ((hsdataset.ratio_divisor.divisor[i] == null) || (avgspectrum[i] == null)) {
          values.push([wavelength, null]);
        } else {
          var ratio = parseFloat(avgspectrum[i], 10)/parseFloat(hsdataset.ratio_divisor.divisor[i], 10);
          if (ratio > 10) {
            values.push([wavelength, null]);
          } else {
            values.push([wavelength, ratio]);
          }
        }
      }
    }
    hsdataset.values = values;
    var locdata = {};
    var lonlat = new OpenLayers.LonLat(lon, lat);
    locdata.lonlat = lonlat;
    locdata.spectrum = values;
    hsdataset.point[pos] = locdata;
    var output = [];
    var loopLimit = (full === 1) ? nrclicks : (pos+1);
    for (var i = 0; i < loopLimit; i++) {
      output.push(hsdataset.point[i].spectrum);
    }
    spectrumLoad(output, colors, hsdataset[hstype].collection);
    return true;
  }

  return false;
}

function spectrumLoad(numbers, colors, title) {
  // console.log(numbers);
  $.jqplot.config.enablePlugins = true;
  spectra = $.jqplot('spectraChart', numbers, {
    title: title,
    cursor: {
      show: true,
      zoom: true
    },
    highlighter: {
      show: true
    },
    series: [{breakOnNull: true}],
    seriesDefaults: {
      renderer: $.jqplot.LineRenderer,
      lineWidth: 1,
      rendererOptions: {
        smooth: true,
        animation: {
          show: true
        }
      },
      showMarker: false,
      pointLabels: {
        show: false
      },
    },
    axes: {
      xaxis: {
        pad: 1.1
      },
      yaxis: {
        pad: 1.1
      }
    },
    seriesColors: colors
  });
  spectra.replot();
}