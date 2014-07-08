var BandRatioInstance;
var BandToWaveLength;

function createBRClient() {
   BandRatioInstance = new BandRatioClient({
      petascopeURL_GET: 'http://planetserver.jacobs-university.de/wcps.php?use=png&query=',
      petascopeURL_POST: 'http://planetserver.jacobs-university.de:8080/rasdaman/ows/wcps',
      min_query: 'for a in (COLLECTION) return encode ( min(a.FREQ), "csv")',
      max_query: 'for a in (COLLECTION) return encode( max((a.FREQ * (a.FREQ != 9.96921e+36))), "csv")',
      avg_query: 'for a in (COLLECTION) return encode( ( (float)add((a.FREQ * (a.FREQ != 9.96921e+36))) / count(( (a.FREQ != 9.96921e+36))) ), "csv")',
      callback: function (src, query) {
         var i = PNGimages.length;
         var temp = {};
         temp.type = 'RGB';
         temp.base64 = base64Encode(getBinary(src));
         temp.string = '???';
         imagedata[i] = temp;
         PNGimages[i] = new OpenLayers.Layer.Image(
            'RGB',
            'data:image/png;base64,' + temp.base64,
            hsdataset.bbox,
            new OpenLayers.Size(hsdataset.width, hsdataset.height),
            hsdataset.mapoptions
            );
         map.addLayers([PNGimages[i]]);

         var query = BandRatioInstance.operationQuery;
         var matches = query.match(/data\.\d+/g);
         for (var j = 0; j < matches.length; j++) {
            var idx = parseInt(matches[j].replace('data.', ''));
            var str = '(' + parseFloat(hsdataset.ir.metadata.wavelength[idx]) + ' µm)';
            query = query.replace(matches[j], str);
         }
         addCheckbox(i, query);
      }
   });
}

