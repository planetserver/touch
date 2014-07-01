//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Abstract base class for scene models.
 */
EarthServerGenericClient.AbstractSceneModel = function(){
    /**
     * Sets the name of the scene model.
     * @param modelName - Name of the model.
     */
    this.setName = function(modelName){
        this.name = String(modelName);
    };
    /**
     * Sets the area of interest for the model. (Lower Corner, Upper Corner)
     * @param minx - Minimum/Lower Latitude
     * @param miny - Minimum/Lower Longitude
     * @param maxx - Maximum/Upper Latitude
     * @param maxy - Maximum/Upper Longitude
     */
    this.setAreaOfInterest = function(minx,miny,maxx,maxy){
        this.minx = minx;
        this.miny = miny;
        this.maxx = maxx;
        this.maxy = maxy;
    };
    /**
     * Sets the resolution of the scene model (if possible).
     * @param xRes - Resolution on the x-axis/Latitude
     * @param zRes - Resolution on the z-axis/Longitude
     */
    this.setResolution = function(xRes,zRes){
        this.XResolution = parseInt(xRes);
        this.ZResolution = parseInt(zRes);

        var maxResolution = EarthServerGenericClient.MainScene.getMaxResolution();
        if( this.XResolution > maxResolution )
        {   this.XResolution = maxResolution;   }
        if( this.ZResolution > maxResolution )
        {   this.ZResolution = maxResolution;   }

    };

    /**
     * Sets the position of the scene model within the fishtank/cube. Values between [0-1]
     * @param xOffset - Offset on the x-axis/width  Default:0
     * @param yOffset - Offset on the y-axis/height Default:0
     * @param zOffset - Offset on the z-axis/depth  Default:0
     */
    this.setOffset = function( xOffset, yOffset, zOffset){
        this.xOffset = parseFloat(xOffset);
        this.yOffset = parseFloat(yOffset);
        this.zOffset = parseFloat(zOffset);
    };
    /**
     * Sets the size of the scene model compared to the fishtank/cube. Values between 0 - 1.
     * @param xScale - Size of the model on the x-axis/width  Default:1   (whole cube)
     * @param yScale - Size of the model on the y-axis/height Default:0.3 (30% of the cube)
     * @param zScale - Size of the model on the x-axis/width  Default:1   (whole cube)
     */
    this.setScale = function( xScale, yScale, zScale){
        this.xScale = parseFloat(xScale);
        this.yScale = parseFloat(yScale);
        this.zScale = parseFloat(zScale);
    };

    /**
     * Sets the image format for the server request.
     * @param imageFormat - Default "png".
     */
    this.setImageFormat = function( imageFormat){
        this.imageFormat = String(imageFormat);
    };

    /**
     * Sets the initial transparency of the scene model.
     * The function accepts a parameter value in the range of 0 (fully opaque) and 1(fully transparent).
     * @param transparency - Value of transparency.
     */
    this.setTransparency = function( transparency ){
        this.transparency = parseFloat(transparency);
    };

    /**
     * Updates the transparency during runtime of the scene model.
     * The function accepts a value in the range of 0 (fully opaque) and 1(fully transparent).
     * @param transparency - Value of transparency.
     */
    this.updateTransparency = function( transparency ){
        this.terrain.setTransparency(transparency);
    };

    /**
     * Modules report their loading progress with this function which reports to the main scene.
     */
    this.reportProgress = function()
    {
        //The total progress of this module depends on the number of requests it does.
        //The progress parameter is the progress of ONE request.
        //ReceivedDataCount is the number of already received responses.
        //it is doubled because for each request one terrain will be build.
        var totalProgress = ((this.receivedDataCount) / (this.requests * 2))*100;
        EarthServerGenericClient.MainScene.reportProgress(this.index,totalProgress);
    };

    /**
     * Validates the received data from the server request.
     * Checks if a texture and a heightmap are available at the moment.
     * @param data - Received data from the server request.
     * @returns {boolean} - TRUE if OK, FALSE if some data is missing
     */
    this.checkReceivedData = function( data)
    {
        this.receivedDataCount++;
        this.reportProgress();

        if( data === null || !data.validate() )
        {
            alert(this.name +": Request not successful.");
            this.reportProgress();//NO Terrain will be built so report the progress here
            this.removePlaceHolder();//Remove the placeHolder.

            //delete UI elements
            var header = document.getElementById("EarthServerGenericClient_ModelHeader_"+this.index);
            var div = document.getElementById("EarthServerGenericClient_ModelDiv_"+this.index);

            if(header && div)
            {
                var parent = div.parentNode;

                if(parent)
                {
                    parent.removeChild(div);
                    parent.removeChild(header);
                }
            }
            return false;
        }

        return true;
    };

    /**
     * Adds an Object that will be informed about movements and alterations of the model.
     * @param bindingObject - Object that will receive the notification.
     */
    this.addBinding = function(bindingObject)
    {
        for(var i=0; i<this.bindings.length;i++)
        {
            if(this.bindings[i] == bindingObject)
            {
                console.log(this.name + "::addBinding: Object already registered.");
                return;
            }
        }
        this.bindings.push(bindingObject);
    };

    /**
     * Removes an Object that will be informed about movements and alterations of the model.
     * @param bindingObject - Object that will no longer receive the notification.
     */
    this.removeBinding = function(bindingObject)
    {
        for(var i=0; i<this.bindings.length;i++)
        {
            if( this.bindings[i] === bindingObject)
            {
                this.bindings.remove(i);
                return;
            }
        }
    };

    /**
     * This function is called if the model is moved in the scene.
     * All bindings will also get the movement update.
     * @param movementType - Type of the movement: xAxis,zAxis,elevation...
     * @param value - Updated position
     */
    this.movementUpdate = function(movementType,value)
    {
        for(var i=0; i<this.bindings.length;i++)
        {
            this.bindings[i].movementUpdate(movementType,value);
        }
    };

    /**
     * This function calls every binding object that the elevation of the models was changed.
     */
    this.elevationUpdate = function()
    {
        for(var i=0; i<this.bindings.length;i++)
        {
            this.bindings[i].elevationUpdate();
        }
    };

    /**
     * Returns the elevation value of it's terrain at a specific point in the 3D scene.
     * @param xPos - Position on the x-axis.
     * @param zPos - Position on the z-axis.
     * @returns {number} - The height on the y-axis.
     */
    this.getHeightAt3DPosition = function(xPos,zPos)
    {
        if( this.terrain)
        {
            return this.terrain.getHeightAt3DPosition(xPos,zPos);
        }
        else
        {   return 0; }
    };

    /**
     * This creates a placeholder Element for the model. It consists of an simple quad.
     * Models that use this placeholder should remove it of course.
     */
    this.createPlaceHolder = function()
    {
        var appearance = document.createElement('Appearance');
        var material = document.createElement('Material');
        material.setAttribute("emissiveColor","0.4 0.4 0.4");

        var trans = document.createElement('Transform');
        var yoff = (this.cubeSizeY * this.yOffset);
        trans.setAttribute("translation", "0 "+ yoff  + " 0");

        var shape = document.createElement('shape');
        var triangleset = document.createElement('IndexedFaceSet');
        triangleset.setAttribute("colorPerVertex", "false");
        triangleset.setAttribute("coordindex","0 1 2 3 -1");

        var coords = document.createElement('Coordinate');

        var cubeX = this.cubeSizeX/2.0;
        var cubeZ = this.cubeSizeZ/2.0;
        var cubeXNeg = -this.cubeSizeX/2.0;
        var cubeYNeg = -this.cubeSizeY/2.0;
        var cubeZNeg = -this.cubeSizeZ/2.0;

        var p = {};
        p[0] = ""+ cubeXNeg + " " + cubeYNeg + " " + cubeZNeg + " ";
        p[1] = ""+ cubeXNeg + " " + cubeYNeg + " " + cubeZ + " ";
        p[2] = ""+ cubeX    + " " + cubeYNeg + " " + cubeZ    + " ";
        p[3] = ""+ cubeX    + " " + cubeYNeg + " " + cubeZNeg;

        var points="";
        for(var i=0; i<4;i++)
        {   points = points+p[i];   }
        coords.setAttribute("point", points);

        triangleset.appendChild(coords);
        appearance.appendChild(material);
        shape.appendChild(appearance);
        shape.appendChild(triangleset);
        trans.appendChild(shape);

        this.placeHolder = trans;
        this.root.appendChild( this.placeHolder );

        appearance = null;
        material = null;
        shape = null;
        triangleset = null;
        coords = null;
        points = null;
        trans = null;
    };

    /**
     * Removes the PlaceHolder created in createPlaceHolder(). If already deleted nothing happens.
     */
    this.removePlaceHolder = function()
    {
        if( this.placeHolder !== null && this.placeHolder !== undefined )
        {
            this.root.removeChild( this.placeHolder);
            this.placeHolder = null;
        }
    };

    /**
     * Creates the transform for the scene model to fit into the fishtank/cube. This is done automatically by
     * the scene model.
     * @param xRes - Size of the received data on the x-axis (e.g. the requested DEM )
     * @param yRes - Size of the received data on the y-axis
     * @param zRes - Size of the received data on the z-axis
     * @param minvalue - Minimum Value along the y-axis (e.g. minimum value in a DEM, so the model starts at it's wished location)
     * @return {Element}
     */
    this.createTransform = function(xRes,yRes,zRes,minvalue){
        var trans = document.createElement('Transform');
        trans.setAttribute("id", "EarthServerGenericClient_modelTransform"+this.index);

        this.YResolution = yRes;

        var scaleX = (this.cubeSizeX*this.xScale)/(parseInt(xRes)-1);
        var scaleY = (this.cubeSizeY*this.yScale)/this.YResolution;
        var scaleZ = (this.cubeSizeZ*this.zScale)/(parseInt(zRes)-1);
        trans.setAttribute("scale", "" + scaleX + " " + scaleY + " " + scaleZ);

        var xoff = (this.cubeSizeX * this.xOffset) - (this.cubeSizeX/2.0);
        var yoff = (this.cubeSizeY * this.yOffset) - (minvalue*scaleY) - (this.cubeSizeY/2.0);
        var zoff = (this.cubeSizeZ * this.zOffset) - (this.cubeSizeZ/2.0);
        trans.setAttribute("translation", "" + xoff+ " " + yoff  + " " + zoff);

        return trans;
    };
    /**
     * Sets the default values. This is done automatically by the scene model.
     */
    this.setDefaults = function(){
        /**
         * Name of the model. This will be display in the UI.
         * @default Name is given by the module
         * @type {String}
         */
        this.name = "No name given";

        /**
         * All objects that are bound to the module. The will be noticed if the models is moved or altered.
         * Example: Annotation layers should be moved with the module and change the height when the elevation changes.
         * @type {Array}
         */
        this.bindings = [];

        /**
         * Resolution for the latitude.
         * @default 500
         * @type {Number}
         */
        this.XResolution = 500;

        /**
         * Resolution for the longitude
         * @default 500
         * @type {Number}
         */
        this.ZResolution = 500;

        /**
         * Offset on the X-Axis for the model.
         * @default 0
         * @type {Number}
         */
        this.xOffset = 0;

        /**
         * Offset on the Y-Axis for the model.
         * @default 0
         * @type {Number}
         */
        this.yOffset = 0;

        /**
         * Offset on the Z-Axis for the model.
         * @default 0
         * @type {Number}
         */
        this.zOffset = 0;

        /**
         * The models dimension compared to the whole cube on the X-Axis.
         * @default 1
         * @type {Number}
         */
        this.xScale = 1;

        /**
         * The models dimension compared to the whole cube on the Y-Axis.
         * @default 0.3
         * @type {Number}
         */
        this.yScale = 0.3;

        /**
         * The models dimension compared to the whole cube on the Z-Axis.
         * @default 1
         * @type {Number}
         */
        this.zScale = 1;

        /**
         * The used Image format (if one is used)
         * @default "png"
         * @type {String}
         */
        this.imageFormat = "png";

        /**
         * The amount of requests the model do. It is needed to keep track of the loading progress.
         * @default 1
         * @type {number}
         */
        this.requests = 1;

        /**
         * The amount of already received responses. Along with requests this is used to keep track of the loading progress.
         * @default 0
         * @type {number}
         */
        this.receivedDataCount = 0;

        /**
         * The Transparency of the model.
         * @default 0
         * @type {Number}
         */
        this.transparency = 0;
    };
};