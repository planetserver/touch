function initmetadata()
	{

	// IR object
	//hsdataset.ir.productid = hsdataset.productid.toLowerCase();
        //hsdataset.ir.collection = hsdataset.ir.productid + "_" + pcversion + "_" + ptversion;

	//Set hsdataset for IR
	var irmetadata = getBinary('/static/js/regionsdata/metadata/' + hsdataset.ir.collection + '.js');
	hsdataset.ir.metadata = JSON.parse(irmetadata);
	hsdataset.ir.xmin = hsdataset.ir.metadata.xmin;
	hsdataset.ir.xmax = hsdataset.ir.metadata.xmax;
	hsdataset.ir.ymin = hsdataset.ir.metadata.ymin;
	hsdataset.ir.ymax = hsdataset.ir.metadata.ymax;
	hsdataset.ir.width = hsdataset.ir.metadata.width;
	hsdataset.ir.height = hsdataset.ir.metadata.height;
	hsdataset.ir.bands = hsdataset.ir.metadata.bands;
	var irbbox = new OpenLayers.Bounds(hsdataset.ir.xmin, hsdataset.ir.ymin, hsdataset.ir.xmax, hsdataset.ir.ymax);
	irbbox.transform(new OpenLayers.Projection('PS:2?0'), new OpenLayers.Projection('PS:1'));
	hsdataset.ir.left = irbbox.left;
	hsdataset.ir.right = irbbox.right;
	hsdataset.ir.bottom = irbbox.bottom;
	hsdataset.ir.top = irbbox.top;
	hsdataset.ir.bbox = irbbox;

	/*	When add the VNIR object????????
	*/

	// VNIR object

	//hsdataset.vnir.productid = hsdataset.productid.toLowerCase().replace("l_","s_");
        //hsdataset.vnir.collection = hsdataset.vnir.productid + "_" + pcversion + "_" + ptversion;

	//Set hsdataset for VNIR
	var vnirmetadata = getBinary('/static/js/regionsdata/metadata/' + hsdataset.vnir.collection + '.js');
	hsdataset.vnir.metadata = JSON.parse(vnirmetadata);
	hsdataset.vnir.xmin = hsdataset.vnir.metadata.xmin;
	hsdataset.vnir.xmax = hsdataset.vnir.metadata.xmax;
	hsdataset.vnir.ymin = hsdataset.vnir.metadata.ymin;
	hsdataset.vnir.ymax = hsdataset.vnir.metadata.ymax;
	hsdataset.vnir.width = hsdataset.vnir.metadata.width;
	hsdataset.vnir.height = hsdataset.vnir.metadata.height;
	hsdataset.vnir.bands = hsdataset.vnir.metadata.bands;
	var vnirbbox = new OpenLayers.Bounds(hsdataset.vnir.xmin, hsdataset.vnir.ymin, hsdataset.vnir.xmax, hsdataset.vnir.ymax);
	vnirbbox.transform(new OpenLayers.Projection('PS:2?0'), new OpenLayers.Projection('PS:1'));
	hsdataset.vnir.left = vnirbbox.left;
	hsdataset.vnir.right = vnirbbox.right;
	hsdataset.vnir.bottom = vnirbbox.bottom;
	hsdataset.vnir.top = vnirbbox.top;
	hsdataset.vnir.bbox = vnirbbox;

	/*
	// Assign hsdataset.ir to hsdataset
	hsdataset.metadata = hsdataset.ir.metadata;
	hsdataset.xmin = hsdataset.ir.xmin;
	hsdataset.xmax = hsdataset.ir.xmax;
	hsdataset.ymin = hsdataset.ir.ymin;
	hsdataset.ymax = hsdataset.ir.ymax;
	hsdataset.width = hsdataset.ir.width;
	hsdataset.height = hsdataset.ir.height;
	hsdataset.bands = hsdataset.ir.bands;

	// Assign hsdataset.vnir to hsdataset
	hsdataset.metadata = hsdataset.vnir.metadata;
	hsdataset.xmin = hsdataset.vnir.xmin;
	hsdataset.xmax = hsdataset.vnir.xmax;
	hsdataset.ymin = hsdataset.vnir.ymin;
	hsdataset.ymax = hsdataset.vnir.ymax;
	hsdataset.width = hsdataset.vnir.width;
	hsdataset.height = hsdataset.vnir.height;
	hsdataset.bands = hsdataset.vnir.bands;
	*/

    	hsdataset.region = hsdataset.vnir.metadata.region;
    }
