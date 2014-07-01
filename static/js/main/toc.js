var layerSwitcher;

function inittoc()
    {
    // changed OpenLayers.js line 2808 - "roundedCorner:false" to fix the display of layerswitcher inside toc
    // changed OpenLayers.js line 2820 - this.dataLbl.innerHTML=OpenLayers.i18n("");
    // chnged OpenLayers.js line 2137 - this.eBottom.style.visibility="none";
    layerSwitcher = new OpenLayers.Control.LayerSwitcher({'div':OpenLayers.Util.getElement('layerswitcher')});
    layerSwitcher.ascending = false;
    layerSwitcher.useLegendGraphics = true;
    map.addControl(layerSwitcher);
    // END
    }

function loadtoc()
    {
    // Fill TOC
    $("#toc").html('<div id="title-wrapper"><div id="title">TABLE OF CONTENTS</div></div><div id="close-wrapper"><a href="javascript:void(0)" onclick="toggleDisplay(&quot;toc&quot;)">X</a></div></br></br><div id="layerswitcher"></div><div id="dimensions"></div><div id="bandlist"></div>');
    // Band list
    var bandoptions = '';
    var len = parseInt(hsdataset.bands);
    for (var i = 0; i < len; i++) {
        bandnr = 'band' + (i+1);
        if(hsdataset.metadata.bbl[i] == 0)
            {
            bandoptions += '<option value="' + bandnr + '">' + bandnr + ' (' + hsdataset.metadata.wavelength[i] + ') (bad)</option>';
            }
        else
            {
            bandoptions += '<option value="' + bandnr + '">' + bandnr + ' (' + hsdataset.metadata.wavelength[i] + ')</option>';
            }
    }       
    //var html2 = '<input class="pnglayer" type="checkbox" value="0" checked="true"/><span href="javascript:void(0)" onclick="toggleDisplay(&quot;dimensions&quot;);toggleDisplay(&quot;pngselect&quot;)"><img id="special" src="images/collapse.png"/></span>&nbsp;' + PNGimages[0].name;
    var html2 = '<input class="pnglayer" type="checkbox" value="0" checked="true"/><span href="javascript:void(0)" onclick="toggleDisplay(&quot;dimensions&quot;);toggleDisplay(&quot;pngselect&quot;)"><img id="special" src="/static/images/collapse.png"/></span>&nbsp;' + PNGimages[0].name;
    //var overlay = jQuery('<select multiple="multiple" name="bandselect" id="bandselect"></select>');
    var overlay = jQuery('<ul class="tabs2"><li class="first"><a href="javascript:void(0)" class="defaulttab2" rel="tabs21">Bands</a></li><li><a href="javascript:void(0)" rel="tabs22">SP</a></li></ul><div class="tab-content2" id="tabs21"><select size=20 multiple="multiple" name="bandselect" id="bandselect"></select></div><div class="tab-content2" id="tabs22"><select size=20 multiple="multiple" name="spselect" id="spselect"></div>');
    var overlay2 = jQuery('<form id="pngsel"></form>');
    var overlay3 = jQuery('<form id="pngselect"></form>');
    var layerSwitcher = new OpenLayers.Control.LayerSwitcher({'div':OpenLayers.Util.getElement('layerswitcher')});
    map.addControl(layerSwitcher);
    $("#dimensions").append(overlay2);
    $("#dimensions").append(overlay3);
    $("#pngsel").append(html2);
    $("#dimensions").append('<div id="png"></div>');
    $("#dimensions").append(overlay);
    $('#bandselect').append(bandoptions);
    $("#bandlist").append(jQuery('<br><br>R: <input name="red" id="red" value="band70" />'));
    $("#bandlist").append(jQuery('<br>G: <input name="green" id="green" value="band80" />'));
    $("#bandlist").append(jQuery('<br>B: <input name="blue" id="blue" value="band90" />'));
    $("#bandlist").append(jQuery('<br><br><input type="button" name="greyquery" id="greyquery" value="Greyscale" />&nbsp;&nbsp;<input type="button" name="rgbquery" id="rgbquery" value="RGB" />'));
    adjustCSS();
    
    // SP list
    var spoptions = '';
    for (var key in sp)
        {
        spoptions += '<option value="' + sp[key.toString()] + '">' + key + '</option>';
        }
    $('#spselect').append(spoptions);
    }
    
function inittocevents()
    {
    $("#bandselect").click(function(e) {
        value = $('#bandselect').val();
        if(rgb == 0)
            {
            $('#red').val(value);
            rgb = 1;
            }
        else if(rgb == 1)
            {
            $('#green').val(value);
            rgb = 2;
            }
        else if(rgb == 2)
            {
            $('#blue').val(value);
            rgb = 0;
            }
        });
    $("#spselect").click(function(e) {
        value = $('#spselect').val();
        if(rgb == 0)
            {
            $('#red').val(value);
            rgb = 1;
            }
        else if(rgb == 1)
            {
            $('#green').val(value);
            rgb = 2;
            }
        else if(rgb == 2)
            {
            $('#blue').val(value);
            rgb = 0;
            }
        });
   
    $("#rgbquery").click(function(e) {
        red = band2data($('#red').val());
        green = band2data($('#green').val());
        blue = band2data($('#blue').val());
        rgbimage(red,green,blue);
    });
    $("#greyquery").click(function(e) {
        var calc;
        if($('.selected2').html() == "Bands")
            {
            calc = $('#bandselect').val();
            }
        else
            {
            var calc = $('#spselect').val();
            }
        if(calc==null)
            {
            alert("please select a band!");
            }
        else
            {
            image(calc);
            }
    });
    
    $('#histcalc').click(function(e) {
        var calc = $('#bandselect').val();
        if(calc==null)
            {
            alert("please select a band!");
            }
        else
            {
            var nrbins = $('#nrbins').val();
            histogram(band2data(calc.toString()),nrbins);
            }
    });
    
    // SHOW/HIDE PNG IMAGE WHEN CHECKED OR UNCHECKED
    $('.pnglayer').change(function() {
        i = $(this).val();
        //alert(i);
        if ($(this).is(':checked')) {
            // the checkbox was checked
            PNGimages[i].setVisibility(true);
        } 
        else {
            // the checkbox was unchecked
            PNGimages[i].setVisibility(false);        
        }
    });
    }


