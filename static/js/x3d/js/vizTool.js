//Namespace
var EarthServerGenericClient = EarthServerGenericClient || {};

/**
 * @class Abstract base class for visualisation tools.
 * @constructor
 */
EarthServerGenericClient.AbstractVisualisation = function()
{
    var posX = 0;
    var posY = 0;
    var maxX = 0;
    var maxY = 0;
    var minX = 0;
    var minY = 0;
    var axis = "x";
    var size = 50;

    this.setSize = function(newSize)
    {
        if( newSize > 0)
        {   size = newSize; }
        else
        {   console.log("EarthServerGenericClient.AbstractVisualisation::setSize: A value smaller than 0 not allowed.");    }
    };
    this.getSize = function()
    {   return size;    };

    this.setBoundaries = function(minx,maxx,miny,maxy)
    {
        minX = minx;
        minY = miny;
        maxX = maxx;
        maxY = maxy;
    };

    this.move = function(deltaX,deltaY)
    {
        if( posX+deltaX >= minX && posX+deltaX <maxX)
        {   posX = posX+deltaX; }

        if( posY+deltaY >= minY && posY+deltaY <maxY)
        {   posY = posY+deltaY; }

        this.updateVisualisation(posX,posY);
    };

    this.moveTo = function(xVal,yVal)
    {
        if( xVal > minX && xVal < maxX)
        {   posX  = xVal;   }

        if( yVal > minY && yVal < maxY)
        {   posY = yVal;    }

        this.updateVisualisation(posX,posY);
    };

    this.getPosX = function()
    {   return posX;    };
    this.getPosY = function()
    {   return posY;    };

    this.setAxis = function(newAxis)
    {
        if(newAxis !== "x" && newAxis !== "y" && newAxis !== "z")
        {   console.log("EarthServerGenericClient.AbstractVisualisation::setAxis: Can't set Axis. Has to be 'x','y' or 'z'.");}
        else
        {   axis = newAxis; }
    };
    this.getAxis = function()
    {   return axis;    };

    this.createCanvas = function(width,height,imageData,canvasID)
    {
        this.canvasTexture = null;

        if( imageData !== undefined || width <= 0 || height <= 0)
        {
            this.canvasTexture = document.createElement('canvas');
            this.canvasTexture.style.display = "none";
            this.canvasTexture.setAttribute("id",canvasID);
            this.canvasTexture.width = width;
            this.canvasTexture.height = height;

            var context = this.canvasTexture.getContext('2d');
            context.putImageData(imageData,0,0);
        }
        else
        {   console.log("EarthServerGenericClient.AbstractVisualisation: Could not create Canvas."); }

        return this.canvasTexture;
    };

    this.updateCanvas = function(newImageData)
    {
        if( this.canvas)
        {
            var context = canvas.getContext('2d');
            context.putImageData(newImageData,0,0);
        }
        else
        {   console.log("EarthServerGenericClient.AbstractVisualisation: Could not find Canvas.");    }
    };

    this.rawDataToPixelData = function(rawData,hmMin,hmMax)
    {
        var pixels = this.canvas.width*this.canvasTexture.height*4;
        var pixelData = [pixels];

        //Draw complete white first
        for(var i=0; i<pixels;i++)
        {
            pixelData[i]=255;
        }
        //Draw heightmap into the white canvas
        for(i=0; i<rawData.length;i++)
        {
            var height = 0;
        }
    }
};

/**
 * @class
 * @constructor
 * @augments EarthServerGenericClient.AbstractVisualisation
 */
EarthServerGenericClient.HeightProfileVisualisation = function(index,getHeightmapFunction,size,hmWidth,hmHeight,axis,hmMin,hmMax)
{
    this.setSize(size);
    this.setBoundaries(0,hmWidth,0,hmHeight);
    this.move(hmWidth/2,hmHeight/2);
    this.setAxis(axis);

    this.updateVisualisation = function(posX,posY)
    {
        var info = {};
        info.xpos = posX;
        info.ypos = posY;
        if( this.getAxis() === "x")
        {
            info.chunkHeight = 1;
            info.chunkWidth  = this.getSize();
        }
        else
        {
            info.chunkHeight = this.getSize();
            info.chunkWidth  = 1;
        }

        var rawData   = getHeightmapFunction(info);
        var pixelData = rawDataToPixelData(rawData,hmMin,hmMax);
    }
};
EarthServerGenericClient.HeightProfileVisualisation.inheritsFrom( EarthServerGenericClient.AbstractVisualisation);