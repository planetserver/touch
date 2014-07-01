// Set IR as default CRISM
var irDefaultImageLoaded = true;
var vnirDefaultImageLoaded = false;

var myLoader;

Ext.require([
    'Ext.form.*',
    'Ext.layout.container.Column',
    'Ext.window.MessageBox',
    'Ext.fx.target.Element'
]);

Ext.onReady(function () {

	myLoader = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});

	var countCheck = 1;
	var currentRGB = 'r';
	var currentIrBand = '';
	var currentVnirBand = '';
	var currentSpBand = '';

	//*****************************		IR grid		*******************************
	// Load data if it exits
	/**/
	var irData;
	if (typeof(hsdataset.bands) != 'undefined') {
		// read data bands
		var numBands = parseInt(hsdataset.bands);
		// create a data bands array
		irData = new Array(numBands);
		for (var i = 0; i < numBands; i++) {
			//bandnr = 'band' + (i+1);
			if(hsdataset.metadata.bbl[i] == 0)
			{
				irData[i] = ['band ' + i, parseFloat(hsdataset.metadata.wavelength[i]), 0];	// 0=BAD
			}
			else
			{
				irData[i] = ['band ' + i, parseFloat(hsdataset.metadata.wavelength[i]), 1];	// 1=OK
			}
		}     
	} else {
		irData = [];
	};

	/*
	function irWavelength(val){
		if(val < 2){
		    return '<span style="color:green;">' + val + '</span>';
		}else if(val < 3){
		    return '<span style="color:red;">' + val + '</span>';
		}
		return val;
	}
	*/
	function irBad(val) {
		if (val == 'no') {
		    return '<span style="color:green;">' + val + '</span>';
		} else {
		    return '<span style="color:red;">' + val + '</span>';
		}
		return val;
	}

	// create the data store
	var irStore = new Ext.data.ArrayStore({
		fields: [
		   {name: 'irBandNr'},
		   {name: 'irWavelength', type: 'float'},
		   {name: 'irBad'}
		]
	});
	irStore.loadData(irData);

	// create the Grid
	var irGrid = new Ext.grid.GridPanel({
		id: 'irGridId', //ID of the Window Panel
		store: irStore,
		columns: [
		    {id:'bandNr',header: "Band Nr.", width: 80, sortable: true, dataIndex: 'irBandNr'},
		    {header: "Wavelength", width: 130, sortable: true, dataIndex: 'irWavelength'},
		    {header: "Bad", width: 40, sortable: true, renderer: irBad, dataIndex: 'irBad'}
		],
		stripeRows: true,
		//autoExpandColumn: 'company',
		height: 130,
		//width: 239,
		width: 269,
		//title:'Array Grid'
	});

	// selectionchange event
	//irGrid.on('selectionchange', function(view, nodes){
	irGrid.on('itemclick', function(view, nodes){
		if (irGrid.getSelectionModel().hasSelection()) {
			var gridRow = irGrid.getSelectionModel().getSelection()[0];
			//alert('Band N. = ' + gridRow.get('irBandNr') + ' - Wavelength = ' + gridRow.get('irWavelength'));	    }
			currentIrBand = gridRow.get('irBandNr');
			if (currentRGB == 'r') {
				var r = Ext.getCmp('txtR');
				r.setValue(currentIrBand);
				currentRGB = 'g';		
			} else if (currentRGB == 'g') {
				var g = Ext.getCmp('txtG');
				g.setValue(currentIrBand);
				currentRGB = 'b';		
			} else {
				var b = Ext.getCmp('txtB');
				b.setValue(currentIrBand);
				currentRGB = 'r';		
			}
			//rgbPanel.getForm().reset();
		}
	});

	//*****************************		END - IR grid		*******************************

	//*****************************		VNIR grid		*******************************
	// Load data if it exits
	/**/
	var vnirData;
	if (typeof(hsdataset.vnir.bands) != 'undefined') {
		// read data bands
		var numBands = parseInt(hsdataset.vnir.bands);
		// create a data bands array
		vnirData = new Array(numBands);
		for (var i = 0; i < numBands; i++) {
			//bandnr = 'band' + (i+1);
			if(hsdataset.metadata.bbl[i] == 0)
			{
				vnirData[i] = ['band ' + i, hsdataset.vnir.metadata.wavelength[i], 'yes'];	// 0=BAD
			}
			else
			{
				vnirData[i] = ['band ' + i, hsdataset.vnir.metadata.wavelength[i], 'no'];	// 1=OK
			}
		}     
	} else {
		vnirData = [];
	};

	function vnirBad(val) {
		if (val == 'no') {
		    return '<span style="color:green;">' + val + '</span>';
		} else {
		    return '<span style="color:red;">' + val + '</span>';
		}
		return val;
	}

	// create the data store
	var vnirStore = new Ext.data.ArrayStore({
		fields: [
		   {name: 'vnirBandNr'},
		   {name: 'vnirWavelength', type: 'float'},
		   {name: 'vnirBad'}
		]
	});
	vnirStore.loadData(vnirData);

	// create the Grid
	var vnirGrid = new Ext.grid.GridPanel({
		id: 'vnirGridId', //ID of the Window Panel
		store: vnirStore,
		columns: [
		    {id:'vnirBandNr',header: "Band Nr.", width: 80, sortable: true, dataIndex: 'vnirBandNr'},
		    {header: "Wavelength", width: 130, sortable: true, dataIndex: 'vnirWavelength'},
		    {header: "Bad", width: 40, sortable: true, renderer: vnirBad, dataIndex: 'vnirBad'}
		],
		stripeRows: true,
		//autoExpandColumn: 'company',
		height: 130,
		//width: 239,
		width: 269,
		//title:'Array Grid'
	});

	// selectionchange event
	//vnirGrid.on('selectionchange', function(view, nodes){
	vnirGrid.on('itemclick', function(view, nodes){
		if (vnirGrid.getSelectionModel().hasSelection()) {
			var gridRow = vnirGrid.getSelectionModel().getSelection()[0];
			//alert('Band N. = ' + gridRow.get('vnirBandNr') + ' - Wavelength = ' + gridRow.get('vnirWavelength'));	    }
			currentVnirBand = gridRow.get('vnirBandNr');
			if (currentRGB == 'r') {
				var r = Ext.getCmp('txtR');
				r.setValue(currentVnirBand);
				currentRGB = 'g';		
			} else if (currentRGB == 'g') {
				var g = Ext.getCmp('txtG');
				g.setValue(currentVnirBand);
				currentRGB = 'b';		
			} else {
				var b = Ext.getCmp('txtB');
				b.setValue(currentVnirBand);
				currentRGB = 'r';		
			}
			//rgbPanel.getForm().reset();
		}
	});

	//*****************************		END - VNIR grid		*******************************


	//*****************************		SP grid		*******************************
	spData = [];
	// create the data store
	var spStore = new Ext.data.ArrayStore({
		fields: [
		   {name: 'key'},
		   {name: 'spValue'}
		]
	});

    	spStore.loadData(spData);

	// create the Grid
	var spGrid = new Ext.grid.GridPanel({
		id: 'spGridId', //ID of the Window Panel
		store: spStore,
		columns: [
		    {id:'keyId', header: "Key", width: 80, sortable: true, dataIndex: 'key'},
		    {header: "Value", width: 170, sortable: true, dataIndex: 'spValue'}
		],
		stripeRows: true,
		height: 130,
		//width: 239,
		width: 269,
		//title:'Array Grid'
	});

	spGrid.on('itemclick', function(view, nodes){
		if (spGrid.getSelectionModel().hasSelection()) {
			var gridRow = spGrid.getSelectionModel().getSelection()[0];
			currentSpBand = gridRow.get('spValue');
			if (currentRGB == 'r') {
				var r = Ext.getCmp('txtR');
				r.setValue(currentSpBand);
				currentRGB = 'g';		
			} else if (currentRGB == 'g') {
				var g = Ext.getCmp('txtG');
				g.setValue(currentSpBand);
				currentRGB = 'b';		
			} else {
				var b = Ext.getCmp('txtB');
				b.setValue(currentSpBand);
				currentRGB = 'r';		
			}
		}
	});
	//*****************************		END - GRID SP		*******************************


	// Create data tabs 
	var irPanel = Ext.create('Ext.panel.Panel', {
		title: 'IR',
		items:  irGrid,
		itemId: 0
	});
	var vnirPanel = Ext.create('Ext.panel.Panel', {
		title: 'VNIR',
		items:  vnirGrid,
		itemId: 1
	});
	var spPanel = Ext.create('Ext.panel.Panel', {
		title: 'Summary products',
		items: spGrid,
		itemId: 2
	});
	var dataTabs = Ext.createWidget('tabpanel', {
		id: 'dataTabsId',
		activeTab: 1,
		//height: 175,
		height: 155,
		//width: 240,
		width: 270,
		plain: true,
		items: [irPanel, vnirPanel, spPanel],
		listeners: {
			'tabchange': function (dataTabs, tab) {
				copyDataset(dataTabs.getActiveTab().itemId);
				// reset form's fields
				currentRGB = 'r';
				Ext.getCmp('txtR').setValue('');
				Ext.getCmp('txtG').setValue('');
				Ext.getCmp('txtB').setValue('');
		    	}
		}
	});


	// create a panel for overlayers
	var overlayesPanel = Ext.create('Ext.FormPanel', {
		id: 'overlayesPanelId',
		title: 'Overlays',
		frame: true,
		//hidden: true,
		collapsible: true,
		//collapsed: true,
		autoScroll: true,
		/*
		fieldDefaults: {
		    labelWidth: 110,
		    labelStyle: 'color:green;padding-left:4px;'
		},
		*/
		x: 10,
		y: 5,
		//width: 270,
		width: 300,
		height: 120,
		//layout: 'fit',
		//bodyPadding: 10,
		padding: '2 10 2 10', //top, right, bottom, left
		margin: 0,
		items:[{
			xtype: 'checkboxgroup',
			//fieldLabel: 'Two Columns',
			// Arrange checkboxes into two columns, distributed vertically
			columns: 1,
			vertical: true,
			items: [{
			        xtype: 'checkbox',
			        boxLabel: 'MOLA RGB',
			        name: 'overlayes',
			        checked: true,
			        inputValue: 'molaRGB',
				margin : 0,
				handler: function () {
						if (this.getValue() == false) {
							GlobalMOLARGB.setVisibility(false);
						} else {
							GlobalMOLARGB.setVisibility(true);
						}
					}
				},
				{
			        xtype: 'checkbox',
			        boxLabel: 'THEMIS IR day',
			        name: 'overlayes',
			        checked: true,
			        inputValue: 'themisIR',
				margin : 0,
				handler: function () {
						if (this.getValue() == false) {
							GlobalTHEMISIRday.setVisibility(false);
						} else {
							GlobalTHEMISIRday.setVisibility(true);
						}
					}
				},
				{
			        xtype: 'checkbox',
				id: 'footprintsId',
			        boxLabel: 'CRISM footprints',
			        name: 'overlayes',
			        checked: true,
			        inputValue: 'footprints',
				handler: function () {
						if (this.getValue() == false) {
							footprints.setVisibility(false);
						} else {
							footprints.setVisibility(true);
						}
					}
			    	},
				/*
				{
			        xtype: 'checkbox',
				id: 'curiosityId',
			        boxLabel: 'Curiosity',
			        name: 'overlayes',
			        checked: true,
			        inputValue: 'curiosity',
				margin : 0,
				handler: function () {
						if (this.getValue() == false) {
							curiosity.setVisibility(false);
						} else {
							curiosity.setVisibility(true);
						}
					}
			    	},
				*/
				/*
				{
			        xtype: 'checkbox',
				id: 'galeHrscMosaicId',
			        boxLabel: 'Gale HRSC mosaic',
			        name: 'overlayes',
			        checked: true,
			        inputValue: 'galeHrscMosaic',
				//hidden: true,
				handler: function () {

					}
			    	},
				{
			        xtype: 'checkbox',
				id: 'galeCtxMosaicId',
			        boxLabel: 'Gale CTX mosaic',
			        name: 'overlayes',
			        checked: true,
			        inputValue: 'galeCtxMosaic',
				handler: function () {

					}
				}
				*/
			]
		}]





	});
	overlayesPanel.on('beforecollapse',function() { 
		winToc.height = winToc.height - 95;	// overlayePanel.height - 25 = 100
	});
	overlayesPanel.on('beforeexpand',function() { 
		winToc.height = winToc.height + 95;
	});

	// create a panel for overlayers
	var layersPanel = Ext.create('Ext.FormPanel', {
	//var layersPanel = Ext.create('Ext.form.Panel', {
		id: 'layersPanelId',
		title: 'Layers',
		frame: true,
		autoScroll: true,
		hidden: true,
		collapsible: true,
		//collapsed: true,
		x: 10,
		y: 10,
		//width: 270,
		width: 300,
		height: 150,
		//layout: 'fit',
		//padding: 10,
		padding: '0, 10, 5, 10', //top, right, bottom, left
		//padding: '2 10 2 10', //top, right, bottom, left
		margin: 0,
		//items: [overlayesContainer],
		tbar: [{
			text: 'Reset',
			iconCls: 'imgRefresh',
			//margin: '0, 0, 2, 0', //top, right, bottom, left
			handler: function () {
				window.location.reload();
				//window.location.href=window.location.href
				//history.go(0);
				}
			}, '-',
			{
			text: 'Select All',
			iconCls: 'imgSelectAll',
		    	handler: function () {
				var check;
				for (i=0; i<PNGimages.length; i++) {
					PNGimages[i].setVisibility(true); 
					check = Ext.getCmp('checkImageId_' + i);
					check.setValue(true);
				}
		    	}
			}, '-', 
			{
			text: 'Deselect All',
			iconCls: 'imgDeselectAll',
			handler: function () {
				var check;
				for (i=0; i<PNGimages.length; i++) {
					PNGimages[i].setVisibility(false); 
					check = Ext.getCmp('checkImageId_' + i);
					check.setValue(false);
				}
			}
			}]
	});
	layersPanel.on('beforecollapse',function() { 
		winToc.height = winToc.height - 125;
	});
	layersPanel.on('beforeexpand',function() { 
		winToc.height = winToc.height + 125;
	});

	var rgbPanel = new Ext.form.FormPanel({
		//standardSubmit: true,
		frame:true,
		//title: 'Download layer',
	 	padding: 10,
		//width: 240,
		width: 270,
		//x: 10,
		//y: 10,
		y: 5,
		//defaults: {width: 300, labelAlign : 'right'},
		fieldDefaults: {
			//labelAlign: 'top',
			labelAlign: 'right',
			labelWidth: 20,
			labelStyle: 'font-weight:bold',
			//width: 200
			width: 230
		},
		defaultType: 'textfield',
		items: [{
		id: 'txtR',
		fieldLabel: 'R:',
		name: 'r',
		allowBlank: true
	    	},{
		id: 'txtG',
		fieldLabel: 'G:',
		name: 'g',
		allowBlank: true
	    	},{
		id: 'txtB',
		fieldLabel: 'B:',
		name: 'b',
		allowBlank: true
	    	},
		{
		inputType: 'hidden',
		id: 'submitbutton',
		name: 'myhiddenbutton',
		value: 'hiddenvalue'
	    	}],
		buttons: [{
			text: 'Grayscale',
			handler: function(){				
					myLoader.show();			
					var activeTab = dataTabs.getActiveTab();
					if (activeTab.itemId == 0) {
						if(currentIrBand == '') {
							Ext.Msg.alert('Information', "Please select a IR band!");
						} else {
							//usedCrism = activeTab.itemId;
							image(currentIrBand);
						}
					} else if (activeTab.itemId == 1) {
						if(currentVnirBand == '') {
							Ext.Msg.alert('Information', "Please select a VNIR band!");
						} else {
							//usedCrism = activeTab.itemId;
							image(currentVnirBand);
						}
					} else {
						if(currentSpBand == '') {
							Ext.Msg.alert('Information', "Please select a SP band!");
						} else if (currentSpBand.search("NaN") != -1) {
							Ext.Msg.alert('Information', "Please select another SP band, this one isn't correct!");
						} else {
							//usedCrism = activeTab.itemId;
							image(currentSpBand);
						}
					}
					myLoader.hide();			
				}
			},{
			text: 'RGB',
			handler: function(){	
					myLoader.show();			
					var activeTab = dataTabs.getActiveTab();
					var red = Ext.getCmp('txtR').getValue();
					var green = Ext.getCmp('txtG').getValue();
					var blue = Ext.getCmp('txtB').getValue();
					if (activeTab.itemId != 2) {
						// Verify data
						if ((typeof(red) == "undefined") || (typeof(green) == "undefined") || (typeof(blue) == "undefined") || (red == '') || (green == '') || (blue == '')) {
							Ext.Msg.alert('Information', "It's impossible to load the layer.<br/>Insert all of RGB bands and try again.");
						} else {
							rgbimage(red, green, blue);
						}
					} else {
						if ((typeof(red) == "undefined") || (typeof(green) == "undefined") || (typeof(blue) == "undefined") || (red == '') || (green == '') || (blue == '')) {
							Ext.Msg.alert('Information', "It's impossible to load the layer.<br/>Insert all of RGB bands and try again.");
						} else if ((red.search("NaN") != -1) || (green.search("NaN") != -1) || (blue.search("NaN") != -1)) {
							Ext.Msg.alert('Information', "Please select another SP bands, these one aren't correct!");
						} else {
							rgbimage(red, green, blue);
						}
					}
					myLoader.hide();			
				}
			}
		],
		buttonAlign: 'center'
	});


	// create a panel with tabs for bands and SP
	var dataPanel = Ext.create('Ext.FormPanel', {
		id: 'dataPanelId', //ID of the Window Panel
		title: 'Data',
		frame: true,
		//frame: false,
		//hidden: true,
		collapsible: true,
		//collapsed: true,
		//bodyStyle : 'background:none', // Removes the default white background	
		/*
		fieldDefaults: {
		    labelWidth: 110,
		    labelStyle: 'color:green;padding-left:4px'
		},
		*/
		x: 10,
		y: 15,
		//width: 270,
		width: 300,
		//height: 355,
		height: 335,
		//bodyPadding: 10,
		padding: '5 10 2 10', //top, right, bottom, left
		items: [dataTabs, rgbPanel]
	});
	dataPanel.on('beforecollapse',function() { 
		winToc.height = winToc.height - 305;
	});
	dataPanel.on('beforeexpand',function() { 
		winToc.height = winToc.height + 305;
	});
	/*
	dataPanel.on('collapse',function() { 
		winToc.height = winToc.height + 350;
	});
	dataPanel.on('expand',function() { 
		winToc.height = winToc.height - 350;
	});
	*/

	winToc = new Ext.create('Ext.window.Window', {                            
		id: 'winToc',
		title: 'TABLE OF CONTENTS',
		//maximizable: true,
		//minimizable: true,
		closeAction: 'hide',
		//width: 300,
		width: 330,
		//height: 820,
		height: 165,	//set in menu.js
		x: 70,
		y: 60,
		//items: [overlayesPanel, dataPanel]
		items: [overlayesPanel, layersPanel, dataPanel]
	});

	// it's a trick to show correctly the toc on reload event
	//winToc.setVisible(false);
	winToc.show();
	winToc.hide();
});





