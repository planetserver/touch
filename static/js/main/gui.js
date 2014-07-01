var toggleBands;
var toggleQuery;
var toggleSpectrum;
var toggleX3d;
var toggleTutorial;
var toggleAbout;
var permalink;

function initguievents()
    {
    // now uses OpenLayers.Control.Button but could use another way of dealing with buttons

    toggleBands = new OpenLayers.Control.Button({
        title: "Show/hide table of contents window", displayClass: "olControlToggleBands", trigger: function(){ toggleDisplay('toc'); }
    });  

    toggleQuery = new OpenLayers.Control.Button({
        title: "Show/hide console window", displayClass: "olControlToggleQuery", trigger: function(){ toggleDisplay('query'); }
    }); 
    toggleSpectrum = new OpenLayers.Control.Button({
        title: "Show/hide diagram window", displayClass: "olControlToggleSpectrum", trigger: function(){ toggleDisplay('spectra'); }
    });
    toggleX3d = new OpenLayers.Control.Button({
        title: "Show/hide X3D window", displayClass: "olControlToggleX3d", trigger: function(){ toggleDisplay('x3d'); }
    });
    toggleTutorial = new OpenLayers.Control.Button({
        title: "Tutorial", displayClass: "olControlToggleTutorial", trigger: function(){ toggleDisplay('tutorial'); }
    });
    toggleAbout = new OpenLayers.Control.Button({
        title: "About", displayClass: "olControlToggleAbout", trigger: function(){ toggleDisplay('about'); }
    });
    permalink = new OpenLayers.Control.Button({
        title: "Permalink", displayClass: "olControlPermalink", trigger: function(){ window.location = $('#permalink').attr('href'); }
    });
    }

function switch_tabs(obj)
{
	$('.tab-content').hide();
	$('.tabs a').removeClass("selected");
	var id = obj.attr("rel");
 
	$('#'+id).show();
	obj.addClass("selected");

	if (typeof spectra != 'undefined') spectra.replot();
	if (typeof hist != 'undefined') hist.replot();
	if (typeof cross != 'undefined') cross.replot();
}

function switch_tabs1(obj)
{
	$('.tab-content1').hide();
	$('.tabs1 a').removeClass("selected1");
	var id = obj.attr("rel");
 
	$('#'+id).show();
	obj.addClass("selected1");
}

function switch_tabs2(obj)
{
	$('.tab-content2').hide();
	$('.tabs2 a').removeClass("selected2");
	var id = obj.attr("rel");
 
	$('#'+id).show();
	obj.addClass("selected2");
}

function inittabs()
    {
    // diagram window tabs
    $('.tabs a').click(function(){
        switch_tabs($(this));
    });

    var obj = $('.defaulttab');
    $('.tab-content').hide();
    $('.tabs a').removeClass("selected");

    var id = obj.attr("rel");
    $('#'+id).show();
    obj.addClass("selected");
    
    // about window tabs
    $('.tabs1 a').click(function(){
        switch_tabs1($(this));
    });

    var obj1 = $('.defaulttab1');
    $('.tab-content1').hide();
    $('.tabs1 a').removeClass("selected1");    

    var id = obj1.attr("rel");
    $('#'+id).show();
    obj1.addClass("selected1");
    }

function inittoctabs()
    {
    // toc window tabs
    $('.tabs2 a').click(function(){
        switch_tabs2($(this));
    });

    var obj2 = $('.defaulttab2');
    $('.tab-content2').hide();
    $('.tabs2 a').removeClass("selected2");    

    var id = obj2.attr("rel");
    $('#'+id).show();
    obj2.addClass("selected2");
    }

//
function adjustCSS() {
	$("#map").css(
	{
	//'height': ($(window).height() - 10) + 'px'
	//'height': '100%'		
	/* changed to add the status bar div
	'height': ($(window).height() - 50) + 'px'		
	  'height': ($(window).height() - 100) + 'px'
	*/
	//'height': ($(window).height() - 142) + 'px'


	//'height': ($(window).height() - 178) + 'px'	//OK


	  /*'height': ($(window).height() - 115) + 'px'*/
	});
	/*$("#toc").css(
	{
	  'height': ($(window).height() * 0.74) + 'px'
	});*/
	/*$("#dimensions").css(
	{
	  'height': ($(window).height() * 0.58) + 'px'
	});*/
	$("#bandselect").css(
	{
	  'height': ($(window).height() * 0.4) + 'px'
	});
	/*$("#spectra").css(
	{
	  'height': ($(window).height() * 0.495) + 'px'
	});*/
	$("#spectra").css(
	{
	  'width': ($(window).width() * 0.275) + 'px'
	});
	$("#chartPlace").css(
	{
	  'width': ($(window).width() * 0.27) + 'px'
	});
	$("#chartPlace").css(
	{
	  'height': ($(window).height() * 0.45) + 'px'
	});
	$("#histPlace").css(
	{
	  'width': ($(window).width() * 0.27) + 'px'
	});
	$("#histPlace").css(
	{
	  'height': ($(window).height() * 0.45) + 'px'
	});
	$("#crossPlace").css(
	{
	  'width': ($(window).width() * 0.27) + 'px'
	});
	$("#crossPlace").css(
	{
	  'height': ($(window).height() * 0.45) + 'px'
	});
	$("#query").css(
	{
	  'width': ($(window).width() * 0.405) + 'px'
	});
	$(".console").css(
	{
	  'height': ($(window).height() * 0.11) + 'px'
	  //'height': '180px'
	});
	$(".console").css(
	{
	  'width': ($(window).width() * 0.405) + 'px'
	  //'width': '580px'
	});
	$(".console .jquery-console-inner").css(
	{
	  'height': ($(window).height() * 0.11) + 'px'
	});
	$("#query").css(
	{
	  //'margin-top': (($("#query").outerHeight() + 10) * (-1) ) + 'px'
	});
}

function resizecss()
    {
	$(window).resize(function() {
		$("#map").css({
				'height': ($(window).height() - 132) + 'px',
				/*'height': '100%'*/	
				'width': '100%'
		});
	});

	/*** Commented by swingit ***
    adjustCSS();
    $(window).resize(function()
    {
        adjustCSS();
        if (typeof spectra != 'undefined') spectra.replot();
        if (typeof hist != 'undefined') hist.replot();
        if (typeof cross != 'undefined') cross.replot();
    });
	*** Commented by swingit (end) ***/
    }

function resizeMap() {
	$(window).resize(function() {
		$("#map").css({
				'height': ($(window).height() - 84) + 'px'
		});
		$("#map").css({
				'width': $(window).width() + 'px'
				//'width': '100%'
		});
	});

}

function initdragwindows()
    {
    $.getScript('http://code.jquery.com/ui/1.10.3/jquery-ui.js', function() {
        $('#spectra')
            .draggable({ containment: "parent", distance: 1, handle: "#title-wrapper" });
        $('#toc')
            .draggable({ containment: "parent", distance: 1, handle: "#title-wrapper" })
        $('#query')
            .draggable({ containment: "parent", distance: 1, handle: "#title-wrapper" });
        $('#about')
            .draggable({ containment: "parent", distance: 1, handle: "#title-wrapper" });
        $('#tutorial')
            .draggable({ containment: "parent", distance: 1, handle: "#title-wrapper" });
        $('#x3d')
            .draggable({ containment: "parent", distance: 1, handle: "#title-wrapper" });
        $('#vnirorir')
            .draggable({ containment: "parent", distance: 1, handle: "#title-wrapper" });
        });
    }