var BANDRATIO_TEMPLATE = '';
BANDRATIO_TEMPLATE += '<div id="main">';
BANDRATIO_TEMPLATE += '   <div id="top_cont">';
BANDRATIO_TEMPLATE += '      <div id="math_ops" class="top_inline">';
BANDRATIO_TEMPLATE += '         <h4 id="bandratio_top_headline">';
BANDRATIO_TEMPLATE += '            Choose Math operator';
BANDRATIO_TEMPLATE += '         </h4>';
BANDRATIO_TEMPLATE += '         <div class="chiclet op" id="plus">';
BANDRATIO_TEMPLATE += '            +';
BANDRATIO_TEMPLATE += '         </div>';
BANDRATIO_TEMPLATE += '         <div class="chiclet op" id="minus">';
BANDRATIO_TEMPLATE += '            -';
BANDRATIO_TEMPLATE += '         </div>';
BANDRATIO_TEMPLATE += '         <div class="chiclet op" id="divide">';
BANDRATIO_TEMPLATE += '            /';
BANDRATIO_TEMPLATE += '         </div>';
BANDRATIO_TEMPLATE += '         <div class="chiclet op" id="multiply">';
BANDRATIO_TEMPLATE += '            *';
BANDRATIO_TEMPLATE += '         </div>';
BANDRATIO_TEMPLATE += '         <div class="chiclet num" id="number">';
BANDRATIO_TEMPLATE += '            <span>const</span>';
BANDRATIO_TEMPLATE += '         </div>';
BANDRATIO_TEMPLATE += '         <div class="chiclet num" id="max">';
BANDRATIO_TEMPLATE += '            <span>max()</span>';
BANDRATIO_TEMPLATE += '         </div>';
BANDRATIO_TEMPLATE += '         <div class="chiclet" id="min">';
BANDRATIO_TEMPLATE += '            <span>min()</span>';
BANDRATIO_TEMPLATE += '         </div>';
BANDRATIO_TEMPLATE += '         <div class="chiclet" id="avg">';
BANDRATIO_TEMPLATE += '            <span>avg()</span>';
BANDRATIO_TEMPLATE += '         </div>';
BANDRATIO_TEMPLATE += '         <div class="chiclet" id="median">';
BANDRATIO_TEMPLATE += '            <span>median()</span>';
BANDRATIO_TEMPLATE += '         </div>';
BANDRATIO_TEMPLATE += '      </div>';
BANDRATIO_TEMPLATE += '        <button id="show_query" class="btn btn-primary">';
BANDRATIO_TEMPLATE += '         Show Query';
BANDRATIO_TEMPLATE += '      </button>';
BANDRATIO_TEMPLATE += '      <input class="hidden" id="_contrast"/>';
BANDRATIO_TEMPLATE += '      <div id="filter_section"><span id="freq_display">Frequency Filter: <strong class="min">1</strong>&mu;m - <strong class="max">4</strong>&mu;m</span><div id="freq_filter"></div></div>';
BANDRATIO_TEMPLATE += '   </div>';
BANDRATIO_TEMPLATE += '   <div id="left_cont">';
BANDRATIO_TEMPLATE += '      <div id="freqs" class="top_inline">';
BANDRATIO_TEMPLATE += '         <h4>';
BANDRATIO_TEMPLATE += '            Choose light frequency';
BANDRATIO_TEMPLATE += '         </h4>';
BANDRATIO_TEMPLATE += '[[BANDS]]';
BANDRATIO_TEMPLATE += '      </div>';
BANDRATIO_TEMPLATE += '   </div>';
BANDRATIO_TEMPLATE += '   <div id="drop_panel">';
BANDRATIO_TEMPLATE += '      <div id="bin">';
BANDRATIO_TEMPLATE += '      </div>';
BANDRATIO_TEMPLATE += '      <h4 id="drop_text">Drop elements on to this panel</h4>';
BANDRATIO_TEMPLATE += '   </div>';
BANDRATIO_TEMPLATE += '   <div id="display_img">';
BANDRATIO_TEMPLATE += '      <img class="wcps_response" />';
BANDRATIO_TEMPLATE += '   </div>';
BANDRATIO_TEMPLATE += '   <div class="clearfix"></div>';
BANDRATIO_TEMPLATE += '   <div id="wcps_out" style="display:none;">';
BANDRATIO_TEMPLATE += '      <p id="wcps_text"></p>';
BANDRATIO_TEMPLATE += '   </div>';
BANDRATIO_TEMPLATE += '</div>';
BANDRATIO_TEMPLATE += '<div id="plus_temp" class="plus_holder drop_item hide holder" data-cont="plus_cont">';
BANDRATIO_TEMPLATE += '   <div class="drop_plus_1 drop_1" data-type="plus_1" data-bin="1"></div>';
BANDRATIO_TEMPLATE += '   <span class="plus_icon">+</span>';
BANDRATIO_TEMPLATE += '   <div class="drop_plus_2 drop_2" data-type="plus_2" data-bin="2"></div>';
BANDRATIO_TEMPLATE += '</div>';
BANDRATIO_TEMPLATE += '<div id="minus_temp" class="minus_holder drop_item hide holder">';
BANDRATIO_TEMPLATE += '   <div class="drop_minus_1 drop_1" data-type="minus_1" data-bin="1"></div>';
BANDRATIO_TEMPLATE += '   <span class="minus_icon">-</span>';
BANDRATIO_TEMPLATE += '   <div class="drop_minus_2 drop_2" data-type="minus_2" data-bin="2"></div>';
BANDRATIO_TEMPLATE += '</div>';
BANDRATIO_TEMPLATE += '<div id="divide_temp" class="divide_holder drop_item hide holder">';
BANDRATIO_TEMPLATE += '   <div class="drop_divide_1 drop_1" data-type="divide_1" data-bin="1"></div>';
BANDRATIO_TEMPLATE += '   <span class="minus_icon">/</span>';
BANDRATIO_TEMPLATE += '   <div class="drop_divide_2 drop_2" data-type="divide_2" data-bin="2"></div>';
BANDRATIO_TEMPLATE += '</div>';
BANDRATIO_TEMPLATE += '<div id="multiply_temp" class="multiply_holder drop_item hide holder">';
BANDRATIO_TEMPLATE += '   <div class="drop_multiply_1 drop_1" data-type="multiply_1" data-bin="1"></div>';
BANDRATIO_TEMPLATE += '   <span class="multiply_icon">*</span>';
BANDRATIO_TEMPLATE += '   <div class="drop_multiply_2 drop_2" data-type="multiply_2" data-bin="2"></div>';
BANDRATIO_TEMPLATE += '</div>';