//***********************************		FUNCTIONS	********************************************


function reloadToc()
    {
	//*****************************		Reload IR grid		*******************************
	var irData;
	if (typeof(hsdataset.ir.bands) != 'undefined') {
		// read data bands
		var numBands = parseInt(hsdataset.ir.bands);
		// create a data bands array
		irData = new Array(numBands);
		for (var i = 0; i < numBands; i++) {
			//bandnr = 'band' + (i+1);
			if(hsdataset.ir.metadata.bbl[i] == 0)
			{
				irData[i] = ['band' + (i + 1), parseFloat(hsdataset.ir.metadata.wavelength[i]), 'yes'];	// 0=BAD
			}
			else
			{
				irData[i] = ['band' + (i + 1), parseFloat(hsdataset.ir.metadata.wavelength[i]), 'no'];	// 1=OK
			}
		}     
	} else {
		irData = [];
	};

	// create the data store
	var irStore = new Ext.data.ArrayStore({
		fields: [
		   {name: 'irBandNr'},
		   {name: 'irWavelength', type: 'float'},
		   {name: 'irBad'}
		   //{name: 'bad', type: 'float'}
		]
	});

	/*
	var irStore = Ext.getCmp('irStoreId');
	*/	
	irStore.loadData(irData);
	var irGrid = Ext.getCmp('irGridId');
	irGrid.reconfigure(irStore);

	//*****************************		END - Reload IR grid		*******************************

	//*****************************		Reload VNIR grid		*******************************
	var vnirData;
	if (typeof(hsdataset.vnir.bands) != 'undefined') {
		// read data bands
		var numBands = parseInt(hsdataset.vnir.bands);
		// create a data bands array
		vnirData = new Array(numBands);
		for (var i = 0; i < numBands; i++) {
			//bandnr = 'band' + (i+1);
			if(hsdataset.vnir.metadata.bbl[i] == 0)
			{
				vnirData[i] = ['band' + (i + 1) , hsdataset.vnir.metadata.wavelength[i], 'yes'];	// 0=BAD
			}
			else
			{
				vnirData[i] = ['band' + (i + 1), hsdataset.vnir.metadata.wavelength[i], 'no'];	// 1=OK
			}
		}     
	} else {
		vnirData = [];
	};

	// create the data store
	var vnirStore = new Ext.data.ArrayStore({
		fields: [
		   {name: 'vnirBandNr'},
		   {name: 'vnirWavelength', type: 'float'},
		   {name: 'vnirBad'}
		   //{name: 'bad', type: 'float'}
		]
	});

	vnirStore.loadData(vnirData);
	var vnirGrid = Ext.getCmp('vnirGridId');
	vnirGrid.reconfigure(vnirStore);

	//*****************************		END - Reload VNIR grid		*******************************

	// **************************** 	Reload SP grid		***************************************
	var spData;
	if (typeof(sp) != 'undefined') {
		// read SP data
		//var numSp = parseInt(sp.length);
		var numSp = parseInt(Object.keys(sp).length);

		// create a data bands array
		spData = new Array(numSp);
		i = 0;
		for (var key in sp) {
			spData[i] = [key , sp[key.toString()]];	
			i++;
		}     
	} else {
		spData = [];
	};
	// create the data store
	/*
	*/
	var spStore = new Ext.data.ArrayStore({
		fields: [
		   {name: 'key'},
		   {name: 'spValue'}
		]
	});
	spStore.loadData(spData);
	var spGrid = Ext.getCmp('spGridId');
	spGrid.reconfigure(spStore);

	//*****************************		END - Reload SP grid		*******************************


	// ******************** 	Resize TOC 	******************************************
	//winToc.height = 750;		
	winToc.height = 660;
	var winDataPanel = Ext.getCmp('dataPanelId');
	winDataPanel.show();
	
	// add the first checkbox for VNIR default layer
	var strName;
	//strName = 'l_' + PNGimages[0].name.substring(0, 14);
	strName = '<b>IR: ' + PNGimages[0].name.substring(0, 14) + '</b>';
	addCheckbox(0, strName);
	var dataTabs = Ext.getCmp('dataTabsId');
	//dataTabs.setActiveTab(1);
	dataTabs.setActiveTab(0);
	winToc.show();

};