var currentCollection;

function templateBands() {
   var bands = '';
   var numBands = parseInt(hsdataset.bands);
   for (var i = 0; i < numBands; i++) {
      bands += '<div class="chiclet ';
      if (hsdataset.ir.metadata.bbl[i] == 0) {
         bands += 'badBand';
      } else {
         bands += 'goodBand';
      }
      bands += '" id="data.';
      bands += (i+1);
      bands += '">Band ';
      bands += (i+1);
      bands += ' (';
      bands += parseFloat(hsdataset.ir.metadata.wavelength[i]);
      bands += ')</div>';
   }
   return BANDRATIO_TEMPLATE.replace('[[BANDS]]', bands);
}

function filterBands(min, max) {
   var bands = '';
   var numBands = parseInt(hsdataset.bands);
   // var allBands = hsdataset.ir.metadata.slice(0, numBands);
   var bandRange = _.range(numBands);

   var filteredBands = _.filter(bandRange, function (idx) {
      var wavelength = parseFloat(hsdataset.ir.metadata.wavelength[idx]);
      var check = (wavelength >= min && wavelength <= max);
      console.log(check)
      return check;
   });

   console.log(filteredBands);
   for (var i = 0; i < filteredBands.length; i++) {
      var idx = filteredBands[i];
      console.log(idx)
      bands += '<div class="chiclet ';
      if (hsdataset.ir.metadata.bbl[idx] == 0) {
         bands += 'badBand';
      } else {
         bands += 'goodBand';
      }
      bands += '" id="data.';
      bands += (idx+1);
      bands += '">Band ';
      bands += (idx+1);
      bands += ' (';
      bands += parseFloat(hsdataset.ir.metadata.wavelength[idx]);
      bands += ')</div>';
   }
   $('#freqs > .chiclet').remove();
   $('#freqs').append(bands);
}

var Ext = Ext || {onReady:function(){}};

Ext.onReady(function() {
    winBandRatio = Ext.widget('window', {
      id: 'bandRatioWindow',
        title: 'PlanetServer Band Ratio Analysis',
        modal: true,
      closable: false,
      contentEl: Ext.getDom('container_bandratio'),
        width: 800,
        height: 600,
      layout: 'fit',
        autoScroll: true,
      dockedItems: [
         {
            xtype: 'toolbar',
            dock: 'top',
            items: [
               { xtype: 'tbfill' },
               {
                  xtype: 'button',
                  text: 'Full Screen',
                  iconCls: 'imgZoomIn',
                  handler: function() {
                     if (this.getText() == 'Full Screen') {
                        winBandRatio.maximize();   
                        this.setText('Minimize');
                        this.setIconCls('imgZoomOut');
                     } else {
                        winBandRatio.restore();
                        this.setText('Full Screen');
                        this.setIconCls('imgZoomIn');
                     }  
                  }
               },
            ],
         },
         {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
               { xtype: 'tbfill' },
               {
                  xtype: 'button',
                  id: 'close',
                  text: 'Close',
                  listeners: {
                     click: function() {
                        winBandRatio.hide();
                        delete BandRatioInstance;
                        $('#container_bandratio').html(templateBands());
                     }
                  }
               },
               {
                  xtype: 'button',
                  id: 'execute',
                  text: "Run Query",
                  listeners: {
                     click: function() {
                        if (BandRatioInstance) {
                           BandRatioInstance.queryClick();
                           winBandRatio.hide();
                        }
                     }
                  }
               }
            ],
         }//toolbar
      ],//docked
      listeners: {
         activate: function() {
            if (currentCollection != hsdataset.collection) {
               winBandRatio.maximize();
               $('#container_bandratio').html(templateBands());
               createBRClient();
               currentCollection = hsdataset.collection;
            }
         },
      },
   });
});