function addCheckbox(n, labelCheck) {
	// Set layer name into layers list
	//var winLayersPanel = Ext.getCmp('layersPanelId');
	/*
	if (n == 0) {
		labelCheck = '<b>' + labelCheck + '</b>';
	}
	*/
	layersPanel.add({
		xtype: 'checkboxfield',
		boxLabel: labelCheck,
		//boxLabel: PNGimages[n].name,
		//labelStyle: 'font-weight:bold',
		//style: 'font-weight:bold',
		name: 'checkImage_' + n,
		inputValue: n,
		id: 'checkImageId_' + n,
		checked: true,
		margin: 0,
		handler: function () {
				PNGimages[n].setVisibility(this.getValue());
		    	}
	});
	layersPanel.doLayout();
	// Scroll to bottom
	var d = layersPanel.body.dom;
	d.scrollTop = d.scrollHeight - d.offsetHeight;
};

function copyDataset(crismTab) {
	if (crismTab != 2) {
		usedCrism = crismTab;
	}
	// Set radio in console window
	var rbIr = Ext.getCmp('rbIrId');
	var rbVnir = Ext.getCmp('rbVnirId');

	if (usedCrism == 0) {
		//IR
		if (irDefaultImageLoaded == true) {
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
		} else {
			// Load IR data and image
			myLoader.show();
			loadIrData();
			loadImage();
			// add the checkbox for IR default layer
			var i = PNGimages.length;
			var strName;
			//strName = 'l_' + PNGimages[0].name.substring(0, 14);
			strName = '<b>IR: ' + PNGimages[i-1].name.substring(0, 14) + '</b>';
			addCheckbox((i-1), strName);
			irDefaultImageLoaded = true;
			myLoader.hide();
		}
		rbIr.setValue(true);

		/*
		PNGimages[0].setVisibility(false);
		PNGimages[0] = irImages[0];
		PNGimages[0].setVisibility(true);
	    	hsdataset.productid = hsdataset.ir.productid;
		hsdataset.collection = hsdataset.ir.collection;
		hsdataset.nodata = hsdataset.ir.nodata;
		hsdataset.xmin = hsdataset.ir.xmin;
		hsdataset.ymin = hsdataset.ir.ymin;
		hsdataset.xmax = hsdataset.ir.xmax;
		hsdataset.ymax = hsdataset.ir.ymax;
		hsdataset.bbox = hsdataset.ir.bbox;
		hsdataset.metadata = hsdataset.ir.metadata;
		hsdataset.width = hsdataset.ir.width;
		hsdataset.height = hsdataset.ir.height;
		hsdataset.bands = hsdataset.ir.bands;
		hsdataset.numbers = hsdataset.ir.numbers;
    		spectrum_load([hsdataset.numbers],["#000000"],hsdataset.collection);
		spectra.replot();
		*/

		/*
		layersPanel.removeAll();
		var strName;
		strName = 'IR:' + PNGimages[0].name.substring(0, 14);
		addCheckbox(0, strName);
		//checkImage_0.setValue(PNGimages[0].getVisibility());
		*/
	} else {
		//VNIR
		if (vnirDefaultImageLoaded == true) {
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
		} else {
			// Load IR data and image
			myLoader.show();
			loadVnirData();
			loadImage();
			// add the checkbox for IR default layer
			var i = PNGimages.length;
			var strName;
			//strName = 'l_' + PNGimages[0].name.substring(0, 14);
			strName = '<b>VNIR: ' + PNGimages[i-1].name.substring(0, 14) + '</b>';
			addCheckbox((i-1), strName);
			vnirDefaultImageLoaded = true;
			myLoader.hide();
		}
		rbVnir.setValue(true);
		/*
		PNGimages[0].setVisibility(false);
		PNGimages[0] = vnirImages[0];
		PNGimages[0].setVisibility(true);
	    	hsdataset.productid = hsdataset.vnir.productid;
		hsdataset.collection = hsdataset.vnir.collection;
		hsdataset.nodata = hsdataset.vnir.nodata;
		hsdataset.xmin = hsdataset.vnir.xmin;
		hsdataset.ymin = hsdataset.vnir.ymin;
		hsdataset.xmax = hsdataset.vnir.xmax;
		hsdataset.ymax = hsdataset.vnir.ymax;
		hsdataset.bbox = hsdataset.vnir.bbox;
		hsdataset.metadata = hsdataset.vnir.metadata;
		hsdataset.width = hsdataset.vnir.width;
		hsdataset.height = hsdataset.vnir.height;
		hsdataset.bands = hsdataset.vnir.bands;
		hsdataset.numbers = hsdataset.vnir.numbers;
    		spectrum_load([hsdataset.numbers],["#000000"],hsdataset.collection);
		spectra.replot();
		*/
		
		/*
		//layersPanel.removeAll();
		var strName;
		strName = 'VNIR: ' + PNGimages[0].name.substring(0, 14);
		addCheckbox(0, strName);
		//checkImage_0.setValue(PNGimages[0].getVisibility());
		*/
	}

	// PNGimage[0] visibility sets the checkbox value
	//alert('PNGimages[0].getVisibility() = ' + PNGimages[0].getVisibility());

	//var firstCheckbox = Ext.getCmp('checkImageId_0');
	//firstCheckbox.setValue(PNGimages[0].getVisibility());
};




